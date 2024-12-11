import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import app from "../../firebase/config";  // Make sure app is correctly imported from your firebase config

const AddFaculty = () => {
  const [regno, setRegNo] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [deptName, setDeptName] = useState("");
  const [errors, setErrors] = useState({
    regno: "",
    name: "",
    number: "",
    deptName: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      regno: "",
      name: "",
      number: "",
      deptName: "",
    };

    // Validate Registration Number
    if (!regno) {
      newErrors.regno = "Registration Number is required";
    }

    // Validate Name
    if (!name) {
      newErrors.name = "Name is required";
    }

    // Validate Phone Number
    if (!number) {
      newErrors.number = "Phone Number is required";
    } else if (!/^\d+$/.test(number)) {
      newErrors.number = "Phone Number must be numeric";
    }

    // Validate Department Name
    if (!deptName) {
      newErrors.deptName = "Department Name is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const addFaculty = async (e) => {
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }

    e.preventDefault();

    const db = getFirestore(app);
    
    try {
      const docRef = await addDoc(collection(db, "faculty"), {
        facultyName: name,
        facultyPhoneNumber: number, // Make sure the field names are correct as per your Firestore structure
        facultyRegNo: regno,
        facultyDept: deptName, // Use `deptName` as it's defined in your state
      });

      console.log("Document written with ID: ", docRef.id);
      navigate("/dashboard/allfaculty");  // Adjust the path as needed
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Add Faculty:</h1>

        <div className="flex items-center justify-center flex-col gap-12 mt-12">
          <TextField
            id="outlined-number"
            label="Registration No"
            type="number"
            value={regno || ""}
            required
            onChange={(e) => setRegNo(e.target.value)}
            helperText={errors.regno}
            error={!!errors.regno}
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
            helperText={errors.name}
            error={!!errors.name}
          />

          <TextField
            className="!border !border-black"
            id="outlined-basic"
            label="Enter Department"
            variant="outlined"
            required
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            helperText={errors.deptName}
            error={!!errors.deptName}
          />

          <TextField
            id="outlined-number"
            label="Phone Number"
            type="number"
            value={number || ""}
            required
            onChange={(e) => setNumber(e.target.value)}
            helperText={errors.number}
            error={!!errors.number}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Button
            variant="outlined"
            className="hover:bg-blue-600 hover:text-white"
            size="large"
            onClick={addFaculty}
          >
            Add Faculty
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddFaculty;
