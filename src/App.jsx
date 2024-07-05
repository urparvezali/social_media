import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Profile from "./components/profile";
import About from "./components/about";
import Signup from "./components/signup";

export default function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <div className="main">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/signup" element={<Signup />} />
                </Routes>
            </div>
            <Footer></Footer>
        </Router>
    );
}
