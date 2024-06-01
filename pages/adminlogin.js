import React from 'react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const handleLoginWithMetaMask = () => {
    // Handle login with MetaMask
  };

  const handleLoginWithDID = () => {
    // Handle login with DID
  };

  const handleSignUp = () => {
    // Handle sign-up process
  };

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Welcome to Decentralized HR</h1>
      <div className="flex flex-col items-center">
        {/* Login Options */}
        <div className="mb-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 focus:outline-none mr-4"
            onClick={handleLoginWithMetaMask}
          >
            Login with MetaMask
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 focus:outline-none"
            onClick={handleLoginWithDID}
          >
            Login with DID
          </motion.button>
        </div>
        {/* Sign-Up Option */}
        <div className="text-center">
          <p className="mb-2 text-gray-700">Don't have a decentralized identity?</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 focus:outline-none"
            onClick={handleSignUp}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
