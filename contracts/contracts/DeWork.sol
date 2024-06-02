// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IncentiveToken.sol";

// import "./SoulboundNFT.sol";

contract DeWork {
    IncentiveToken private _token;
    // SoulboundNFT private _soulboundNFT;
    address public admin;
    uint256 public constant CHECK_IN_TIME = 10 * 1 hours; // 10 am in seconds

    struct Employee {
        bool isEmployed;
        string employeeDetailsHash;
        uint256 totalHours;
        uint256 tokensEarned;
    }

    struct CheckInOut {
        uint256 checkInTime;
        uint256 checkOutTime;
    }

    mapping(address => Employee) private employees;
    mapping(address => CheckInOut[]) private employeeCheckInOut;
    mapping(address => uint256) private lastCheckInDate; // Stores the last check-in date for each employee
    address[] private employeesList;

    event CheckIn(address indexed employee, uint256 timestamp);
    event CheckOut(address indexed employee, uint256 hoursWorked);
    event RewardIssued(address indexed employee, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyEmployee() {
        require(
            employees[msg.sender].isEmployed,
            "Only employees can call this function"
        );
        _;
    }

    modifier both() {
        require(
            employees[msg.sender].isEmployed || msg.sender == admin,
            "Not Authorized"
        );
        _;
    }

    constructor(IncentiveToken token) {
        _token = token;
        // _soulboundNFT = soulboundNFT;
        admin = msg.sender;
    }

    function addEmployee(address employee, string calldata employeeHash)
        external
        onlyAdmin
    {
        // CheckInOut memory checkInOut = new CheckInOut[](0);
        employees[employee] = Employee({
            isEmployed: true,
            employeeDetailsHash: employeeHash,
            totalHours: 0,
            tokensEarned: 0
        });
        employeesList.push(employee);
    }

    function removeEmployee(address employee) external onlyAdmin {
        require(
            employees[employee].isEmployed,
            "Employee does not exist or already removed."
        );

        employees[employee].isEmployed = false;

        uint256 index = employeesList.length;
        for (uint256 i = 0; i < employeesList.length; ++i) {
            if (employeesList[i] == employee) {
                index = i;
                break;
            }
        }

        require(index < employeesList.length, "Employee not found in list."); // Check if employee was found

        // Move the last element into the place to delete
        employeesList[index] = employeesList[employeesList.length - 1];
        employeesList.pop(); // Remove the last element
    }

    function checkIn() external onlyEmployee {
        require(_isNewDay(msg.sender), "You have already checked in today");

        uint256 currentTime = block.timestamp % 1 days;
        bool onTime = currentTime >= CHECK_IN_TIME &&
            currentTime < CHECK_IN_TIME + 1 hours;
        if (onTime) {
            // Extra incentive tokens for on-time check-in
            uint256 extraIncentive = 10 * 10**18; // Example: 10 extra tokens
            employees[msg.sender].tokensEarned += extraIncentive;
            emit RewardIssued(msg.sender, extraIncentive);
        }

        employeeCheckInOut[msg.sender].push(
            CheckInOut({checkInTime: block.timestamp, checkOutTime: 0})
        );
        lastCheckInDate[msg.sender] = block.timestamp / 1 days;

        emit CheckIn(msg.sender, block.timestamp);
    }

    function checkOut() external onlyEmployee {
        require(
            employeeCheckInOut[msg.sender].length > 0,
            "You must check in first"
        );
        CheckInOut storage lastCheckInOut = employeeCheckInOut[msg.sender][
            employeeCheckInOut[msg.sender].length - 1
        ]; // Corrected access to employeeCheckInOut
        require(lastCheckInOut.checkOutTime == 0, "Already checked out");

        uint256 hoursWorked = (block.timestamp - lastCheckInOut.checkInTime) /
            1 hours;
        employees[msg.sender].totalHours += hoursWorked;
        lastCheckInOut.checkOutTime = block.timestamp;

        uint256 reward = hoursWorked * 10**18; // 1 hour = 1 token
        employees[msg.sender].tokensEarned += reward;

        emit CheckOut(msg.sender, hoursWorked);
        emit RewardIssued(msg.sender, reward);
    }

    function mintIncentiveToken() external onlyEmployee {
        uint256 tokensEarned = employees[msg.sender].tokensEarned;
        _token.mint(msg.sender, tokensEarned);
    }

    function getEmployeeDetails(address employee)
        external
        view
        both
        returns (Employee memory)
    {
        return employees[employee];
    }

    function getAllEmployeeDetails()
        external
        view
        onlyAdmin
        returns (address[] memory)
    {
        return employeesList;
    }

    function getCheckInOuts(address employee)
        external
        view
        onlyEmployee
        returns (CheckInOut[] memory)
    {
        return employeeCheckInOut[employee];
    }

    function _isValidCheckInTime() internal view returns (bool) {
        uint256 currentTime = block.timestamp % 1 days;
        return
            currentTime >= CHECK_IN_TIME &&
            currentTime < CHECK_IN_TIME + 1 hours;
    }

    function _isNewDay(address employee) internal view returns (bool) {
        return block.timestamp / 1 days > lastCheckInDate[employee];
    }
}
