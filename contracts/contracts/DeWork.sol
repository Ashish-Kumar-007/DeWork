// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IncentiveToken.sol";
import "./SoulboundNFT.sol";

contract DeWork {
    IncentiveToken private _token;
    SoulboundNFT private _soulboundNFT;
    address public admin;

    struct Employee {
        bool isEmployed;
        uint256 lastCheckIn;
        uint256 totalHours;
    }

    mapping(address => Employee) private employees;

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

    constructor(IncentiveToken token, SoulboundNFT soulboundNFT) {
        _token = token;
        _soulboundNFT = soulboundNFT;
        admin = msg.sender;
    }

    function addEmployee(address employee) external onlyAdmin {
        employees[employee] = Employee({isEmployed: true, lastCheckIn: 0, totalHours: 0});
        _soulboundNFT.mint(employee, "Employment Started", block.timestamp);
    }

    function removeEmployee(address employee) external onlyAdmin {
        employees[employee].isEmployed = false;
    }

    function checkIn() external onlyEmployee {
        employees[msg.sender].lastCheckIn = block.timestamp;
        emit CheckIn(msg.sender, block.timestamp);
    }

    function checkOut() external onlyEmployee {
        require(employees[msg.sender].lastCheckIn != 0, "You must check in first");
        uint256 hoursWorked = (block.timestamp - employees[msg.sender].lastCheckIn) / 1 hours;
        employees[msg.sender].totalHours += hoursWorked;
        employees[msg.sender].lastCheckIn = 0;

        uint256 reward = hoursWorked * 10 ** 18; // 1 hour = 1 token
        _token.mint(msg.sender, reward);
        emit CheckOut(msg.sender, hoursWorked);
        emit RewardIssued(msg.sender, reward);
    }

    function issueAchievement(address employee, string memory achievement) external onlyAdmin {
        _soulboundNFT.mint(employee, achievement, block.timestamp);
    }

    function getEmployeeDetails(address employee) external view returns (Employee memory) {
        return employees[employee];
    }
}
