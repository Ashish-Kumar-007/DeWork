import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const DashboardPage = () => {
  // State for employee list
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager' },
    { id: 3, name: 'Alice Johnson', position: 'Marketing Coordinator' },
    // Add more employees as needed
  ]);

  // State for new employee form
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });

  // Function to handle form submission and add new employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEmployee.name.trim() !== '' && newEmployee.position.trim() !== '') {
      setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
      setNewEmployee({ name: '', position: '' });
    }
  };

  // Function to handle input changes in the new employee form
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Function to remove an employee from the list
  const handleRemoveEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-4">Admin Dashboard</h1>

      {/* Employee Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Employee Management</h2>
        {/* New Employee Form */}
        <form onSubmit={handleSubmit} className="mb-4 flex items-center">
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleChange}
            placeholder="Employee Name"
            className="mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
          <input
            type="text"
            name="position"
            value={newEmployee.position}
            onChange={handleChange}
            placeholder="Position"
            className="mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none transition duration-300"
          >
            Add Employee
          </button>
        </form>
        {/* Employee List */}
        <ul>
          {employees.map(employee => (
            <Transition
              key={employee.id}
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <li className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
                <button
                  onClick={() => handleRemoveEmployee(employee.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
                >
                  Remove
                </button>
              </li>
            </Transition>
          ))}
        </ul>
      </div>

      {/* Attendance Management Section */}
    </div>
  );
};

export default DashboardPage;
