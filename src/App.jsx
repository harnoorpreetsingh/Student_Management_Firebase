import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MiniDrawer from "./components/pages/MiniDrawer";
import { AddStudent } from "./components/pages/AddStudent";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import AllStudents from "./components/pages/AllStudents";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase/config";
import UpdateStudent from "./components/pages/UpdateStudent";

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

  if (user === null) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      {/* Dashboard Routes (MiniDrawer layout) */}
      <Routes>
        <Route path="/dashboard/*" element={<MiniDrawer user={user} />}>
          <Route index element={<div>Dashboard Home</div>} /> {/* Optional home for dashboard */}
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="allstudents" element={<AllStudents />} />
          <Route path="updatestudent" element={<UpdateStudent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
