import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/dework.png";
import Employee from "./components/employee";
import { useAccount } from "wagmi";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { Web3 } from "web3";
import {deworkContractABI, deworkContract} from "./contract/dework.json"
import DashboardPage from "./components/admindashboard";

const Dashboard = () => {
  const router = useRouter()
  const { isConnected, address } = useAccount();
  const [admin, setAdmin] = useState();
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    if (window && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);
  const checkAddress = async () => {
    try {
      const contract = new web3.eth.Contract(
        deworkContractABI,
        deworkContract
      );
      let adminAddr = await contract.methods.admin().call()
      console.log(admin)
      setAdmin(adminAddr)
    } catch (error) {
      console.error(error)
    }
  }
  const redirectToAttendance = () => {
    router.push("/employee/attendance")
  }
  useEffect(() => {
    if(!isConnected){
      router.push("/")
    }
    const call = async () => {
      await checkAddress();
    }
    call()
  })
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="flex justify-between items-center container mx-auto">
          <Image src={logo} height={100} width={120} alt="DeWork logo" />
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              {address != admin ? (
                <Link href="/employee/attendance" className="hover:underline">
                  Attendance
                </Link>
              ) : (
                <Link href="/admin/addemployee" className="hover:underline">
                  Add Employees
                </Link>
              )}
            </li>
            <li>{isConnected ? <ConnectButton label="log out" /> : null}</li>
          </ul>
        </nav>
      </header>
      {admin ? <DashboardPage /> : <Employee />}
      
    </div>
  );
};

export default Dashboard;
