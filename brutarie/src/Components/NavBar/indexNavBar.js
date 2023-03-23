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

const Navbar = () => {
  const { auth } = useAuth();
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
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
