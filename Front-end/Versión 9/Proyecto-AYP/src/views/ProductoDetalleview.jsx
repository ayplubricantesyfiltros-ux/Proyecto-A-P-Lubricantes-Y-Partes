import { useEffect, useState } from "react";
import { supabase } from "../lib/client";
import Swal from "sweetalert2";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import TechnicalSheet from "../components/ProductDetail/TechnicalSheet";
import ActionButtons from "../components/ProductDetail/ActionButtons";
import SkeletonLoader from "../components/UI/SkeletonLoader";

function ProductoDetalleview({ productoId, setVista, agregarAlCarrito, totalItems, setCartOpen }) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productoId) return;

    async function obtenerDatosProducto() {
      setLoading(true);
      try {
        // Consulta limpia adaptada a tu tabla plana de Supabase
        const { data, error } = await supabase
          .from("productos")
          .select("id, nombre, marca, descripcion, referencia_interna, precio, imagen_url, suspendido")
          .eq("id", productoId)
          .eq("suspendido", false)
          .single();

        if (error) throw error;
        setProducto(data);
      } catch (err) {
        console.error("Error cargando el producto:", err.message);
        Swal.fire({
          icon: "error",
          title: "Producto no encontrado",
          text: "El artículo solicitado no está disponible en este momento.",
        });
        setVista("productos"); // Te regresa a la tienda de forma segura si falla
      } finally {
        setLoading(false);
      }
    }

    obtenerDatosProducto();
  }, [productoId]);

  // Bloque dinámico para SEO técnico local
  useEffect(() => {
    if (producto) {
      document.title = `${producto.nombre} | AYP Lubricantes y Filtros`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = `Adquiere ${producto.nombre} de la marca ${producto.marca} al mejor precio en AYP Lubricantes y Filtros.`;
    }
  }, [producto]);

  if (loading) return <SkeletonLoader />;
  if (!producto) return <div className="text-center py-5">Producto no disponible.</div>;

  // Adaptadores de datos para que tus subcomponentes no rompan al no tener tablas hijas
  const imagenesAdaptadas = [{ imagen_url: producto.imagen_url }];
  
  const especificacionesAdaptadas = [
    { clave: "Marca", valor: producto.marca },
    { clave: "Referencia Interna", valor: producto.referencia_interna || "N/A" }
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Navbar totalItems={totalItems} setCartOpen={setCartOpen} setVista={setVista} />
      
      {/* Breadcrumbs con navegación de estado */}
      <nav className="container py-3" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <span 
              onClick={() => setVista("productos")} 
              className="text-muted cursor-pointer hover-link"
              style={{ cursor: "pointer" }}
            >
              Catálogo
            </span>
          </li>
          <li className="breadcrumb-item text-muted">{producto.marca}</li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      {/* Contenedor Principal */}
      <main className="container pb-5">
        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "16px" }}>
          <div className="row g-5">
            {/* Columna Izquierda: Galería */}
            <div className="col-lg-6">
              <ProductGallery imagenes={imagenesAdaptadas} nombre={producto.nombre} />
            </div>
            
            {/* Columna Derecha: Información de Compra */}
            <div className="col-lg-6 d-flex flex-column justify-content-between">
              <ProductInfo producto={producto} />
              <ActionButtons producto={producto} agregarAlCarrito={agregarAlCarrito} />
            </div>
          </div>

          {/* Ficha Técnica y Descripción Extendida */}
          <div className="row mt-5 pt-4 border-top">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <h5 className="fw-bold text-dark mb-3 text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>
                Descripción del Producto
              </h5>
              <p className="text-secondary lh-lg" style={{ whiteSpace: "pre-line" }}>{producto.descripcion}</p>
            </div>
            <div className="col-lg-5">
              <h5 className="fw-bold text-dark mb-3 text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>
                Especificaciones Técnicas
              </h5>
              <TechnicalSheet especificaciones={especificacionesAdaptadas} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductoDetalleview;