import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/config"
import { useNavigate } from "react-router-dom";


export const AddStudent = () => {
  const [admno, setAdmNo] = useState(null)
  const [name, setName] = useState("")
  const [number, setNumber] = useState(null)
  const [className, setClassName] = useState("")
  const navigate = useNavigate()
  
  const addStud = (e) => {
    e.preventDefault()
    // console.log(name, number, "okok")
    const db = getDatabase(app)
    set(ref(db, "student/" + admno),{
      studentName:name,
      studentPhone:number,
      studentClassName:className,

    }).then(res=>{
      navigate("/dashboard/allstudents")
    }).catch(err=>{
      console.log(err)
    })
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Fill the form below to Add Student:{" "}
      </h1>

      <div className="flex items-center justify-center flex-col gap-12 mt-12">
      <TextField
          id="outlined-number"
          label="Adm No"
          type="number"
          value={admno || ""}
          required
          onChange={(e)=>setAdmNo(e.target.value)}
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
          onChange={(e)=>setName(e.target.value)}
        />

<TextField
          className="!border !border-black"
          id="outlined-basic"
          label="Enter Class"
          variant="outlined"
          required
          value={className}
          onChange={(e)=>setClassName(e.target.value)}
        />

        <TextField
          id="outlined-number"
          label=" Phone Number"
          type="number"
          value={number || ""}
          required
          onChange={(e)=>setNumber(e.target.value)}
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
          onClick={addStud}
        >
          Add Student
        </Button>
      </div>
    </div>
  );
};
