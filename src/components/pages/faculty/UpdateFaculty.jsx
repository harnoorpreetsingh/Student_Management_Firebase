import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import app from "../../firebase/config";

const UpdateFaculty = () => {
  const location = useLocation();
  const { id, dt } = location.state;

  // Make sure data exists, otherwise show an error
  if (!id || !dt) {
    return <div>Error: No faculty data provided for update</div>;
  }

  const [regno, setRegNo] = useState(dt.facultyRegNo);
  const [name, setName] = useState(dt.facultyName);
  const [number, setNumber] = useState(dt.facultyPhoneNumber);
  const [deptName, setDeptName] = useState(dt.facultyDept);
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

  const updateFaculty = async () => {
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }

    const db = getFirestore(app);
    const docRef = doc(db, "faculty", id);
    try {
      await updateDoc(docRef, {
        facultyRegNo: regno,
        facultyName: name,
        facultyPhoneNumber: number,
        facultyDept: deptName,
      });
      console.log("Faculty details updated successfully");
      navigate("/dashboard/allfaculty");  // Navigate back to faculty list
    } catch (error) {
      console.error("Error updating faculty: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Update Faculty:</h1>

      <div className="flex items-center justify-center flex-col gap-12 mt-12">
        <TextField
          id="outlined-number"
          disabled
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
          onClick={updateFaculty}
        >
          Update Faculty
        </Button>
      </div>
    </div>
  );
};

export default UpdateFaculty;
