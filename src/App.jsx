import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AddNewDoctor from "./Components/AddNewDoctor";
import Message from "./Components/Message";
import Doctors from "./Components/Doctors";
import { Context } from "./main";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import AddNewAdmin from "./Components/AddNewAdmin";
import "./App.css";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1.1/userrigister/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
        <Route path='/doctor/addnew' element={<AddNewDoctor />} />
        <Route path='/admin/addnew' element={<AddNewAdmin />} />
        <Route path='/message' element={<Message />} />
        <Route path='/doctors' element={<Doctors />} />
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
  );
};

export default App;