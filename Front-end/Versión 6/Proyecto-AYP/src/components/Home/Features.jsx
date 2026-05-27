import React from "react";

// Iconos actualizados con trazos más finos y colores de la paleta
const FEATURES = [
  {
    titulo: "Repuestos Originales",
    desc: "Piezas certificadas de los principales fabricantes del mercado global.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    titulo: "Logística Global",
    desc: "Despachos optimizados con monitoreo de precisión en tiempo real.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    titulo: "Soporte Técnico",
    desc: "Ingeniería especializada para la selección y optimización de sus equipos.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    titulo: "Garantía de Planta",
    desc: "Respaldo total postventa con los estándares más altos de la industria.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

function Features() {
  const colors = {
    fondo: "#10141D",
    azulReal: "#2B52A1",
    plataAzulado: "#D1E4FF",
    doradoAmbar: "#FFC107",
    blancoMarfil: "#F4F4F4"
  };

  return (
    <section style={{ background: colors.fondo, padding: "8rem 0" }}>
      <div className="container">

        {/* Encabezado */}
        <div className="text-center mb-5">
          <p 
            style={{ 
              color: colors.doradoAmbar, 
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem", 
              letterSpacing: 4,
              textTransform: "uppercase"
            }} 
            className="mb-2"
          >
            Ventaja Competitiva
          </p>
          <h2 style={{ 
            fontFamily: "'Rajdhani', sans-serif", 
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)", 
            color: colors.plataAzulado, 
            fontWeight: 700,
            lineHeight: 1
          }}>
            EXCELENCIA OPERACIONAL
          </h2>
          <div 
            style={{ 
              width: 60, 
              height: 4, 
              background: colors.azulReal, 
              margin: "1.5rem auto" 
            }} 
          />
        </div>

        {/* Tarjetas Estilo Panel */}
        <div className="row g-4">
          {FEATURES.map((f) => (
            <div key={f.titulo} className="col-12 col-sm-6 col-lg-3">
              <div
                className="rounded-0 p-4 h-100"
                style={{
                  background: "#161B26",
                  borderLeft: `2px solid transparent`,
                  transition: "all 0.3s ease",
                  cursor: "default",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.backgroundColor = "#1C2331";
                  e.currentTarget.style.borderLeftColor = colors.azulReal;
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = "#161B26";
                  e.currentTarget.style.borderLeftColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Ícono Metálico */}
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{ 
                    width: 50, 
                    height: 50, 
                    background: `rgba(43, 82, 161, 0.15)`, 
                    color: colors.azulReal,
                    border: `1px solid ${colors.azulReal}40`
                  }}
                >
                  {f.svg}
                </div>

                <h5 
                  style={{ 
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem", 
                    color: colors.plataAzulado,
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }} 
                  className="mb-3"
                >
                  {f.titulo}
                </h5>

                <p 
                  style={{ 
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.95rem", 
                    lineHeight: 1.6,
                    color: colors.blancoMarfil,
                    opacity: 0.7
                  }} 
                  className="mb-0"
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;