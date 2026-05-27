import React from "react";
// Importaciones de imágenes se mantienen igual...
import Separador from "../../assets/Home/Products/separador.jpg";
import W962 from "../../assets/Home/Products/filtro-de-aceite-W-962.jpg";
import LB962 from "../../assets/Home/Products/LB-962-2.jpg";
import GA30 from "../../assets/Home/Products/FILTRO-DE-AIRE-2914930400.jpg";
import Aceite from "../../assets/Home/Products/5w40-castro-cuarto-1.jpg";
import KitatlasCopco from "../../assets/Home/Products/KIT-A-2-4KW-4000H-2YR.jpg";


const products = [
  { 
    name: "Separador de Aceite",
    reference : "1622-0079-00 (Atlas Copco)", 
    desc: "Separador de alta precisión para compresores de tornillo industriales.", 
    badge: "Destacado",
    img: Separador, 
  },
  { 
    name: "Filtro de Aceite", 
    reference: "W962 (Mann Filter)",
    desc: "Filtración premium para protección y rendimiento óptimo en motores.", 
    badge: null,
    img: W962,
  },
  { 
    name: "Filtro Separador", 
    reference: "LB962/2 (Mann Filter)",
    desc: "Componentes de alta resistencia compatibles con múltiples marcas.", 
    badge: "Nuevo",
    img: LB962,
  },
  { 
    name: "Filtro de Aire GA-30", 
    reference: "1613-9472-00 (Atlas Copco)",
    desc: "Eficiencia máxima para la protección de tornillos y motores industriales.", 
    badge: null,
    img: GA30,
  },
  { 
    name: "Aceite Sintético 5W-40", 
    reference: "Castrol Premium",
    desc: "Lubricante de grado industrial formulado para condiciones extremas.", 
    badge: "Oferta",
    img: Aceite,
  },
  { 
    name: "Panel de Control Digital", 
    reference: "SmartControl v2",
    desc: "Monitoreo inteligente con analítica avanzada y control remoto.", 
    badge: "Nuevo",
    img: KitatlasCopco,
  },
];

function Products({ setVista }) {
  const colors = {
    fondo: "#10142D",
    azulReal: "#1E6FD9",
    plataAzulado: "#D1E4FF",
    doradoAmbar: "#FFC107",
    blancoMarfil: "#F4F4F4",
    cardBg: "#161B26"
  };

  return (
    <section id="productos" style={{ backgroundColor: colors.fondo, padding: "100px 0" }}>
      <div className="container">
        
        {/* Encabezado optimizado */}
        <div className="row align-items-end mb-5">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div style={{ width: "30px", height: "2px", background: colors.doradoAmbar }}></div>
              <span style={{ 
                color: colors.doradoAmbar, 
                fontFamily: "'Barlow Condensed', sans-serif", 
                fontWeight: "700", 
                letterSpacing: "3px", 
                textTransform: "uppercase", 
                fontSize: "0.85rem" 
              }}>
                Componentes de Precisión
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              color: "#fff", 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              letterSpacing: "1px" 
            }}>
              CATÁLOGO <span style={{ color: colors.azulReal }}>DESTACADO</span>
            </h2>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button 
              className="btn text-uppercase fw-bold"
              style={{ 
                borderBottom: `2px solid ${colors.doradoAmbar}`, 
                color: colors.doradoAmbar,
                borderRadius: 0,
                padding: "10px 0",
                fontSize: "0.9rem"
              }}
              onClick={() => setVista && setVista("productos")}
            >
              Ver inventario completo <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="row g-4">
          {products.map((p, index) => (
            <div key={p.name} className="col-12 col-md-6 col-lg-4">
              <div 
                className="product-card h-100 position-relative"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderRadius: "8px", 
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  overflow: "hidden"
                }}
              >
                {/* Badge con diseño de etiqueta industrial */}
                {p.badge && (
                  <div style={{
                    position: "absolute", top: "15px", left: "0",
                    background: colors.doradoAmbar, color: "#000",
                    padding: "4px 15px", fontWeight: "800", fontSize: "0.7rem",
                    fontFamily: "'Barlow Condensed'", zIndex: 2,
                    clipPath: "polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)"
                  }}>
                    {p.badge}
                  </div>
                )}

                {/* Imagen con contenedor limpio */}
                <div style={{ 
                  height: "280px", 
                  background: "#fff", 
                  margin: "12px", 
                  borderRadius: "6px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "30px", overflow: "hidden"
                }}>
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    style={{ maxHeight: "100%", width: "auto", transition: "transform 0.5s ease" }}
                    className="product-img"
                  />
                </div>

                {/* Info del Producto */}
                <div className="p-4">
                  <div className="mb-2">
                    <small style={{ color: colors.azulReal, fontWeight: "700", fontSize: "0.75rem" }}>
                      {p.reference.split(' ')[1] || 'GENERAL'}
                    </small>
                    <h5 style={{ 
                      fontFamily: "'Bebas Neue', sans-serif", 
                      fontSize: "1.6rem", 
                      color: "#fff",
                      margin: "2px 0"
                    }}>
                      {p.name}
                    </h5>
                  </div>
                  
                  <div style={{ 
                    background: "rgba(255,193,7,0.05)", 
                    padding: "8px 12px", 
                    borderRadius: "4px",
                    borderLeft: `3px solid ${colors.doradoAmbar}`,
                    marginBottom: "15px"
                  }}>
                    <code style={{ color: colors.doradoAmbar, fontSize: "0.85rem" }}>
                      {p.reference}
                    </code>
                  </div>

                  <p style={{ 
                    fontSize: "0.88rem", 
                    color: "rgba(255,255,255,0.6)", 
                    lineHeight: "1.5",
                    minHeight: "45px" 
                  }}>
                    {p.desc}
                  </p>

                  <button 
                    className="btn w-100 py-2 mt-3 d-flex align-items-center justify-content-center gap-2"
                    style={{ 
                      background: "transparent", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.azulReal;
                      e.currentTarget.style.borderColor = colors.azulReal;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    FICHA TÉCNICA <i className="bi bi-file-earmark-pdf"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-10px);
          border-color: ${colors.azulReal} !important;
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }
        .product-card:hover .product-img {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

export default Products;