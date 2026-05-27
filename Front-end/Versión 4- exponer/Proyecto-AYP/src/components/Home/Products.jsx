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

function Products() {
  const colors = {
    fondo: "#10142D  ",
    azulReal: "#1E6FD9",
    plataAzulado: "#D1E4FF",
    doradoAmbar: "#FFC107 ",
    blancoMarfil: "#F4F4F4"
  };

  return (
    <section 
      id="productos" 
      style={{ 
        backgroundColor: colors.fondo, 
        padding: "100px 0", 
        fontFamily: "'Barlow', sans-serif" 
      }}
    >
      <div className="container">
        
        {/* Encabezado con Estilo Industrial */}
        <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
          <div>
            <p 
              style={{ 
                color: colors.doradoAmbar, 
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontSize: "0.9rem"
              }} 
              className="mb-2"
            >
              Componentes de alto rendimiento
            </p>
            <h2 
              style={{ 
                fontFamily: "'Rajdhani', sans-serif", 
                color: colors.plataAzulado,
                fontWeight: "700",
                fontSize: "3rem"
              }} 
              className="m-0"
            >
              CATÁLOGO TÉCNICO
            </h2>
          </div>
          <button 
            className="btn px-4 py-2"
            style={{ 
              backgroundColor: "transparent", 
              border: `2px solid ${colors.azulReal}`, 
              color: colors.plataAzulado,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: "700",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.azulReal;
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.plataAzulado;
            }}
          >
            <a href="/productos" className="text-decoration-none text-light">
              VER TODO EL CATÁLOGO →
            </a>
          </button>
          
        </div>

        {/* Grid de Productos */}
        <div className="row g-4">
          {products.map((p) => (
            <div key={p.name} className="col-12 col-sm-6 col-lg-4">
              <div 
                className="card h-100 border-0 overflow-hidden position-relative"
                style={{ 
                  backgroundColor: "#161B26", // Un tono ligeramente más claro que el fondo
                  borderRadius: "4px", // Bordes más rectos/industriales
                  transition: "transform 0.3s ease"
                }}
              >
                
                {/* Badge en Dorado Ámbar */}
                {p.badge && (
                  <span 
                    className="badge position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm" 
                    style={{ 
                      backgroundColor: colors.doradoAmbar, 
                      color: colors.fondo,
                      zIndex: 1, 
                      fontSize: '0.65rem',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: "800",
                      textTransform: "uppercase"
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                {/* Contenedor de Imagen con Overlay Sutil */}
                <div 
                  className="d-flex align-items-center justify-content-center p-4" 
                  style={{ 
                    height: '260px', 
                    backgroundColor: "#fff", // Mantenemos blanco para que el producto resalte
                    margin: "10px",
                    borderRadius: "2px"
                  }}
                >
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="img-fluid"
                    style={{ maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Cuerpo de la Card */}
                <div className="card-body p-4 d-flex flex-column">
                  <h5 
                    style={{ 
                      fontFamily: "'Rajdhani', sans-serif", 
                      fontWeight: "700", 
                      color: colors.plataAzulado,
                      letterSpacing: "1px"
                    }} 
                    className="mb-1 text-uppercase"
                  >
                    {p.name}
                  </h5>
                  
                  {p.reference && (
                    <p 
                      style={{ 
                        color: colors.doradoAmbar, 
                        fontSize: '0.8rem',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: "600"
                      }} 
                      className="mb-3"
                    >
                      REF: {p.reference}
                    </p>
                  )}

                  <p 
                    style={{ 
                      fontSize: '0.9rem', 
                      lineHeight: '1.6', 
                      color: colors.blancoMarfil,
                      opacity: 0.7,
                      fontWeight: "300"
                    }} 
                    className="flex-grow-1"
                  >
                    {p.desc}
                  </p>

                  <button 
                    className="btn w-100 mt-3 py-2 text-uppercase"
                    style={{ 
                      backgroundColor: "rgba(209, 228, 255, 0.05)",
                      border: `1px solid rgba(209, 228, 255, 0.2)`,
                      color: colors.plataAzulado,
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = colors.doradoAmbar;
                      e.target.style.color = colors.doradoAmbar;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "rgba(209, 228, 255, 0.2)";
                      e.target.style.color = colors.plataAzulado;
                    }}
                  >
                    Especificaciones Técnicas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;