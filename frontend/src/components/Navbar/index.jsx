import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getLinks = () => {
    if (isAuth) {
      return [
        { label: "Evaluations", path: "/your-resumes" },
        { label: "History", path: "/history" }
      ];
    }
    return [
      { label: "Home", path: "/" },
      { label: "Contact", path: "/contact" },
    ];
  };

  const links = getLinks();

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-logo" onClick={() => handleNav(isAuth ? "/your-resumes" : "/")}>
          <span className="logo-star">✦</span>
          <span className="logo-text">ResumeIQ</span>
        </div>

        <div className={`navbar-links${menuOpen ? " open" : ""}`}>
          {links.map((link) => (
            <button
              key={link.path}
              className={`nav-link${location.pathname === link.path ? " active" : ""}`}
              onClick={() => handleNav(link.path)}
            >
              {link.label}
            </button>
          ))}
          <div className="nav-mobile-actions">
            {isAuth ? (
              <button className="nav-btn-logout" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                Logout
              </button>
            ) : (
              <>
                <button className="nav-btn-ghost" onClick={() => handleNav("/login")}>Login</button>
                <button className="nav-btn-primary" onClick={() => handleNav("/register")}>
                  Get Started
                  <span className="btn-shine" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          {isAuth ? (
            <button className="nav-btn-logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="nav-btn-ghost" onClick={() => navigate("/login")}>Login</button>
              <button className="nav-btn-primary" onClick={() => navigate("/register")}>
                Get Started
                <span className="btn-shine" />
              </button>
            </>
          )}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
