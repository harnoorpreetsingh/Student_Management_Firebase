import { useNavigate } from "react-router-dom";
import Image from "/18.jpg";

const DashHome = () => {
  const navigate = useNavigate()

  const toAllStud=()=>{
    navigate("/dashboard/allstudents")
  }
  const toAddStud=()=>{
    navigate("/dashboard/addstudent")
  }
  const toAllF=()=>{
    navigate("/dashboard/allfaculty")
  }
  const toAddF=()=>{
    navigate("/dashboard/addfaculty")
  }
  return (
    <div>
      <div className="bg-gray-700 top-0">
        <div
          className="relative w-full h-screen top-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${Image})`,
          }}
        >
          <div className="w-[100%] flex justify-center p-2  h-[100vh]">
            <div className="  max-w-[1022px]  mt-12">
              <div className="backdrop-blur-2 backdrop-saturate-200 bg-[rgba(215,218,231,0.62)] border border-white/10 rounded-2xl p-6  w-[1022px]">
                <h3 className="text-blue-800 text-3xl font-bold ">
                  Welcome to the Institute Management System!{" "}
                </h3>
                <p className="mt-6 text-xl">
                  We're excited to have you on board. Let's get started with
                  managing your institution’s faculty and student records.
                </p>

                <p className="mt-4 text-xl">
                  To begin, simply choose one of the following options:
                </p>

                <p className="mt-4 text-xl">
                  <strong>Use the App Drawer:</strong> Access the main features
                  by clicking on the app drawer located on the left.
                </p>

                <p className="mt-4 text-xl">
                  <strong>Click Below to Get Started:</strong> Alternatively,
                  click on the buttons below to begin managing your records
                  right away.
                </p>

                <p className="mt-4 text-xl">
                  We’ve designed the platform to be intuitive and easy to
                  navigate, ensuring you can efficiently manage all your
                  administrative tasks.
                </p>

                <p className="mt-4 text-xl">
                  Let’s make your workflow smoother and more organized.
                </p>
                <div className="btns flex mt-12 gap-8 border border-black p-6 justify-between">
                  <button onClick={toAllStud} className="bg-orange-500 hover:bg-orange-600 hover:p-5 p-4 text-white hover:text-black rounded-lg" >View & Manage All Students</button>
                  <button onClick={toAddStud} className="bg-green-500 hover:bg-green-600 hover:p-5 p-4 text-white hover:text-black rounded-lg" >Add Student</button>
                  <button onClick={toAllF} className="bg-blue-500 hover:bg-blue-600 hover:p-5 p-4 text-white hover:text-black rounded-lg" >View & Manage Faculty</button>
                  <button onClick={toAddF} className="bg-green-500 hover:bg-green-600 hover:p-5 p-4 text-white hover:text-black rounded-lg" >Add Faculty</button>
                </div>
              </div>
            </div>
          </div>
  
        
        </div>
      </div>
    </div>
  );
};

export default DashHome;
