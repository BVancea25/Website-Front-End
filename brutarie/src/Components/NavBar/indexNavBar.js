import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/produse">Produse</NavLink>
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
