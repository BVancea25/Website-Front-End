import "./App.css";
import Home from "./Pages/Home";
import axios from "axios";
import Produse from "./Pages/Produse";
import Locatii from "./Pages/Locatii";
import Signin from "./Pages/Signin";
import Navbar from "./Components/NavBar/indexNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RequireAuth from "./Components/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  // const [produse, setData] = useState();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/produse")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/produse" element={<Produse />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Home />} />

        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/locatii" element={<Locatii />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
