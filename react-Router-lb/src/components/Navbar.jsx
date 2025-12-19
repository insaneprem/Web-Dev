import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>

      <ul style={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            style={({ isActive, isPending }) =>
              isActive
                ? {
                    ...styles.link,
                    borderBottom: "2px solid red",
                    color: "red",
                  }
                : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive, isPending }) => ({
              color: isPending ? "orange" : isActive ? "red" : "black",
              textDecoration: isActive ? "underline" : "none",
              pointerEvents: isPending ? "none" : "auto",
            })}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dash"
            style={({ isActive }) =>
              isActive
                ? {
                    ...styles.link,
                    borderBottom: "2px solid red",
                    color: "red",
                  }
                : styles.link
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/param"
            style={({ isActive }) =>
              isActive
                ? {
                    ...styles.link,
                    borderBottom: "2px solid red",
                    color: "red",
                  }
                : styles.link
            }
          >
            Parameter
          </NavLink>
        </li>
      </ul>

      <div style={styles.profile}>
        <img
          src="https://via.placeholder.com/32"
          alt="User Avatar"
          style={styles.avatar}
        />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#3366ff",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "24px",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};

export default Navbar;
