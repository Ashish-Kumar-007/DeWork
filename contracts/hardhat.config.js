require("@nomicfoundation/hardhat-toolbox");
// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");


// const SEPOLIA_PRIVATE_KEY = vars.get("eafb932eaa2c876d34a8dae23f38b41280620b205161e15b9b7da0fe24ed8514");

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
