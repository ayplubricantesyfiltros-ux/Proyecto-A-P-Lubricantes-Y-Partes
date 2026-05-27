import { useState, useEffect } from "react";
import DashboardHome from "./AdminDashboard/DashboardHome";
import MiPerfil from "./AdminDashboard/MiPerfil";
import Productos from "./AdminDashboard/Productos";
import Usuarios from "./AdminDashboard/Usuarios";



function SeccionVacia({ nombre }) {
  return (
    <div className="p-5 text-center">
      <div className="display-1 opacity-25 mb-3">
        <i className="bi bi-gear"></i></div>
      <h2 className="fw-bold mb-1">{nombre}</h2>
      <p className="text-secondary">Esta sección está en fase de desarrollo técnico.</p>
    </div>
  );
}

const API_URL = "https://69cdf09333a09f831b7caeb6.mockapi.io/productos/productos";

function AdminDashboard({ setVista, logout }) {
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(() => setProductos([]));
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const notificaciones = productos.filter(p => p.Cantidad < 10).length;

  const obtenerImagen = (img) => {
    if (!img) return "/src/assets/compresor.jpg";
    return img.startsWith("http") ? img : `/src/assets/${img}`;
  };

  const MENU_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", badge: null },
    { id: "productos", label: "Productos", icon: "bi-archive", badge: null },
    { id: "usuarios", label: "Usuarios", icon: "bi-people", badge: null },
    { id: "perfil", label: "Mi Perfil", icon: "bi-gear", badge: null },
  ];

  const manejarCambioSeccion = (id) => {
    setSeccionActiva(id);
    setMenuAbierto(false);
  };

  // --- RENDERIZADO DINÁMICO ---
  function renderContenido() {
    switch (seccionActiva) {
      case "dashboard":
        return <DashboardHome />;

      case "productos":
        return <Productos />;

      case "usuarios":
        return <Usuarios />;

      case "perfil":
        return <MiPerfil />;

      default:
        return <DashboardHome />;
    }
  }

  return (
    <div className="d-flex min-vh-100 bg-light position-relative">
      <button
        className="navbar-hamburger d-flex d-lg-none align-items-center"
        onClick={() => setMenuAbierto(prev => !prev)}
        aria-label="Abrir menú"
        style={{ position: "fixed", top: 16, left: 16, zIndex: 1100 }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside
        className={`border-end d-flex flex-column p-3 shadow-sm admin-dashboard-sidebar ${menuAbierto ? "open" : ""}`}
        style={{ width: 260, minWidth: 260, position: "sticky", top: 0, height: "100vh", zIndex: 1100, backgroundColor: "rgba(16, 20, 45, 0.95)", borderColor: "rgba(255,255,255,0.1)" }}
      >

        {/* Logo Corporativo */}
        <div className="d-flex align-items-center gap-2 pb-3 mb-3 border-bottom">
          {/* Contenedor del Logo */}
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ width: "auto", height: 45, flexShrink: 0 }}
          >
            <img
              src="https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777081287/LOGO-SIN-FONDO.png"
              alt="A&L Compresores"
              style={{ height: "40px", width: "auto", objectFit: "contain" }}
            />
          </div>

          <div>
            <div className="fw-bold" style={{ fontSize: "0.7rem", letterSpacing: "1px", color: "#f8f9fa" }}>
              SISTEMA ADMIN
            </div>
          </div>
        </div>

        {/* Info del Administrador */}
        <div className="d-flex align-items-center gap-2 rounded-4 p-3 mb-4 sidebar-usercard" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="d-flex align-items-center justify-content-center bg-white shadow-sm rounded-circle text-dark"
            style={{ width: 42, height: 42, fontSize: "1.2rem", flexShrink: 0 }}
          >
            <i className="bi bi-person-badge"></i> {/* <--- Cambia el emoji por este icono */}
          </div>
          <div className="overflow-hidden">
            <div className="fw-bold text-truncate sidebar-logo-text" style={{ fontSize: "0.85rem", color: "#f8f9fa" }}>Admin A&L</div>
            <span
              className="badge rounded-pill sidebar-badge"
              style={{ fontSize: "0.6rem", fontWeight: 600 }}
            >
              Nivel Máster
            </span>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="d-flex flex-column gap-1 flex-grow-1">
          {MENU_ITEMS.map((item) => {
            const isActive = seccionActiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => manejarCambioSeccion(item.id)}
                className="d-flex align-items-center gap-3 border-0 rounded-3 px-3 py-2 w-100 text-start fw-semibold sidebar-button"
                style={{
                  background: isActive ? "#F5A623" : "transparent",
                  color: isActive ? "#ffffff" : "#cfd8f5",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive ? "0 4px 12px rgba(245, 166, 35, 0.3)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(245, 166, 35, 0.14)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.paddingLeft = "20px";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#cfd8f5";
                    e.currentTarget.style.paddingLeft = "16px";
                  }
                }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: "1.1rem" }}></i>
                <span className="flex-grow-1">{item.label}</span>

                {item.badge > 0 && (
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.25)" : "#dc3545",
                      fontSize: "0.65rem",
                      minWidth: 22
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Botón de Salida */}
        <div className="border-top pt-3">
          <button
            onClick={() => logout()}
            className="btn btn-link d-flex align-items-center gap-2 w-100 text-decoration-none fw-bold sidebar-button"
            style={{ color: "#cfd8f5", fontSize: "0.85rem", transition: "0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#cfd8f5"}
          >
            <span><i className="bi bi-door-open"></i></span> Salir del Panel
          </button>
        </div>

      </aside>

      <div
        className={`admin-dashboard-backdrop ${menuAbierto ? "show" : ""}`}
        onClick={() => setMenuAbierto(false)}
      />

      {/* ── CONTENIDO ── */}
      <main className="flex-grow-1 overflow-auto bg-white">
        <div className="animate-fade-in">
          {renderContenido()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .admin-dashboard-sidebar {
          transition: transform 0.3s ease, left 0.3s ease;
        }

        .admin-dashboard-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          z-index: 1050;
          transition: opacity 0.2s ease;
        }

        .admin-dashboard-backdrop.show {
          display: block;
          opacity: 1;
        }

        .admin-dashboard-sidebar {
          color: #e9ecef;
        }

        .sidebar-usercard {
          background: rgba(255,255,255,0.06);
        }

        .sidebar-logo-text {
          color: #f8f9fa !important;
        }

        .sidebar-badge {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }

        .sidebar-button {
          color: #cfd8f5 !important;
        }

        .sidebar-button:hover {
          color: #ffffff !important;
        }

        @media (max-width: 992px) {
          .admin-dashboard-sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 260px;
            min-width: auto;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
          }

          .admin-dashboard-sidebar.open {
            transform: translateX(0);
          }

          main {
            padding-top: 72px;
          }

          .navbar-hamburger {
            display: flex;
          }
        }
      `}</style>

    </div>
  );
}

export default AdminDashboard;