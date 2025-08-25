import employeeModel from "../models/employee.model.js";
import bcrypt from "bcrypt";

export async function createEmployee(req, res) {
    try {
        //1. Extract the data
        const {name, email, designation, department, salary, password, userType} = 
        req.body;

        //2. Validate the data such as email, password, name and all
        if(!name||
           !email||
           !designation||
           !department||
           !salary||
           !password||
           !userType
        ) {
          return res.status(400).json({message: "All the fields are required."});
        }

        //3. Check if email already in db 
        const isEmailExist = await employeeModel.findOne({email});
        if(isEmailExist) {
           return res.status(400).json({message:"This email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //4. Store the data in database
        const employeeData = await employeeModel.create({name,email, department, designation, salary, password: hashedPassword, userType,});

        //5. Send successful message
        return res.status(200).json({message:"User created successfully.", data: employeeData});
    } catch (error) {
        //if any error occurs send response of error 
        console.log("Error:", error);
        res.status(500).json({message:"Internal server error."});
    }
}

//Function to get all the employee data
export async function getAllEmployees(req, res) {
    try {
        const allEmployee = await employeeModel.find();

        if (allEmployee.length === 0) {
            return res.status(404).json({message: "No employee record found."});
        }
        res.status(200).json({message: "Data found.", data: allEmployee});

    } catch (error) {
        console.log("Error while getting employee data:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

//function to get employee by id
export async function getEmployeeById(req, res){
    try{
        //1.extract employes id from request parameters (req.params.id)
        const id = req.params.id;

        //2. use EmployeeModel.findById(id) to get the record
        const employee = await employeeModel.findById(id);

        //3. if not found, return 404 with a message
        if(!employee) {
            return res.status(404).json({message:"Employee not found."});
        }
        //4. if found return the employee data with the 200
            res.status(200).json({message:"Employee data found.", data: employee});
        
    }catch (error) {
        console.log("Erorr while getting employee by id:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}




// function to update Employee data
export async function updateEmployee (req, res) {
    try {
        let hashedPassword;
        // 1. kun employee ko data update garni ho?
        const id = req.params.id;

        // 2. k k data update garne ho
        const {name, email, designation, department, userType, salary, password} = 
        req.body;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // 3. la data update garum hai 
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, {name, email, designation, department, salary, userType, password: hashedPassword},
            {new: true}
        );
        
        // 4. la message pathaidim
        res.status(200).json({message:"Employee Data Updated.", data: updatedEmployee});
    } catch (error) {
        console.log("Error while updating employee:", error);

        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({message:"Email already exists."});
        }
        res.status(500).json({message:"Internal Server Error"});
    }
}


export async function deleteEmployee (req, res) {
    try {
        //1. kun employee ko delete garni id chaiyo
        const id = req.params.id;

        //delete the employee
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);

        if(!deletedEmployee) {
            return res.status(404).json({message:"Employee to be deleted not found."});
        }
        res.status(200).json({message:"Employee data deleted.", data: deleteEmployee});
    } catch (error) {
        console.log("Error while deleting employee:", error);
        res.status(500).json({message:"Internal Server Error."});
    }
}