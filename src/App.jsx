import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Profile from "./components/profile";
import About from "./components/about";
import Signup from "./components/signup";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-bs-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const toggle = () => {
        setDarkMode(!darkMode);
    };
    return (
        <Router>
            <Navbar toggle={toggle} />
            <div className="main container ">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/signup" element={<Signup />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}
