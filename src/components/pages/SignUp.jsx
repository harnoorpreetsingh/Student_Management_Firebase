import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../../../src/assets/logo.png";
import backgroundImage from "/bg.jpg"; // Import the image
import ggl from "/google.png"
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const Provider = new GoogleAuthProvider();
  const navigate = useNavigate()
  
  function signInGoogle() {
    signInWithPopup(auth, Provider);
  }

  // State hooks for managing input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State to handle email validation error

  // Handler function for registering the user
  const registerUser = () => {
    // Simple validation for empty fields
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => console.log(value),( navigate("/dashboard")))
      .catch((err) => console.error(err));

    setEmail(""); // Reset email field
    setPassword(""); // Reset password field
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex items-center justify-end p-24  h-full ">
        {/* Glassmorphism card with backdrop filter */}
        <div className="bg-white/40 max-w-xl  backdrop-blur-xl backdrop-saturate-150 bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
          {/* Logo */}
          <img src={logo} className="rounded-3xl w-[60px] mb-4 mx-auto" alt="logo" />
          
          {/* Main Heading */}
          <h1 className="text-xl font-bold ">Hi There!</h1>
          <h2 className="text-lg ">
            Fill the form below to Register to{" "}
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

            {/* Register Button */}
            <Button
              variant="outlined"
              className="hover:bg-black hover:text-white"
              size="large"
              onClick={registerUser}
              sx={{ backgroundColor: "#1179ba", color: "white" }}
              fullWidth
            >
              Register
            </Button>

            <h1 className="text-2xl font-bold my-1">OR</h1>

            {/* Google Sign-In Button */}
            <Button
              onClick={signInGoogle}
              size="large"
              variant="contained"
              className="hover:bg-black"
              sx={{ backgroundColor: "#03252e", color: "white" }}
              fullWidth
            >
              Sign Up With{" "}
              <img src={ggl} className=" ml-2 w-[90px]" alt="" />
              {/* <span className="!text-yellow-500 font-bold hover:text-xl ml-1 hover:text-white">
                Google
              </span> */}
            </Button>
            <h1 className="font-semibold" >Already Registered ? <Link to= "/login"><span className="text-blue-600 font-bold text-lg hover:underline hover:cursor-pointer" >Login.</span> </Link> </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;