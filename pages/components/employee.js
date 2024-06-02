import Image from 'next/image';
import React from 'react';
import logo from "../../public/dework.png";

const Employee = () => {
  const userName = "John Doe";
  const userImage = "https://via.placeholder.com/150"; // Replace with actual image URL
  const tokenBalance = 12345;
  const recentActivities = [
    { activity: "Checked in at 9:00 AM", icon: "🕘" },
    { activity: "Checked out at 5:00 PM", icon: "🕔" },
    { activity: "Earned 50 tokens", icon: "💰" },
    { activity: "Completed Performance Review", icon: "📈" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
            Hello, {userName}
          </h2>
          <div className="flex items-center px-6 py-4">
            <img src={userImage} alt="User Profile" className="w-16 h-16 rounded-full mr-4 shadow-md" />
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-lg">
                Name: <span className="font-semibold text-indigo-500">{userName}</span>
              </p>
              <p className="text-lg mt-2">
                Token Balance: <span className="text-indigo-600 font-bold text-xl">{tokenBalance}</span>
              </p>
            </div>
          </div>
          <h3 className="text-xl font-semibold px-6">Recent Activities</h3>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <li key={index} className={`flex items-center px-6 py-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300`}>
                <span className="text-2xl mr-3">{activity.icon}</span>
                <p className="text-gray-800">{activity.activity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Employee;
