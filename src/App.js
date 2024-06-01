import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './AuthContext';
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/HomePage/Home";
import About from "./Pages/About/About";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/LoginPage/Login";
import Recipe from "./Pages/Recipes/Recipe";
import CocktailDetails from "./Pages/CocktailDetails/CocktailDetails";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/about" element={<About/>}/>
        <Route path="/recipes" element={<Recipe/>}/>
        <Route exact path="/cocktail/detail/:id" element={<CocktailDetails/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
      

      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </AuthProvider>
    </>
  );
}

export default App;
