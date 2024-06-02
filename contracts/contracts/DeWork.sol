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
        bytes32 employeeDetailsHash;
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

    event CheckIn(address indexed employee, uint256 timestamp);
    event CheckOut(address indexed employee, uint256 hoursWorked);
    event RewardIssued(address indexed employee, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyEmployee() {
        require(employees[msg.sender].isEmployed, "Only employees can call this function");
        _;
    }

    constructor(IncentiveToken token) {
        _token = token;
        // _soulboundNFT = soulboundNFT;
        admin = msg.sender;
    }

    function addEmployee(address employee, bytes32 employeeHash) external onlyAdmin {
        // CheckInOut memory checkInOut = new CheckInOut[](0);
        employees[employee] = Employee({
            isEmployed: true, 
            employeeDetailsHash: employeeHash, 
            totalHours: 0, 
            tokensEarned: 0
        });
    }

    function removeEmployee(address employee) external onlyAdmin {
        employees[employee].isEmployed = false;
    }

    function checkIn() external onlyEmployee {
        require(_isValidCheckInTime(), "Check-in time must be at 10 am");
        require(_isNewDay(msg.sender), "You have already checked in today");

        employeeCheckInOut[msg.sender].push(CheckInOut({
            checkInTime: block.timestamp, 
            checkOutTime: 0
        }));

        // Extra incentive tokens for on-time check-in
        uint256 extraIncentive = 10 * 10 ** 18; // Example: 10 extra tokens
        employees[msg.sender].tokensEarned += extraIncentive;
        lastCheckInDate[msg.sender] = block.timestamp / 1 days;

        emit RewardIssued(msg.sender, extraIncentive);
        emit CheckIn(msg.sender, block.timestamp);
    }

function checkOut() external onlyEmployee {
    require(employeeCheckInOut[msg.sender].length > 0, "You must check in first");
    CheckInOut storage lastCheckInOut = employeeCheckInOut[msg.sender][employeeCheckInOut[msg.sender].length - 1]; // Corrected access to employeeCheckInOut
    require(lastCheckInOut.checkOutTime == 0, "Already checked out");

    uint256 hoursWorked = (block.timestamp - lastCheckInOut.checkInTime) / 1 hours;
    employees[msg.sender].totalHours += hoursWorked;
    lastCheckInOut.checkOutTime = block.timestamp;

    uint256 reward = hoursWorked * 10 ** 18; // 1 hour = 1 token
    employees[msg.sender].tokensEarned += reward;

    emit CheckOut(msg.sender, hoursWorked);
    emit RewardIssued(msg.sender, reward);
}

    function mintIncentiveToken() external onlyEmployee {
        uint tokensEarned = employees[msg.sender].tokensEarned;
        _token.mint(msg.sender, tokensEarned);
    }

    function getEmployeeDetails(address employee) external view returns (Employee memory) {
        return employees[employee];
    }

    function getCheckInOuts(address employee) external view returns (CheckInOut[] memory) {
        return employeeCheckInOut[employee];
    }

    function _isValidCheckInTime() internal view returns (bool) {
        uint256 currentTime = block.timestamp % 1 days;
        return currentTime >= CHECK_IN_TIME && currentTime < CHECK_IN_TIME + 1 hours;
    }

    function _isNewDay(address employee) internal view returns (bool) {
        return block.timestamp / 1 days > lastCheckInDate[employee];
    }
}
