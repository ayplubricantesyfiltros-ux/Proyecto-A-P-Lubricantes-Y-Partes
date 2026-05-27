import React from "react";

const FEATURES = [
  {
    titulo: "Repuestos Originales",
    desc: "Piezas certificadas de los principales fabricantes del mercado global.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    titulo: "Logística Global",
    desc: "Despachos optimizados con monitoreo de precisión en tiempo real.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    titulo: "Garantía de Planta",
    desc: "Respaldo total postventa con los estándares más altos de la industria.",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

function Features() {
  const colors = {
    fondo: "#FFFFFF",
    cardBg: "#fcfcfc", 
    azulReal: "#1E6FD9",
    doradoAmbar: "#FFC107",
    textoOscuro: "#1a1d23",
    textoGris: "#5a6268"
  };

  return (
    <section style={{ background: colors.fondo, padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Decoración de fondo sutil (Opcional: un círculo difuso) */}
      <div style={{ 
        position: "absolute", top: "-10%", right: "-5%", width: "400px", height: "400px", 
        background: "radial-gradient(circle, rgba(30,111,217,0.03) 0%, transparent 70%)", zIndex: 0 
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Encabezado con más aire */}
        <div className="text-center mb-5 pb-3">
          <span style={{ 
            color: colors.azulReal, 
            fontFamily: "'Barlow', sans-serif", 
            fontWeight: 700, 
            fontSize: "0.75rem", 
            letterSpacing: "5px", 
            textTransform: "uppercase",
            display: "block"
          }} className="mb-2">
            — ¿Por qué elegir A&P? —
          </span>
          <h2 style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            fontSize: "clamp(2.5rem, 5vw, 3.8rem)", 
            color: colors.textoOscuro, 
            letterSpacing: "1px"
          }}>
            Nuestra <span style={{ color: colors.azulReal }}>Promesa</span> de Valor
          </h2>
        </div>

        {/* Tarjetas Estilo Industrial Moderno */}
        <div className="row g-4">
          {FEATURES.map((f, index) => (
            <div key={f.titulo} className="col-12 col-md-6 col-lg-3">
              <div
                className="p-4 h-100 shadow-sm"
                style={{
                  background: colors.cardBg,
                  border: `1px solid #eee`,
                  borderRadius: "12px", // Bordes redondeados modernos
                  transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = colors.doradoAmbar;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#eee";
                }}
              >
                {/* Número de secuencia discreto */}
                <span style={{ 
                  position: "absolute", top: "20px", right: "25px", 
                  fontFamily: "'Bebas Neue'", fontSize: "1.5rem", 
                  color: "#eee", userSelect: "none" 
                }}>
                  0{index + 1}
                </span>

                {/* Ícono con contenedor dinámico */}
                <div
                  className="d-flex align-items-center justify-content-center mb-4 shadow-sm"
                  style={{ 
                    width: "55px", height: "55px", 
                    background: "#fff", 
                    color: colors.azulReal,
                    borderRadius: "10px",
                    border: `1px solid #f0f0f0`
                  }}
                >
                  {f.svg}
                </div>

                <h5 style={{ 
                  fontFamily: "'Bebas Neue', sans-serif", 
                  fontSize: "1.4rem", 
                  color: colors.textoOscuro, 
                  letterSpacing: "0.5px" 
                }} className="mb-3">
                  {f.titulo}
                </h5>

                <p style={{ 
                  fontFamily: "'Barlow', sans-serif", 
                  fontSize: "0.9rem", 
                  lineHeight: 1.6, 
                  color: colors.textoGris,
                  fontWeight: 400
                }} className="mb-0">
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