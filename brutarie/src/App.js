import "./App.css";
import Home from "./Pages/Home";

import Produse from "./Pages/Produse";
import Locatii from "./Pages/Locatii";
import Signin from "./Pages/Signin";
import Navbar from "./Components/NavBar/indexNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RequireAuth from "./Components/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import ProduseAdmin from "./Pages/ProduseAdmin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/produse" element={<Produse />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/locatii" element={<Locatii />} />

        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/produseA" element={<ProduseAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
