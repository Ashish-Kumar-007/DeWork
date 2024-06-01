import React from 'react';

const Dashboard = () => {
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
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="flex justify-between items-center container mx-auto">
          <div className="text-2xl font-bold">Dashboard</div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Attendance</a></li>
            <li><a href="#" className="hover:underline">Logout</a></li>
          </ul>
        </nav>
      </header>
      <div className="container mx-10 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse">
            Hello, {userName}
          </h2>
          <div className="flex items-center mb-6">
            <img src={userImage} alt="User Profile" className="w-16 h-16 rounded-full mr-4 shadow-md" />
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <p className="text-lg">
                Name: <span className="font-semibold text-shadow-md transition-colors duration-300 hover:text-indigo-500">{userName}</span>
              </p>
              <p className="text-lg mt-2">
                Token Balance: <span className="text-indigo-600 font-bold text-xl animate-bounce text-shadow-lg">{tokenBalance}</span>
              </p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-3">
            {recentActivities.map((activity, index) => (
              <li key={index} className={`flex items-center p-3 rounded-lg shadow-sm transition-colors ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300`}>
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

export default Dashboard;
