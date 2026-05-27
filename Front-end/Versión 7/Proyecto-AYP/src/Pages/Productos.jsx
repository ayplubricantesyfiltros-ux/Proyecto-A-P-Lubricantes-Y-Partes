import { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import LoginModal from "../components/LoginModal";
import CartPanel from "../components/CartPanel";
import Swal from "sweetalert2";

// --- IMPORTACIÓN DE IMÁGENES SEGÚN TU CARPETA ---
import ImgProductos from "../assets/imgProductos/imgProductos.jpg";
import imgHerramienta from "../assets/imgProductos/herramienta.jpg";
import imgCompresor from "../assets/imgProductos/compresor.jpg";
import imgAceiteSin from "../assets/imgProductos/Aceite sintetico 5W-40.jpg";
import imgFiltroAceite from "../assets/imgProductos/Filtro de Aceite W962.jpg";
import imgFiltroAire from "../assets/imgProductos/Filtro de Aire GA-30.jpg";
import imgFiltroSep from "../assets/imgProductos/Filtro Separador.jpg";
import imgLlaveTorque from "../assets/imgProductos/Llave de Torque Neumática.jpg";
import imgManguera from "../assets/imgProductos/Manguera de Alta Presión 10m.jpg";
import imgManometro from "../assets/imgProductos/Manómetro de Glicerina.jpg";
import imgPanel from "../assets/imgProductos/panel.jpg";
import imgSepAceite from "../assets/imgProductos/separador-de-aceite.jpg";
import imgSeparador from "../assets/imgProductos/Separador.jpg";
import imgValvulaAdm from "../assets/imgProductos/Válvula de Admisión IV-20.jpg";
import imgValvulaRet from "../assets/imgProductos/Válvula de Retención Térmica.jpg";

const CATEGORIAS = ["Todos", "Compresores", "Filtros", "Lubricantes", "Válvulas", "Herramientas", "Accesorios"];
// --- LÓGICA DE DETECCIÓN MEJORADA ---
const obtenerImagen = (nombre) => {
  if (!nombre) return imgHerramienta;
  const n = nombre.toLowerCase();
  if (n.includes("Aceite") && n.includes("Sintético")) return imgAceiteSin;
  if (n.includes("filtro") && n.includes("aceite")) return imgFiltroAceite;
  if (n.includes("filtro") && n.includes("aire")) return imgFiltroAire;
  if (n.includes("filtro") && n.includes("separador")) return imgFiltroSep;
  if (n.includes("separador") && n.includes("aceite")) return imgSepAceite;
  if (n.includes("separador")) return imgSeparador;
  if (n.includes("válvula") && n.includes("admisión")) return imgValvulaAdm;
  if (n.includes("válvula") && n.includes("retención")) return imgValvulaRet;
  if (n.includes("llave") && n.includes("torque")) return imgLlaveTorque;
  if (n.includes("manguera")) return imgManguera;
  if (n.includes("manómetro")) return imgManometro;
  if (n.includes("panel")) return imgPanel;
  if (n.includes("compresor")) return imgCompresor;
  if (n.includes("válvula") || n.includes("valvula")) return imgValvulaAdm;
  if (n.includes("filtro")) return imgFiltroSep;
  if (n.includes("herramienta") || n.includes("llave") || n.includes("taladro")) return imgHerramienta;

  return imgHerramienta;
};

function Productos({ setVista, usuario, login, logout, carrito, totalItems, cartOpen, setCartOpen, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito }) {
  const [showModal, setShowModal] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [productosApi, setProductosApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://69cdf09333a09f831b7caeb6.mockapi.io/productos/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductosApi(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // Lógica de filtrado combinada (Categoría + Buscador)
  const productosFiltrados = productosApi.filter((p) => {
    const cumpleCategoria = categoriaActiva === "Todos" || p.Categoria === categoriaActiva;
    const cumpleBusqueda = p.Nombre.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const handleAgregar = (producto) => {

    const precioFormateado = "$" + Number(producto.Precio).toLocaleString('es-CO');
    
    const productoNormalizado = {
      ...producto,
      id: producto.id,
      nombre: producto.Nombre,
      precio: precioFormateado,
      categoria: producto.Categoria
    };

    // 2. Simplemente lo agregamos
    agregarAlCarrito(productoNormalizado);

    // OPCIONAL: Una pequeña notificación tipo Toast (no intrusiva) 
    // para que el usuario sepa que funcionó sin moverlo de la página
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: 'Agregado al carrito'
    });
  };

  const SkeletonCard = () => (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card border-0 shadow-sm opacity-50" style={{ height: "350px", background: "#eee" }}></div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Navbar onOpenLogin={() => setShowModal(true)} vistaActual="productos" {...{ setVista, usuario, logout, totalItems, setCartOpen }} />

      {/* Hero Refinado estilo E-commerce */}
      <section className="position-relative d-flex align-items-center justify-content-center" style={{
        backgroundImage: `linear-gradient(rgba(16, 20, 45, 0.7), rgba(16, 20, 45, 0.7)), url(https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777133787/IMG_Productos.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
      }}>
        <div className="text-center px-3">
          <h1 className="text-white display-2 fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "3px" }}>
            CATÁLOGO <span className="text-warning">INDUSTRIAL</span>
          </h1>
          <p className="text-white-50 lead mx-auto" style={{ maxWidth: "600px" }}>
            Encuentra repuestos originales y lubricantes de alta gama para mantener tu maquinaria al 100%.
          </p>
        </div>
      </section>

      <div className="container-fluid px-lg-5 py-5">
        <div className="row g-4">

          {/* BARRA LATERAL (Estilo Falabella/Donsson) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: "100px", borderRadius: "15px" }}>
              <h5 className="fw-bold mb-4">Filtrar por</h5>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Buscador</label>
                <div className="input-group border rounded-pill overflow-hidden">
                  <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="¿Qué buscas?"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Categorías</label>
                <div className="d-flex flex-column gap-2 mt-2">
                  {CATEGORIAS.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => setCategoriaActiva(cat)}
                      className={`p-2 rounded-3 cursor-pointer transition-all ${categoriaActiva === cat ? 'bg-warning text-dark fw-bold' : 'hover-bg-light text-secondary'}`}
                      style={{ cursor: "pointer", transition: "0.2s" }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-light p-3 rounded-4 mt-4">
                <p className="small mb-0 text-dark">
                  <i className="bi bi-truck me-2 text-warning"></i>
                  Envío gratis en Bogotá por compras superiores a $500.000
                </p>
              </div>
            </div>
          </aside>

          {/* GRILLA DE PRODUCTOS */}
          <main className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <p className="text-muted mb-0">Mostrando <b>{productosFiltrados.length}</b> productos</p>
              <select className="form-select w-auto border-0 shadow-sm rounded-pill" style={{ fontSize: "0.9rem" }}>
                <option>Ordenar por: Relevancia</option>
                <option>Menor precio</option>
                <option>Mayor precio</option>
              </select>
            </div>

            {loading ? (
              <div className="row g-4">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="col-md-4"><div className="card border-0 placeholder-glow h-100 p-5"></div></div>
                ))}
              </div>
            ) : (
              <div className="row g-4">
                {productosFiltrados.map((p) => (
                  <div key={p.id} className="col-6 col-md-4">
                    <div className="card h-100 border-0 shadow-sm product-card transition-all"
                      style={{ borderRadius: "16px", overflow: "hidden", background: "#fff" }}>

                      {/* Badge de Categoría */}
                      <span className="position-absolute badge rounded-pill bg-dark mt-2 ms-2 z-1" style={{ fontSize: "0.6rem" }}>
                        {p.Categoria}
                      </span>

                      <div className="p-3 text-center bg-white" style={{ height: "200px" }}>
                        <img
                          src={obtenerImagen(p.Nombre)}
                          className="img-fluid h-100 object-fit-contain"
                          alt={p.Nombre}
                        />
                      </div>

                      <div className="card-body p-3 d-flex flex-column">
                        <h6 className="fw-bold mb-1 text-truncate-2" style={{ height: "40px", fontSize: "0.95rem" }}>
                          {p.Nombre}
                        </h6>
                        <div className="mt-auto">
                          <p className="h5 fw-bold text-dark mb-3">
                            ${Number(p.Precio).toLocaleString('es-CO')}
                          </p>
                          <button
                            className="btn btn-warning w-100 rounded-pill fw-bold btn-add-cart d-flex align-items-center justify-content-center gap-2"
                            onClick={() => handleAgregar(p)}
                          >
                            <i className="bi bi-cart-plus"></i> <span className="d-none d-md-inline">Añadir</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {productosFiltrados.length === 0 && !loading && (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted"></i>
                <h4 className="mt-3">No encontramos productos</h4>
                <p className="text-muted">Prueba con otra categoría o palabra clave.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
<CartPanel 
  {...{ setVista, carrito, cartOpen, setCartOpen, cambiarCantidad, eliminarDelCarrito }} 
  usuario={usuario} 
  onOpenLogin={() => setShowModal(true)} 
/>

      <style>{`
        .product-card { transition: all 0.3s ease; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }
        .hover-bg-light:hover { background-color: #f1f3f5; }
        .text-truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cursor-pointer { cursor: pointer; }
        .btn-add-cart { transition: 0.3s; border: none; }
        .btn-add-cart:hover { background-color: #10142D; color: white; }
      `}</style>
    </div>
  );
}

export default Productos;