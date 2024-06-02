# DeWork

## Overview

This project aims to create a decentralized version of an HR and payroll management system similar to Keka, incorporating token incentives for timely arrivals and extra work hours. The project leverages blockchain technology to ensure transparency, security, and immutability of records, rewarding employees through utility tokens.

## Working
Admin add the details of the employee and it will be stored on the Pinata IPFS and the generated hash will be stored in the contract. Once registered the employee can access the page which is not completed fully and check in and check out. For daily check in and out employee will get some 1 incentive token per hour which can be used in the office cafe, shop and to improve employees puntuality I have also implemented extra reward token, for example if an employee checked in on time he will get extra 10 incentive tokens 

## Key Features

1. **Decentralized HR Processes**: 
   - Attendance tracking

2. **Token Incentives**:
   - Utility tokens for timely attendance and extra work hours.
   - Tokens can be used within the ecosystem or converted to other cryptocurrencies.

3. **User Authentication**:
   - Decentralized identity solutions to manage user identities securely.

4. **Frontend Integration**:
   - User-friendly frontend with Web3 integration for interaction with the blockchain.

## Technologies Used

- **Blockchain Platform**: Ethereum
- **Smart Contract Language**: Solidity
- **Web3 Libraries**: ethers.js, web3.js
- **Decentralized Storage**: IPFS
- **Frontend Frameworks**: Next.js

## Project Status

**Note**: The project is currently a work-in-progress. Only the employee addition part has been completed. The deployed contract for adding employees is available, but other functionalities like attendance tracking, payroll processing, and token distribution are yet to be implemented.

## How to Use

##To run Contract

Go to contract folder and follow th below instruction

### Prerequisites

- Node.js
- Hardhat
- MetaMask or any Web3-enabled browser

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Ashish-Kumar-007/DeWork.git
    cd DeWork/contracts
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Deploy the smart contracts:
    ```bash
    npx hardhat run scripts/deploy.js --network your-network
    ```

4. Start the frontend:
    ```bash
    npm start
    ```

### Deployed Contract

The deployed smart contract for adding employees is available on the selected blockchain. The contract address is:

```plaintext
DeWork Contract (Sepolia): 0x5FdCE7b1Db0175b0463dd7D1aAd8620094c04cb1
Incentive Token Contract (Sepolia): 0x2e76FffC2EC9113728E857406170a90A47B72bcb
```

##To run Frontend page

follow th below instruction

1. Clone the repository:
    ```bash
    git clone https://github.com/Ashish-Kumar-007/DeWork.git
    cd DeWork
    ```

2. Install dependencies:
    ```bash
    npm install

3. Create env.local file and pass the desired values
```
NEXT_PUBLIC_PROJECT_ID
NEXT_PUBLIC_PINATA_JWT
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Adding an Employee

1. Open the frontend application.
2. Navigate to the "Add Employee" section.
3. Enter the required employee details.
4. Submit the form to add the employee to the blockchain.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.