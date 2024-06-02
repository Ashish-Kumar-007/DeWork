import Image from "next/image";
import React, { useEffect } from "react";
import logo from "../public/dework.png";
import Employee from "./components/employee";
import { useAccount } from "wagmi";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter()
  const { isConnected, address } = useAccount();
  const redirectToAttendance = () => {
    router.push("/employee/attendance")
  }
  useEffect(() => {
    if(!isConnected){
      router.push("/")
    }
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
              {address == address ? (
                <Link href="/employee/attendance" className="hover:underline">
                  Attendance
                </Link>
              ) : (
                <Link href="" className="hover:underline">
                  Add Employees
                </Link>
              )}
            </li>
            <li>{isConnected ? <ConnectButton label="log out" /> : null}</li>
          </ul>
        </nav>
      </header>
      <Employee />
    </div>
  );
};

export default Dashboard;
