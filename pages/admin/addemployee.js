import EmployeeForm from "../components/EmployeeForm";


export default function AddEmployee() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add Employee</h1>
      <EmployeeForm />
    </div>
  );
}
