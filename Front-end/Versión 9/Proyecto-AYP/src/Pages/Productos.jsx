import { useState, useEffect } from "react";
import { supabase } from "../lib/client"; // Tu cliente configurado de Supabase
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import LoginModal from "../components/LoginModal";
import CartPanel from "../components/CartPanel";

// Categorías alineadas al negocio de AYP Lubricantes y Filtros
const CATEGORIAS = ["Todos", "Compresores", "Filtros", "Lubricantes", "Válvulas", "Herramientas", "Accesorios"];

// ==========================================
// COMPONENTE SUB-INTERNO: MiniCarruselCatalog
// ==========================================
function MiniCarruselCatalog({ imagenes = [], nombreProducto }) {
  const [indexActual, setIndexActual] = useState(0);

  // Si el producto no tiene un arreglo de imágenes asignado, renderizamos el placeholder por defecto
  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="p-3 text-center bg-white d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
        <img
          src="https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777133787/placeholder-industrial.png"
          className="img-fluid h-100 object-fit-contain"
          alt={nombreProducto}
          loading="lazy"
        />
      </div>
    );
  }

  const anteriorImagen = (e) => {
    e.stopPropagation(); // Evita disparar clics nativos de la tarjeta contenedora
    setIndexActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const siguienteImagen = (e) => {
    e.stopPropagation();
    setIndexActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="position-relative overflow-hidden group-carrusel" style={{ height: "200px" }}>
      {/* Contenedor e Imagen Actual */}
      <div className="p-3 text-center bg-white d-flex align-items-center justify-content-center h-100">
        <img
          src={imagenes[indexActual]?.imagen_url}
          className="img-fluid h-100 object-fit-contain"
          alt={`${nombreProducto} - vista ${indexActual + 1}`}
          loading="lazy"
        />
      </div>

      {/* Controles de navegación laterales (Visibles si hay más de una foto en galería) */}
      {imagenes.length > 1 && (
        <>
          <button
            onClick={anteriorImagen}
            className="btn-carrusel-nav position-absolute start-0 top-50 translate-middle-y ms-2"
            type="button"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={siguienteImagen}
            className="btn-carrusel-nav position-absolute end-0 top-50 translate-middle-y me-2"
            type="button"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          {/* Indicadores inferiores (Dots estilo MercadoLibre / eCommerce) */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1 bg-dark bg-opacity-25 rounded-pill px-2 py-1">
            {imagenes.map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => { e.stopPropagation(); setIndexActual(idx); }}
                className="rounded-circle cursor-pointer"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: idx === indexActual ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                  transition: "0.2s"
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Productos({ 
  setVista, 
  usuario, 
  logout, 
  carrito, 
  totalItems, 
  cartOpen, 
  setCartOpen, 
  cambiarCantidad, 
  eliminarDelCarrito,
  setProductoSeleccionadoId 
}) {
  const [showModal, setShowModal] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [productosApi, setProductosApi] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CONSULTA ADAPTADA PARA TRAER PRODUCTOS Y SU NUEVA TABLA DE IMÁGENES ---
  useEffect(() => {
    async function cargarProductos() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("productos")
          .select(`
            id, 
            nombre, 
            marca, 
            descripcion, 
            referencia_interna, 
            precio, 
            imagen_url, 
            suspendido,
            producto_imagenes (
              id,
              imagen_url,
              es_principal,
              orden
            )
          `)
          .eq("suspendido", false);

        if (error) throw error;

        // Estructuramos y ordenamos internamente las imágenes para priorizar la principal
        const productosProcesados = (data || []).map(p => {
          const imagenesOrdenadas = p.producto_imagenes?.sort((a, b) => {
            if (a.es_principal) return -1;
            if (b.es_principal) return 1;
            return (a.orden || 0) - (b.orden || 0);
          }) || [];

          return {
            ...p,
            todas_las_imagenes: imagenesOrdenadas
          };
        });

        setProductosApi(productosProcesados);
      } catch (err) {
        console.error("Error al conectar con Supabase:", err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  // --- FILTRADO COMBINADO ---
  const productosFiltrados = productosApi.filter((p) => {
    const valorCategoria = p.marca || "Otros"; 
    const cumpleCategoria = categoriaActiva === "Todos" || valorCategoria.toLowerCase() === categoriaActiva.toLowerCase();
    
    const cumpleBusqueda = 
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
      (p.referencia_interna && p.referencia_interna.toLowerCase().includes(busqueda.toLowerCase()));
      
    return cumpleCategoria && cumpleBusqueda;
  });

  // --- ACCIÓN: REDIRECCIÓN AL DETALLE INDIVIDUAL ---
  const handleVerDetalles = (id) => {
    setProductoSeleccionadoId(id);
    setVista("producto-detalle");
  };

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Navbar onOpenLogin={() => setShowModal(true)} vistaActual="productos" {...{ setVista, usuario, logout, totalItems, setCartOpen }} />

      {/* Hero E-commerce Industrial Estilizado */}
      <section className="position-relative d-flex align-items-center justify-content-center" style={{
        backgroundImage: `linear-gradient(rgba(16, 20, 45, 0.7), rgba(16, 20, 45, 0.7)), url(https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777133787/IMG_Productos.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "350px",
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

          {/* BARRA LATERAL FILTRADORA */}
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
                <label className="form-label small fw-bold text-muted text-uppercase">Marcas / Líneas</label>
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

          {/* SECCIÓN MÁSTER DE PRODUCTOS */}
          <main className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <p className="text-muted mb-0">Mostrando <b>{productosFiltrados.length}</b> productos</p>
              <select className="form-select w-auto border-0 shadow-sm rounded-pill" style={{ fontSize: "0.9rem" }}>
                <option>Ordenar por: Relevancia</option>
                <option>Menor precio</option>
                <option>Mayor precio</option>
              </select>
            </div>

            {/* SKELETON LOADERS INTERACTIVOS */}
            {loading ? (
              <div className="row g-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="col-6 col-md-4">
                    <div className="card border-0 placeholder-glow h-100 p-4" style={{ borderRadius: "16px", minHeight: "340px" }}>
                      <div className="placeholder col-12 mb-3 bg-secondary opacity-10" style={{ height: "160px", borderRadius: "12px" }}></div>
                      <div className="placeholder col-8 mb-2 bg-secondary opacity-15"></div>
                      <div className="placeholder col-5 bg-secondary opacity-15"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row g-4">
                {productosFiltrados.map((p) => {
                  return (
                    <div key={p.id} className="col-6 col-md-4">
                      <div className="card h-100 border-0 shadow-sm product-card transition-all"
                        style={{ borderRadius: "16px", overflow: "hidden", background: "#fff" }}>

                        {/* Etiqueta Dinámica de Marca */}
                        <span className="position-absolute badge rounded-pill bg-dark mt-2 ms-2 z-1 text-uppercase" style={{ fontSize: "0.65rem" }}>
                          {p.marca || "Industrial"}
                        </span>

                        {/* REEMPLAZADO: Ahora llama al mini-carrusel dinámico con soporte multi-imágenes */}
                        <MiniCarruselCatalog 
                          imagenes={p.todas_las_imagenes} 
                          nombreProducto={p.nombre} 
                        />

                        {/* Textos y Precios Estructurados Estilo Premium */}
                        <div className="card-body p-3 d-flex flex-column">
                          <h6 className="fw-bold mb-1 text-truncate-2 text-dark" style={{ height: "40px", fontSize: "0.95rem" }}>
                            {p.nombre}
                          </h6>
                          <p className="text-muted small mb-2">Ref: {p.referencia_interna || "N/A"}</p>
                          
                          <div className="mt-auto">
                            <div className="mb-3">
                              <span className="h5 fw-bold text-dark">
                                ${Number(p.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP
                              </span>
                            </div>

                            {/* Botón de Redirección */}
                            <button
                              className="btn btn-warning w-100 rounded-pill fw-bold btn-details d-flex align-items-center justify-content-center gap-2"
                              onClick={() => handleVerDetalles(p.id)}
                            >
                              Ver Detalles <i className="bi bi-arrow-right-short fs-5"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State Estilizado */}
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

      {/* Modal de Acceso */}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}

      {/* Estilos CSS Integrados con las propiedades del carrusel */}
      <style>{`
        .product-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.06) !important; }
        .hover-bg-light:hover { background-color: #f1f3f5; }
        .text-truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cursor-pointer { cursor: pointer; }
        .btn-details { transition: 0.2s; border: none; background-color: #ffc107; color: #212529; }
        .btn-details:hover { background-color: #10142D; color: white; }

        /* Estilos dinámicos para los botones flotantes del carrusel */
        .btn-carrusel-nav {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            color: #10142D;
            font-size: 11px;
            transition: all 0.2s ease;
            opacity: 0;
            z-index: 3;
        }
        .group-carrusel:hover .btn-carrusel-nav {
            opacity: 1;
        }
        .btn-carrusel-nav:hover {
            background: #ffc107;
            color: #212529;
            transform: scale(1.08) translateY(-50%);
        }
      `}</style>
    </div>
  );
}

export default Productos;