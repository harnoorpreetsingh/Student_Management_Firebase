import React, { useState } from "react";
import { TextField, Button, CircularProgress, FormHelperText } from "@mui/material";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [emailError, setEmailError] = useState(""); // Email validation error
  const [passwordError, setPasswordError] = useState(""); // Password validation error
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError(""); // Clear the error
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError(""); // Clear the error
    }

    return isValid;
  };

  const loginUser = () => {
    // First, validate the form
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true when starting the login process
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log("Logged in:", value);
        navigate("/dashboard"); // Redirect to dashboard
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the process
      });

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  function signInGoogle() {
    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log("Google sign-in successful", result)
        navigate("/dashboard")
      })
      .catch((error) => {
        console.error("Google sign-in error", error);
      });
  }

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex items-center justify-start ml-28 h-full">
        {/* Glassmorphism card with backdrop filter */}
        <div className="bg-white/40 max-w-lg backdrop-blur-xl backdrop-saturate-150 bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl w-full text-center">
          {/* Logo */}
          <img src={logo} className="rounded-3xl w-[60px] mb-4 mx-auto" alt="logo" />

          {/* Main Heading */}
          <h1 className="text-xl font-bold mb-2">Welcome Back!</h1>
          <h2 className="text-lg mb-2">Please fill in your credentials to log in to </h2>
          <h2 className="font-bold text-xl mb-8 text-blue-600">Institute Management System</h2>

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
              error={!!passwordError} // Trigger password error state
              helperText={passwordError} // Show the error message
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
              disabled={loading} // Disable the button while loading
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
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

            <h1 className="font-semibold">
              Not Registered Yet?{" "}
              <Link to="/register">
                <span className="text-blue-600 font-bold text-lg hover:underline hover:cursor-pointer">
                  Register Now.
                </span>{" "}
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
