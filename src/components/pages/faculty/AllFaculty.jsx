import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase/config";
import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const AllFaculty = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState(null);

  const fetchData = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, 'faculty');
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    setdata(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const db = getFirestore(app);
    const dataRef = doc(db, 'faculty', id);
    try {
      await deleteDoc(dataRef);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {data && data.map((dt) => {
        return (
          <ImgMediaCard
            key={dt.id}
            navigate={navigate}
            dt={dt}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export const ImgMediaCard = ({ dt, navigate, handleDelete }) => {
  const { id, facultyDept, facultyName, facultyPhoneNumber, facultyRegNo } = dt;

  return (
    <Card className="border border-black text-center h-[220px]" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {facultyName}
        </Typography>
        <Typography className="!mt-[14px]" variant="body2" sx={{ color: "text.secondary" }}>
          <h1 className="mb-2">
            Registration No: <span className="!text-[red]">{facultyRegNo}</span>
          </h1>
          <h1 className="mb-2">
            Department: <span className="!text-[green]">{facultyDept}</span>
          </h1>
          <h1 className="">
            Phone Number: <span className="">{facultyPhoneNumber}</span>
          </h1>
        </Typography>
      </CardContent>

      <CardActions>
        <div className="btns w-[100%] !bg-slate-600- !flex !items-center !justify-center gap-2 mb-[-32px]">
          <Button
            onClick={() => navigate("/dashboard/updatefaculty", { state: { id, dt } })}
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

export default AllFaculty;
