import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Web3 } from "web3";
import { deworkContractABI, deworkContract } from "../contract/dework.json";
import { useAccount } from "wagmi";

const DashboardPage = () => {
  const {address}  = useAccount()
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    if (window && window?.ethereum) {
      setWeb3(new Web3(window?.ethereum));
    }
  }, []);
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });

  // Function to handle form submission and add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // let web3;
      // if (window && window?.ethereum) {
      //   web3= (new Web3(window?.ethereum));
      // }
      const contract = new web3.eth.Contract(
        deworkContractABI,
        deworkContract
      );
      const formDataJson = JSON.stringify(formData);
  
      console.log(formDataJson);
  
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pinataOptions: { cidVersion: 0 },
          pinataContent: formData,
        }),
      };
  
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
      const resData = await response.json();
      console.log(resData, formData["Wallet Address"], resData.IpfsHash);
      const employeeAddress = formData["Wallet Address"]
      await contract.methods.addEmployee(employeeAddress, resData.IpfsHash).send({
        from: address
      })
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeLists = async () => {
    try {
      const contract = new web3.eth.Contract(
        deworkContractABI,
        deworkContract
      );
      
      const addresses = await contract.methods.getAllEmployeeDetails().call({from :address});
      const employeesArray = []; // Temporary array to hold employee details
    for (let i = 0; i < addresses.length; i++) {
        const employee = await contract.methods.getEmployeeDetails(addresses[i]).call();
        const employeeJson = JSON.stringify(employee);
        employeesArray.push(employee);
    }
    setEmployees(employeesArray); // Set state once with the accumulated data
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle input changes in the new employee form
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const call = async () => {
      await fetchEmployeeLists();
    }
    call ()
  })


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-4">Admin Dashboard</h1>

      {/* Employee Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 underline">Employee Management</h2>

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
                  {employee}
                  <p className="font-semibold">{employee.employeeDetailsHash}</p>
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
