# DeWork

DeWork is a Solidity smart contract designed to manage employee check-ins, check-outs, and reward distribution based on their working hours. It uses an ERC20 token (IncentiveToken) for rewarding employees and provides functionality for adding and removing employees, checking in and out, minting tokens, and retrieving employee details.

## Features

- **Employee Management**: Add and remove employees with their details.
- **Check-In and Check-Out**: Employees can check in and out to record their working hours.
- **Reward System**: Reward employees with tokens based on their working hours and check-in times.
- **Token Minting**: Mint tokens for employees based on their earned rewards.
- **Data Retrieval**: Get employee details and check-in/out records.

## Usage

1. **Add Employees**: Use `addEmployee` function to add employees.
2. **Check-In**: Employees can check in using the `checkIn` function.
3. **Check-Out**: Employees can check out using the `checkOut` function.
4. **Reward Issuance**: Rewards are issued automatically based on check-in times and working hours.
5. **Token Minting**: Use `mintIncentiveToken` to mint tokens for employees.
6. **Data Retrieval**: Use `getEmployeeDetails` and `getCheckInOuts` to retrieve employee information.

## Requirements

- Solidity ^0.8.20
- IncentiveToken contract (ERC20 token)

## Deployed Addresses
Incentive Token: https://sepolia.etherscan.io/address/0x2e76fffc2ec9113728e857406170a90a47b72bcb
DeWork: https://sepolia.etherscan.io/address/0x0471369943b50162ed507a074fac0c2b8a8fed8b

## Installation

1. Clone the repository.
2. Compile the Solidity code.
3. Deploy the DeWork contract along with the IncentiveToken contract.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This readme provides a brief overview of the DeWork smart contract. Detailed instructions on deployment and usage can be found in the contract's source code and accompanying documentation.