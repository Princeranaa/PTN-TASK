import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile";
import EditTodo from "./Components/EditTodo";
import ViewTodo from "./Components/ViewTodo";


function App() {
  return (
  
      <div className="">
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/todos/:id/edit" element={<EditTodo />} />
            <Route path="/todos/:id/view" element={<ViewTodo />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
 
  );
}

export default App;
