// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IncentiveToken is ERC20 {
   
    address private callerAddress;
    address private owner; 
    
    constructor() ERC20("IncentiveToken", "INC") {
        owner = msg.sender;

    }

    function mint(address to, uint256 amount) external {
        require(callerAddress == msg.sender, "Not authorized");
        _mint(to, amount);
    }

    function setCallerAddress(address _addr) external  {
        require(_addr != address(0), "Invalid address");
        require(msg.sender == owner, "Not owner");
        callerAddress = _addr;
    }
}
