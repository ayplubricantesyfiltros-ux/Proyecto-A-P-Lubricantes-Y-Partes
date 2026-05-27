import React from 'react';

function CTA({ setVista }) {
  // Paleta de colores aplicada
  const colors = {
    fondo: "#10142D  ",
    azulReal: "#1E6FD9",
    plataAzulado: "#D1E4FF",
    doradoAmbar: "#FFC107 ",
    blancoMarfil: "#F4F4F4"
  };

  return (
    <section 
      style={{ 
        background: colors.fondo, 
        padding: "8rem 0", // Espaciado generoso
        position: "relative", 
        overflow: "hidden",
        borderTop: `1px solid ${colors.azulReal}33` // Sutil línea superior
      }}
    >
      {/* Fondo con imagen (Placeholder agrícola/industrial) */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: 'url("src/assets/filtro.hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.15, // Muy sutil para no perder legibilidad
        pointerEvents: "none",
      }} />

      {/* Círculos decorativos con el nuevo Azul Real */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 400, height: 400, borderRadius: "50%",
        border: `80px solid ${colors.azulReal}15`,
        pointerEvents: "none",
      }} />

      <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>

        {/* Ícono con detalle de "Aceite" (Dorado) */}
        <div
          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
          style={{ 
            width: 72, 
            height: 72, 
            background: `${colors.doradoAmbar}15`, 
            color: colors.doradoAmbar,
            border: `1px solid ${colors.doradoAmbar}40`
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.71 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.86 5.86l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>

        {/* Label con Barlow Condensed */}
        <p 
          className="fw-bold text-uppercase mb-2" 
          style={{ 
            color: colors.doradoAmbar, 
            fontSize: "0.85rem", 
            letterSpacing: 4,
            fontFamily: "'Barlow Condensed', sans-serif" 
          }}
        >
          ¿Listo para empezar?
        </p>

        {/* Título con Rajdhani */}
        <h2 style={{ 
          fontFamily: "'Rajdhani', sans-serif", 
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 5vw, 4rem)", 
          color: colors.plataAzulado, 
          marginBottom: "1rem",
          lineHeight: 1
        }}>
          POTENCIA TU PRODUCCIÓN AL MÁXIMO
        </h2>

        {/* Cuerpo con Barlow */}
        <p style={{ 
          fontFamily: "'Barlow', sans-serif",
          color: colors.blancoMarfil, 
          fontSize: "1.1rem", 
          fontWeight: 300, 
          marginBottom: "3rem", 
          maxWidth: 550, 
          margin: "0 auto 3rem",
          opacity: 0.8
        }}>
          Habla con nuestros asesores y encuentra la solución de lubricación premium para tu maquinaria pesada.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {/* Botón Principal (Azul Real Metálico) */}
          <button
            className="border-0 rounded-1 fw-bold px-5 py-3 d-flex align-items-center gap-2 text-uppercase"
            style={{ 
              background: colors.azulReal, 
              color: "#fff", 
              fontSize: "0.9rem", 
              letterSpacing: 1,
              cursor: "pointer", 
              transition: "all 0.3s ease",
              fontFamily: "'Barlow Condensed', sans-serif",
              boxShadow: `0 4px 15px ${colors.azulReal}40`
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = "translateY(-3px)"; 
              e.currentTarget.style.boxShadow = `0 8px 25px ${colors.azulReal}60`;
              e.currentTarget.style.background = "#3562bd";
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = "translateY(0)"; 
              e.currentTarget.style.boxShadow = `0 4px 15px ${colors.azulReal}40`;
              e.currentTarget.style.background = colors.azulReal;
            }}
            onClick={() => setVista && setVista("contactos")}
          >
            Solicitar Cotización
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Botón Secundario (Plata / Outline) */}
          <button
            className="rounded-1 fw-bold px-5 py-3 d-flex align-items-center gap-2 text-uppercase"
            style={{ 
              background: "transparent", 
              border: `2px solid ${colors.plataAzulado}40`, 
              color: colors.plataAzulado, 
              fontSize: "0.9rem", 
              letterSpacing: 1,
              cursor: "pointer", 
              transition: "all 0.3s ease",
              fontFamily: "'Barlow Condensed', sans-serif"
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = colors.plataAzulado; 
              e.currentTarget.style.background = `${colors.plataAzulado}10`; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = `${colors.plataAzulado}40`; 
              e.currentTarget.style.background = "transparent"; 
            }}
          >
            Llamar Ahora
          </button>
        </div>

      </div>
    </section>
  );
}

export default CTA;