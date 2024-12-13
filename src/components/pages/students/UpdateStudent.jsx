import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import app from "../../firebase/config";
import { useLocation, useNavigate } from "react-router-dom"
import st from "/editSt.svg"

const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const locationData = location.state;
    console.log(locationData,"lclclllclccl")

    if (!locationData) {
        return <div>Error: No student data provided for update</div>;
    }

    const [admno, setAdmNo] = useState(locationData[0]);
    const [name, setName] = useState(locationData[1]?.studentName);
    const [number, setNumber] = useState(locationData[1]?.studentPhone);
    const [className, setClassName] = useState(locationData[1]?.studentClassName);

    const updateStud = (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const studentRef = ref(db, 'student/' + locationData[0]);

        update(studentRef, {
            studentName: name,
            studentPhone: number,
            studentClassName: className,
        })
        .then(() => {
            setTimeout(() => {
                navigate("/dashboard/allstudents");
            }, 500);
        })
        .catch((err) => {
            console.error("Error updating student:", err);
        });
    };

    return (
        <div className="grid grid-cols-2 mx-40 h-[80vh] justify-center items-center border border-black my-12 p-6" >
           <div className="img">
            <img src={st} alt=""  />
           </div>
           <div className="form">
           <h1 className="text-2xl text-blue-500 text-center font-bold mt-16 ">Fill the form below to Edit Admission No. {admno}: </h1>
            <div className="flex items-center justify-center flex-col gap-12 mt-12">
                <TextField
                    id="outlined-number"
                    label="Adm No"
                    type="number"
                    disabled
                    value={admno}
                    required
                    onChange={(e) => setAdmNo(e.target.value)}
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
                />
                <TextField
                    className="!border !border-black"
                    id="outlined-basic"
                    label="Enter Class"
                    variant="outlined"
                    required
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Phone Number"
                    type="number"
                    value={number}
                    required
                    onChange={(e) => setNumber(e.target.value)}
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
                    onClick={updateStud}
                >
                    Update Student
                </Button>
            </div>
           </div>
        </div>
    );
};

export default UpdateStudent;
