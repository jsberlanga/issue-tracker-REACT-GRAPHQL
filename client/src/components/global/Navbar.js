import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 3rem;

  .navbar__logo {
    font-size: 2.4rem;
  }

  .navbar__links {
    display: flex;
    li a {
      padding: 0 3rem;
    }
    li a:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <h1 className="navbar__logo">
        <Link to="/">Issue Tracker</Link>
      </h1>
      <ul className="navbar__links">
        <li>
          <Link to="/issues">View issues</Link>
        </li>
        <li>
          <Link to="/create">Create an issue</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Navbar;
