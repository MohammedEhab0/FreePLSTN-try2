import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import "./CustomNavbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`c-navbar ${scrolling ? "scrolling" : ""}`}>
      <span className="logo">
        <BsFillCheckSquareFill className="logo-icon" />
        freePLSTN
      </span>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul className="left-links lft">
          <li>
            <ScrollLink
              to="how-to-use"
              smooth={true}
              duration={500}
              className="navlink"
              onClick={toggleMenu}
            >
              How to use
            </ScrollLink>
          </li>
          <li>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/create-exam"
              onClick={toggleMenu}
            >
              Create Exam
            </NavLink>
          </li>
        </ul>
        <ul className="right-links">
          <li>
            <NavLink
              className={`navlink ${scrolling ? "scrolling" : ""}`}
              activeClassName="active"
              to="/profile"
              onClick={toggleMenu}
            >
              <FaUser className="icons" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`navlink ${scrolling ? "scrolling" : ""}`}
              activeClassName="active"
              to="/dashboard"
              onClick={toggleMenu}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`navlink login ${scrolling ? "scrolling" : ""}`}
              activeClassName="active"
              to="/login"
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="burger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
