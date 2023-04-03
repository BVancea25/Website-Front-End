import "./CSS/App.css";
import Home from "./Pages/Home";
import "./CSS/About.css";
import Produse from "./Pages/Produse";
import Signin from "./Pages/Signin";
import Navbar from "./Components/NavBar/indexNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RequireAuth from "./Components/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import ProduseAdmin from "./Pages/ProduseAdmin";
import About from "./Pages/About";
import { useState } from "react";
import { useEffect } from "react";
import Locatie from "./Pages/Locatie";
import { useLoadScript } from "@react-google-maps/api";
import GOOGLE_API_KEY from "./Variables";

function App() {
  const [showAbout, setShowAbout] = useState(false);

  useLoadScript({ googleMapsApiKey: GOOGLE_API_KEY });

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");

      if (aboutSection) {
        const position = aboutSection.getBoundingClientRect();
        if (position.top <= window.innerHeight && position.bottom >= 0) {
          setShowAbout(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/produse" element={<Produse />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/locatii" element={<Locatie />} />

          <Route element={<RequireAuth allowedRole="admin" />}>
            <Route path="/produseA" element={<ProduseAdmin />} />
          </Route>
        </Routes>
        <div id="about" className="about">
          {showAbout && <About />}
        </div>
      </Router>
    </div>
  );
}

export default App;
