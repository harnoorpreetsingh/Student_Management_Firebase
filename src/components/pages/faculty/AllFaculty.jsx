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
import CircularProgress from "@mui/material/CircularProgress"; // For loading spinner

const AllFaculty = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  const fetchData = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, 'faculty');
    try {
      const docSnap = await getDocs(docRef);
      const data = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setdata(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch faculty data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true); // Set loading state to true while deleting
    const db = getFirestore(app);
    const dataRef = doc(db, 'faculty', id);
    try {
      await deleteDoc(dataRef);
      fetchData(); // Re-fetch the data after deleting
    } catch (error) {
      setError("Failed to delete faculty member.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl !mt-12 text-blue-500 text-center font-bold">All Faculty Members:</h1>
      <div className="grid grid-cols-4 gap-4 m-16 h-full">
        {data && data.length > 0 ? (
          data.map((dt) => {
            // Validation: Check if essential fields are missing
            if (!dt.facultyName || !dt.facultyRegNo || !dt.facultyDept) {
              return null; // Skip rendering if any field is missing
            }
            return (
              <ImgMediaCard
                key={dt.id}
                navigate={navigate}
                dt={dt}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <Typography variant="h6" color="textSecondary" className="text-center">
            No faculty members found.
          </Typography>
        )}
      </div>
    </>
  );
};

export const ImgMediaCard = ({ dt, navigate, handleDelete }) => {
  const { id, facultyDept, facultyName, facultyPhoneNumber, facultyRegNo } = dt;

  return (
    <Card className="!border !shadow-2xl text-lg hover:!bg-slate-200 !p-2 !border-black !rounded-lg text-center" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography className="!mt-8 text-lg" gutterBottom variant="h5" component="div">
          {facultyName}
        </Typography>
        <Typography className="!mt-[14px]" variant="body2" sx={{ color: "text.secondary" }}>
          <h1 className=" mt-8 mb-8 text-lg">
            Registration No: <span className="!text-[red]">{facultyRegNo}</span>
          </h1>
          <h1 className="mb-8 text-lg">
            Department: <span className="!text-[green]">{facultyDept}</span>
          </h1>
          <h1 className="mb-8 text-lg">
            Phone Number: <span className="">{facultyPhoneNumber}</span>
          </h1>
        </Typography>
      </CardContent>

      <CardActions>
        <div className="btns w-[100%] mt-[-80px] !bg-slate-600- !flex !items-center !justify-center gap-2 mb-[-180px]">
          <Button
            onClick={() => navigate("/dashboard/updatefaculty", { state: { id, dt } })}
            className="!bg-blue-500 !text-white !p-4 hover:!bg-blue-800"
            size="small"
          >
            Edit
          </Button>

          <Button
            onClick={() => handleDelete(id)}
            className="!bg-red-500 !text-white !p-4 hover:!bg-red-800"
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
