import { useState } from "react";
import {useNavigate} from "react-router-dom";
export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Email or password is missing");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            alert ("Please enter a valid email address");
            return;
        }
         if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
            alert(
                "For demo login, use:\nEmail: eve.holt@reqres.in\nPassword: cityslicka");
            return;
        }
        fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => {
        if (!resp) {
          throw new Error("Login Failed");
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        alert("Login Succeed");
        navigate("/home");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("Login Error:", error);
        alert(error.message);
      });
        
    }
    return(
         <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form 
                class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
                onSubmit = {handleSubmit} >
            <div class="flex justify-center mb-4 text-black-600 text-4xl">
            <span>👤</span>
        </div>
        <h2 class="text-2xl font-bold mb-6 text-center text-black-700">
          HRMS Login
        </h2>

        <label class="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label class="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 hover:text-black transition hover:cursor-pointer text-xl"
        >
          Login
        </button>
      </form>
    </div>
    )
}