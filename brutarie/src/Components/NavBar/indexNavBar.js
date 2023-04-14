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
import Logout from "../../Pages/Logout";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <>
      <Nav>
        <Bars />

        {auth.role === "admin" ? (
          <NavMenu>
            <NavLink to="/locatiiA">Locatii</NavLink>
            <NavLink to="/produseA">Produse</NavLink>
            <NavLink to="/comandaA">Comenzi</NavLink>
          </NavMenu>
        ) : (
          <NavMenu>
            <NavLink to="/produse">Produse</NavLink>
            <NavLink to="/locatii">Locatii</NavLink>
            <NavLink to="/comanda">Comanda</NavLink>
          </NavMenu>
        )}

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
