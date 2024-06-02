import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from "../public/dework.png"
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
const LoginPage = () => {
  const {isConnected} = useAccount()
  const router = useRouter();
  const redirect= () => {
    router.push('/dashboard')
  }
  useEffect(() => {
    if(isConnected){
      redirect()
    }
    
  })
  return (
    <div className="container mx-auto mt-16 flex flex-col justify-center items-center">
      <Image src={logo} height={200} width={500} alt='DeWork logo'/>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Welcome to DeWork</h1>
      <div className="flex flex-col items-center">
        {/* Login Options */}
        <div className="mb-8 flex justify-center">
          <ConnectButton label="Sign in"/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
