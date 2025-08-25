import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "./controllers/employee.controller.js";
import cors from "cors";
import { loginEmployee } from "./controllers/auth.controller.js";
import { authorizeToken, checkRole } from "./middleware/auth.middleware.js";
dotenv.config();// cpnfiguring .env file

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())


//creating employee's route
app.post("/employee",authorizeToken, checkRole, createEmployee);
app.get("/employee", authorizeToken, checkRole, getAllEmployees);
app.get("/employee/:id", getEmployeeById);
app.put("/employee/:id", updateEmployee);
app.delete("/employee/:id", authorizeToken, deleteEmployee);
app.post("/auth", loginEmployee);

//route to verify token
app.get("/", authorizeToken, (req, res) => {
    res.status(200).json({message:"Token Verified."})
});

//database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connection Done.");
    app.listen(PORT, () => {
        console.log("Server is running at port: ", PORT);
    });
}).catch((err) => {
    console.log("Database Connection Failed.", err);
});
