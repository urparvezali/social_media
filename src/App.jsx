import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Profile from "./components/profile";
import About from "./components/about";

export default function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
            <Footer></Footer>
        </Router>
    );
}
