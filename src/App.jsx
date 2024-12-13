import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MiniDrawer from "./components/pages/MiniDrawer";
import { AddStudent } from "./components/pages/students/AddStudent";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import AllStudents from "./components/pages/students/AllStudents";
import AllFaculty from "./components/pages/faculty/AllFaculty";
import UpdateFaculty from "./components/pages/faculty/UpdateFaculty";
import AddFaculty from "./components/pages/faculty/AddFaculty";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase/config";
import UpdateStudent from "./components/pages/students/UpdateStudent";
import DashHome from "./components/pages/DashHome";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Clear user if logged out
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Redirect user to dashboard if they are logged in
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  const AuthenticatedRoute = ({ element }) => {
    return user ? <Navigate to="/dashboard" /> : element;
  };

  return (
    <>
      <Routes>
        {/* Public Routes (for unauthenticated users) */}
        <Route path="/" element={<Home />} />
        
        {/* Protect Login and Register from authenticated users */}
        <Route path="/login" element={<AuthenticatedRoute element={<Login />} />} />
        <Route path="/register" element={<AuthenticatedRoute element={<SignUp />} />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />

        {/* Private Routes (for authenticated users) */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/dashboard/*" element={<MiniDrawer user={user} />}>
          <Route index element={<DashHome />} />
          <Route path="addstudent" element={<ProtectedRoute element={<AddStudent />} />} />
          <Route path="allstudents" element={<ProtectedRoute element={<AllStudents />} />} />
          <Route path="updatestudent" element={<ProtectedRoute element={<UpdateStudent />} />} />
          <Route path="addfaculty" element={<ProtectedRoute element={<AddFaculty />} />} />
          <Route path="allfaculty" element={<ProtectedRoute element={<AllFaculty />} />} />
          <Route path="updatefaculty" element={<ProtectedRoute element={<UpdateFaculty />} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
