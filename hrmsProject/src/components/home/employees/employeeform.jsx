import Button from "./buttons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeForm({
  setEmployees, 
  setModelForm,
  setEditEmployees,
  editEmployee, 
}) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [department, setDepartment] = useState("");
const [designation, setDesignation] = useState("");
const [userType, setUserType] = useState("");
const [salary, setSalary] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
useEffect(() => {
  if (editEmployee) {
    setName(editEmployee.name);
    setEmail(editEmployee.email);
    setDepartment(editEmployee.department);
    setDesignation(editEmployee.designation);
    setUserType(editEmployee.userType);
    setSalary(editEmployee.salary);
  }
}, [editEmployee]);
const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !name||
        !email||
        !department||
        !designation||
        !userType||
        !salary||
        !password||
        !confirmPassword
    ) {
        alert("Please fill out all fields.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    const employeeData = {
        name,
        email,
        department,
        designation,
        userType,
        salary,
        password,
        date: new Date().toISOString().split("T")[0], 
    };
    const token = localStorage.getItem("token");
    try {
      if (editEmployee) {
        const response = await axios.put(
          `http://localhost:8000/employee/${editEmployee._id}`,
          employeeData,
          {headers: {Authorization: `Bearer ${token}`}}
        );
        setEmployees((prev) =>
          prev.map((emp) => (emp._id == editEmployee._id ? response.data.data : emp))
        );
        alert("Employee updated successfully!");
        setEditEmployees(null); 
      } else {
        const response = await axios.post(
            "http://localhost:8000/employee",
            employeeData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setEmployees((prev) => [...prev, response.data.data]);
        setModelForm(false);
        if (response.status === 201) {
            alert("Employee added successfully");
        }
      }
        setName("");
        setEmail("");
        setDepartment("");
        setDesignation("");
        setUserType("");
        setSalary("");
        setPassword("");
        setConfirmPassword("");
        
    } catch (error) {
        console.error("Error adding employee:", error);
        alert("Something went wrong while adding employee.");
    }
};
  return (
    <div className="p-7 sm:p-8">
      <div className="mb-2 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Employee
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the employee details below
        </p>
      </div>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-0.5 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-0.5 text-gray-700">Email</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Department
            </label>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm">
              <option value="" disabled>
                Select
              </option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Designation
            </label>
            <select 
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm">
              <option value="" disabled>
                Select
              </option>
              <option value="senior">Senior</option>
              <option value="midlevel">Midlevel</option>
              <option value="junior">Junior</option>
              <option value="intern">Intern</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              User Type
            </label>
            <select 
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm">
              <option value="" disabled>
                Select
              </option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Salary</label>
            <input
              type="number"
              placeholder="50000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit">
            {editEmployee ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
} 
    