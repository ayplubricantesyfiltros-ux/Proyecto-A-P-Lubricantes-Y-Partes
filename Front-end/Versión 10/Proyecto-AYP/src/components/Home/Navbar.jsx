import { useState, useEffect } from "react";

const LINKS = [
  { label: "Inicio", vista: "inicio", icon: "bi-house-door" },
  { label: "Nosotros", vista: "nosotros", icon: "bi-info-circle" },
  { label: "Productos", vista: "productos", icon: "bi-tools" },
  { label: "Contactos", vista: "contactos", icon: "bi-envelope" },
];

function Navbar({
  setVista,
  vistaActual,
  usuario,
  logout,
  onOpenLogin
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = {
    backgroundColor: isScrolled ? "rgba(16, 20, 45, 0.95)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    borderBottom: isScrolled  
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid transparent",
    transition: "all 0.4s ease-in-out",
    padding: isScrolled ? "10px 0" : "20px 0",
  };

  const navegar = (v) => {
    setVista(v);
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
      <div className="container">
        
        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777081287/LOGO-SIN-FONDO.png"
            alt="A&L"
            style={{
              height: "55px",
              transform: "scale(2.2)",
              transformOrigin: "left center",
            }}
          />
        </a>

        {/* BOTÓN */}
        <button
          className="navbar-toggler"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          
          {/* LINKS */}
          <div className="navbar-nav mx-auto text-center gap-2">
            {LINKS.map((link) => (
              <a
                key={link.vista}
                href="#"
                className={`nav-link ${
                  vistaActual === link.vista ? "fw-bold" : ""
                }`}
                style={{
                  color:
                    vistaActual === link.vista ? "#FFC107" : "#F4F4F4",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFC107")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    vistaActual === link.vista ? "#FFC107" : "#F4F4F4")
                }
                onClick={(e) => {
                  e.preventDefault();
                  navegar(link.vista);
                }}
              >
                <i className={`bi ${link.icon} me-1`}></i>
                {link.label}
              </a>
            ))}
          </div>

          {/* DERECHA */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-2 mt-2 mt-md-0">

            {/* AUTH */}
            {usuario ? (
              <>
                <button
                  className="btn btn-light"
                  onClick={() => navegar("perfil")}
                >
                  {usuario.nombre}
                </button>

                <button className="btn btn-light" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-light"
                onClick={onOpenLogin}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;