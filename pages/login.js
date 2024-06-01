import React from 'react';

const LoginForm = () => {
  return (
    <div className="bg-[url('https://www.sats.com.sg/assets/images/annual_report/globe.svg')] min-h-screen flex items-center justify-center bg-no-repeat bg-right">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-lg max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeId">
              Employee ID
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="employeId"
              type="text"
              placeholder="Enter your employee ID"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
