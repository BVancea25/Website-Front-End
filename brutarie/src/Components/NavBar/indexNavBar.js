import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import useAuth from "../../hooks/useAuth";
import Logout from "../../hooks/Logout";
import { useState } from "react";

const Navbar = () => {
  const { auth } = useAuth();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    try {
      await Logout();
      //setIsLoggedIn(false);
      console.log("false");
    } catch (error) {
      console.log(error);
    }
  };

  // if (auth?.email !== "" && !isLoggedIn) {
  //   setIsLoggedIn(true);
  //   console.log("true");
  // }
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          {auth.role === "admin" ? (
            <NavLink to="/produseA">Produse</NavLink>
          ) : (
            <NavLink to="/produse">Produse</NavLink>
          )}

          <NavLink to="/locatii">Locatii</NavLink>
        </NavMenu>

        {auth?.email ? (
          <NavBtn>
            <Logout />
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>

            <NavBtnLink to="/login">Log In</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
