import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Nosotros from "./Pages/Nosotros";
import Productos from "./Pages/Productos";
import ProductoDetalle from "./views/ProductoDetalleview"; //  ¡Ruta correcta! // Ruta de tu vista individual
import ContactoPage from "./Pages/ContactoPage";
import ProfilePage from "./Pages/ProfilePage";
import AdminDashboard from "./components/dashboard/AdminDashboard";

function App() {
  const [vista, setVista] = useState(localStorage.getItem("al_vista") || "inicio");
  const [usuario, setUsuario] = useState(null);
  
  // Estado para saber qué producto específico renderizar en la vista de detalle
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(
    localStorage.getItem("al_producto_id") || null
  );

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("al_usuario");

    if (usuarioGuardado) {
      try {
        const user = JSON.parse(usuarioGuardado);
        setUsuario(user);
        
        // Redirección inteligente inicial según el rol
        if (vista === "inicio") {
          if (user.role === "admin") setVista("admin");
          if (user.role === "empleado") setVista("cliente");
        }
      } catch {
        localStorage.removeItem("al_usuario");
      }
    }
  }, []);



  // Persistencia de la vista actual
  useEffect(() => {
    localStorage.setItem("al_vista", vista);
  }, [vista]);

  // Persistencia del ID del producto seleccionado
  useEffect(() => {
    if (productoSeleccionadoId) {
      localStorage.setItem("al_producto_id", productoSeleccionadoId);
    } else {
      localStorage.removeItem("al_producto_id");
    }
  }, [productoSeleccionadoId]);

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem("al_usuario", JSON.stringify(datosUsuario));

    if (datosUsuario.rol === "admin") {
      setVista("admin");
    } else if (datosUsuario.rol === "empleado") {
      setVista("cliente");
    }
  };

  const logout = () => {
    localStorage.clear(); // Limpia de forma segura todo el almacenamiento local
    setUsuario(null);
    setVista("inicio");
    window.location.href = "/";
  };



  // --- INYECCIÓN DE BOOTSTRAP Y FUENTES ---
  useEffect(() => {
    const links = [
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" }
    ];
    links.forEach(l => {
      const link = document.createElement("link");
      Object.assign(link, l);
      document.head.appendChild(link);
    });

    const bsScript = document.createElement("script");
    bsScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    bsScript.async = true;
    document.body.appendChild(bsScript);
  }, []);

  // Props globales heredados por las vistas
  const propsComunes = {
    setVista,
    usuario,
    login,
    logout,
    productoSeleccionadoId,
    setProductoSeleccionadoId,
  };

  function renderPagina() {
    switch (vista) {
      case "inicio":
        return <Home {...propsComunes} />;

      case "nosotros":
        return <Nosotros {...propsComunes} />;

      case "productos":
        return <Productos {...propsComunes} />;

      case "producto-detalle": 
        // CORREGIDO: Mapeamos explícitamente productoId para que coincida con el componente de destino
        return (
          <ProductoDetalle 
            {...propsComunes} 
            productoId={productoSeleccionadoId} 
          />
        );

      case "contactos":
        return <ContactoPage {...propsComunes} />;

      case "perfil":
        return (
          <ProfilePage
            usuario={usuario}
            setVista={setVista}
            volverA={usuario?.rol === "empleado" ? "cliente" : "inicio"}
          />
        );

      case "admin":
        return <AdminDashboard setVista={setVista} logout={logout} />;

      case "cliente":
        return <EmpleadoDashboard setVista={setVista} logout={logout} />;

      default:
        return <Home {...propsComunes} />;
    }
  }

  return (
    <div className="app-container">
      {renderPagina()}
    </div>
  );
}

export default App;