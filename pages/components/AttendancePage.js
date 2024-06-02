import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from "../../public/dework.png";
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const AttendancePage = () => {
  const router = useRouter()
  const { isConnected, address } = useAccount();
  // Dummy data for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: '2024-06-01', checkIn: '09:00', checkOut: '18:00', tokensEarned: 5 },
    { date: '2024-06-02', checkIn: '09:15', checkOut: '18:30', tokensEarned: 6 },
    // Add more records as needed
  ]);

  // State for current check-in status
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  // State for showing success message after check-in/out
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to handle check-in/check-out button click
  const handleCheckInOut = () => {
    if (isCheckedIn) {
      // Handle check-out logic
      // Update attendance records
      const updatedRecords = [...attendanceRecords];
      const lastIndex = updatedRecords.length - 1;
      updatedRecords[lastIndex].checkOut = getCurrentTime(); // Example function to get current time
      setAttendanceRecords(updatedRecords);
      setShowSuccessMessage(true);
    } else {
      // Handle check-in logic
      // Add new attendance record
      const newRecord = {
        date: getCurrentDate(), // Example function to get current date
        checkIn: getCurrentTime(), // Example function to get current time
        checkOut: '',
        tokensEarned: 0 // Initially set to 0, update based on business logic
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
      setShowSuccessMessage(true);
    }
    // Toggle check-in status
    setIsCheckedIn(!isCheckedIn);
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  // Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <>      <header className="bg-blue-600 text-white p-4 shadow-md">
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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Attendance Page</h1>
      {/* Check-In/Check-Out Button */}
      <button
        className={`py-2 px-4 rounded-lg font-semibold text-white focus:outline-none ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        onClick={handleCheckInOut}
      >
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </button>
      {/* Success message */}
      {showSuccessMessage && (
        <div className="mt-4 bg-green-200 text-green-800 py-2 px-4 rounded-md">
          {isCheckedIn ? 'Checked in successfully!' : 'Checked out successfully!'}
        </div>
      )}
      {/* Attendance History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
        <ul>
          {attendanceRecords.map((record, index) => (
            <li key={index} className="mb-2 bg-gray-100 p-2 rounded-md">
              <span className="font-semibold">Date: {record.date}</span> <br />
              Check In: {record.checkIn} - 
              {record.checkOut ? ` Check Out: ${record.checkOut} - ` : ' Not Checked Out - '}
              Tokens Earned: {record.tokensEarned}
            </li>
          ))}
        </ul>
      </div>
    </div></>
    
  );
};

export default AttendancePage;
