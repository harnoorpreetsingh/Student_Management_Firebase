import {
  Button,
  TextField,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import fm from "/formSt.png";

export const AddStudent = () => {
  const [admno, setAdmNo] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  console.log("All Students component");

  const validateForm = () => {
    if (!admno || !name || !className || !number) {
      setError("All fields are required.");
      return false;
    }

    if (isNaN(admno) || admno <= 0) {
      setError("Please enter a valid Admission Number.");
      return false;
    }

    if (isNaN(number)) {
      setError("Please enter a valid phone number.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const addStud = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Set loading to true when starting submission
    const db = getDatabase(app);
    try {
      await set(ref(db, "student/" + admno), {
        studentName: name,
        studentPhone: number,
        studentClassName: className,
      });
      navigate("/dashboard/allstudents");
    } catch (err) {
      console.log(err);
      setError("Failed to add student.");
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 mx-48 h-[80vh] justify-center items-center border border-black my-16 p-4">
        <div className="img">
          <img className="!shadow-2xl" src={fm} alt="form icon" />
        </div>
        <div className="form">
          <h1 className="text-2xl text-blue-500 text-center font-bold">
            Fill the form below to Add Student:
          </h1>

          <div className="flex items-center text-center justify-center flex-col gap-12 mt-12">
            {error && (
              <FormHelperText error className="text-center">
                {error}
              </FormHelperText>
            )}

            <TextField
              id="outlined-number"
              label="Adm No"
              type="number"
              value={admno || ""}
              required
              onChange={(e) => setAdmNo(e.target.value)}
              error={!!error}
              helperText={
                error && admno && !admno ? "Invalid admission number" : ""
              }
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              className="!border !border-black"
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              className="!border !border-black"
              id="outlined-basic"
              label="Enter Class"
              variant="outlined"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              fullWidth
            />

            <TextField
              id="outlined-number"
              label="Phone Number"
              type="number"
              value={number || ""}
              required
              onChange={(e) => setNumber(e.target.value)}
              error={!!error}
              helperText={
                error && number && number.length < 10
                  ? "Phone number must be at least 10 digits"
                  : ""
              }
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Button
              variant="outlined"
              className="hover:bg-blue-600 !shadow-2xl !shadow-blue-600 hover:text-white"
              size="large"
              onClick={addStud}
              disabled={loading} // Disable button while loading
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Add Student"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
