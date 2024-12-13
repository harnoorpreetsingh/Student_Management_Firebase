import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import app from "../../firebase/config";
// card components
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const AllStudents = () => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()  

  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, "student");

    // Fetch data from the database
    onValue(
      studentRef,
      (snapshot) => {
        const data = snapshot.val();

        // Check for errors or empty data
        if (data) {
          setStudents(data);
          setLoading(false);
        } else {
          setError("No students data available.");
          setLoading(false);
        }
      },
      (error) => {
        // Handle any errors from Firebase
        setError(error.message);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = (key) => {
    const db = getDatabase(app);
    const studentRef = ref(db, "student/" + key); // Correct the reference path by adding a slash
    remove(studentRef)
      .then(() => {
        console.log("Student removed successfully");
      })
      .catch((err) => {
        console.error("Error removing student: ", err);
      });
  };

  // const moveToEdit=()=>{
  //   navigate("/dashboard/updatestudent", {state:[key,stud]})
  // }

  return (
    <div className="grid grid-cols-4 gap-4 m-16 h-full">
      {students &&
        Object.entries(students).map(([key, stud]) => {
          return (
            <ImgMediaCard
              key={key} // Add key to prevent React warning about lists without keys
              handleDelete={handleDelete}
              navigate={navigate}
              // moveToEdit={moveToEdit}
              id={key} // Pass the key as id
              stud={stud}
            />
          );
        })}
    </div>
  );
};

export const ImgMediaCard = ({ stud, handleDelete, id, navigate  }) => {
  const { studentName, studentPhone, studentClassName } = stud;

  return (
    <Card className="border !shadow-2xl hover:!bg-slate-200 border-black !rounded-lg  text-center" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {studentName}
        </Typography>
        <Typography
          className="!mt-[14px]"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          <h1 className="mb-4 mt-6">
            Admission No: <span className="!text-[red]">{id}</span>
          </h1>
          <h1 className="mb-4">
            Class: <span className="!text-[green]">{studentClassName}</span>
          </h1>
          <h1 className="">
            Phone Number: <span className="">{studentPhone}</span>
          </h1>
        </Typography>
      </CardContent>
      
      <CardActions>
        <div className="btns w-[100%] !bg-slate-600- !flex !items-center !justify-center gap-2 mb-[-62px]">
          <Button onClick={()=>navigate("/dashboard/updatestudent", {state:[id,stud]})}
            className="!bg-blue-500 !text-white hover:!bg-blue-800"
            size="small"
          >
            Edit
          </Button>


          <Button
            onClick={() => handleDelete(id)}
            className="!bg-red-500 !text-white hover:!bg-red-800"
            size="small"
          >
            Delete
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default AllStudents;
