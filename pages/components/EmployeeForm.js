import { useEffect, useState } from "react";

const sections = [
  {
    title: "Personal Information",
    fields: [
      { name: "full Name", type: "text" },
      { name: "Wallet Address", type: "text" },
      { name: "date Of Birth", type: "date" },
      { name: "gender", type: "select", options: ["Male", "Female", "Other"] },
      { name: "phone Number", type: "tel" },
      { name: "email", type: "email" },
      { name: "permanent Address", type: "text" },
      { name: "current Address", type: "text" },
    ],
  },
  {
    title: "Employment Details",
    fields: [
      { name: "employee Id", type: "text" },
      { name: "department", type: "text" },
      { name: "job Title", type: "text" },
      { name: "date Of Joining", type: "date" },
      {
        name: "employment Type",
        type: "select",
        options: ["Full-time", "Part-time", "Contract", "Intern"],
      },
      { name: "reporting Manager", type: "text" },
    ],
  },
  // {
  //   title: "Salary and Compensation",
  //   fields: [
  //     { name: "gross Salary", type: "number" },
  //     {
  //       name: "payment Frequency",
  //       type: "select",
  //       options: ["Monthly", "Bi-weekly"],
  //     },
  //   ],
  // },
  // {
  //   title: "Financial Information",
  //   fields: [
  //     { name: "bank Account Number", type: "text" },
  //     { name: "bank Name", type: "text" },
  //     { name: "IFSC Code", type: "text" },
  //     { name: "PAN", type: "text" },
  //     { name: "Aadhar", type: "text" },
  //   ],
  // },
  // {
  //   title: "Work Details",
  //   fields: [
  //     { name: "work Hours", type: "text" },
  //     { name: "shifts", type: "text" },
  //     { name: "leave Entitlement", type: "text" },
  //   ],
  // },
];
import { Web3 } from "web3";
import { deworkContractABI, deworkContract } from "../contract/dework.json";
import { useAccount } from "wagmi";
import { Router } from "next/router";
export default function EmployeeForm() {
  const {address}  = useAccount()
  // const [web3, setWeb3] = useState(null);
  // useEffect(() => {
  //   if (window && window?.ethereum) {
  //     setWeb3(new Web3(window?.ethereum));
  //   }
  // }, []);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let web3;
      if (window && window?.ethereum) {
        web3= (new Web3(window?.ethereum));
      }
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
      alert("Employee Added")
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData); // Handle form submission logic here
  // };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{sections[currentStep].title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {sections[currentStep].fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700 capitalize">
                {field.name}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select {field.name}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-4"
            >
              Back
            </button>
          )}
          {currentStep < sections.length - 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Next
            </button>
          )}
          {currentStep === sections.length - 1 && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
