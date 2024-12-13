import { useNavigate } from "react-router-dom";
import Image from "/home.jpg";
import backgroundImage from "/bgg.jpg";

const Home = () => {
  const navigate = useNavigate()
  const navToRegister=()=>{
    navigate("/register")
  }
  const navToLogin=()=>{
    navigate("/login")
  }
  const scroll=()=>{
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }
  return (
    <div>
      <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Image})`,
        }}
      >
        <div className="w-[100%] flex justify-center items-center h-[100vh]">
          
          <div className="  max-w-[1022px]  ">
            <div className="backdrop-blur-2 backdrop-saturate-200 bg-[rgba(192,195,206,0.62)] border border-white/10 rounded-2xl p-6  w-[1022px]">
              <h3 className="text-blue-800 text-2xl font-bold ">
                Welcome to Institute Management!
              </h3>
              <p className="text-black mt-6 font-bold text-xl">
                Streamline your institution’s administrative tasks with our
                simple and efficient Institute Management System. Designed for
                ease of use, our platform enables administrators to manage
                faculty and student records effortlessly. Whether you need to
                add, update, or remove faculty and student data, our system
                makes it quick and straightforward.
              </p>
                <hr className="mt-8"/>
              <h1 className="text-blue-800 text-2xl font-bold mt-4">
                Why Choose Our System?
              </h1>
              <p className="text-black mt-12 font-semibold text-xl">
                {" "}
                <b>
                Efficient and Straightforward:</b> Focus on essential administrative
                tasks without the complexity. Our platform allows you to manage
                faculty and student records with ease.</p> 
                <p className="text-black mt-4 text-xl font-semibold"><b>No Learning Curve:</b> The
                interface is designed to be intuitive, so even users with
                minimal technical experience can get started right away.
              </p>
    <button onClick={scroll} className="bg-orange-600 border-white border hover:bg-red-500 p-5 text-white font-semibold rounded-xl mt-6">Click here to Begin. </button>
            </div>
          </div>
          </div>
    </div>


    <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex p-2 items-center">

        <div className="max-w-[530px] mt-24 ml-16 p-2  ">
            <div className="backdrop-blur-2 backdrop-saturate-200 bg-[rgba(236,227,227,0.62)] border border-white/10 rounded-2xl p-6  w-[522px]">
              <h3 className="text-blue-800 text-2xl font-bold ">
                Get Started Today!
              </h3>
              <p className="text-black mt-4 text-xl">
                We’ve made it simple to get up and running with our system.
                Whether you’re a first-time user or returning to manage your
                records, the process is fast, secure, and straightforward.</p>
                <p className="text-black mt-4 font-semibold text-xl"> New
                to the system? </p>
                <p className="text-black mt-4 text-xl">Click on the <b>Register button</b> below to create a
                new account and start managing your faculty and student records
                right away.</p>
                <p className="text-black mt-4 text-xl"> Already have an account? Click on the <b>Login</b> button
                to access your dashboard and begin managing your records
                instantly.
              </p>

              <h1 className="text-blue-800 text-2xl font-bold mt-6">
                Let's begin:
              </h1>
              <div className="flex gap-4 text-black mt-6 text-xl">
                {" "}
                <button onClick={navToRegister} className="bg-gray-500 p-3 text-black shadow-2xl hover:bg-white  font-bold rounded-xl" >Register</button>
                <button onClick={navToLogin} className="bg-gray-500 p-3 text-black  shadow-2xl hover:bg-white  font-bold rounded-xl" >Login</button>
              </div>
            </div>
          </div>
        

        </div>
       
      </div>
      </div>
  );
};

export default Home;
