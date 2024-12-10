import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../../../src/assets/logo.png";
import backgroundImage from "/bgl1.jpg"; // Import the image
import ggl from "/google.png"; // Import Google logo image
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const Provider = new GoogleAuthProvider();

  function signInGoogle() {
    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log("Google sign-in successful", result);
      })
      .catch((error) => {
        console.error("Google sign-in error", error);
      });
  }

  // State hooks for managing input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State to handle email validation error

  const navigate = useNavigate()
  // Handler function for logging in the user
  const loginUser = () => {
    // Simple validation for empty fields
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((value) => console.log("Logged in:", value)
     
     ,( navigate("/dashboard"))
    )

      .catch((err) => console.error("Login error:", err));

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex items-center justify-start ml-28 h-full">
        {/* Glassmorphism card with backdrop filter */}
        <div className="bg-white/40 max-w-lg backdrop-blur-xl backdrop-saturate-150 bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl  w-full text-center">
          {/* Logo */}
          <img src={logo} className="rounded-3xl w-[60px] mb-4 mx-auto" alt="logo" />
          
          {/* Main Heading */}
          <h1 className="text-xl font-bold mb-2">Welcome Back!</h1>
          <h2 className="text-lg mb-2">
            Please fill in your credentials to log in to{" "}
          </h2>
          <h2 className="font-bold text-xl mb-8 text-blue-600">
              Student Management System
            </h2>

          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <TextField
              className="!border !border-black"
              id="outlined-email"
              label="Enter Email"
              variant="outlined"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle input changes
              error={!!emailError} // Trigger error state
              helperText={emailError} // Show the error message
              fullWidth
            />

            {/* Password Field */}
            <TextField
              className="!border !border-black"
              id="outlined-password"
              label="Enter Password"
              variant="outlined"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle input changes
              fullWidth
            />

            {/* Login Button */}
            <Button
              variant="outlined"
              className="hover:bg-black hover:text-white"
              size="large"
              onClick={loginUser}
              sx={{ backgroundColor: "#1179ba", color: "white" }}
              fullWidth
            >
              Login
            </Button>

            <h1 className="text-2xl font-bold my-1">OR</h1>

            {/* Google Sign-In Button */}
            <Button
              onClick={signInGoogle}
              size="large"
              variant="contained"
              className="hover:bg-black"
              sx={{ backgroundColor: "#092c54", color: "white" }}
              fullWidth
            >
              Sign In With{" "}
              <img src={ggl} className="ml-2 w-[90px]" alt="google logo" />
            </Button>

            <h1 className="font-semibold" >Not Registered Yet? <Link to= "/register"><span className="text-blue-600 font-bold text-lg hover:underline hover:cursor-pointer" >Register Now.</span> </Link> </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
