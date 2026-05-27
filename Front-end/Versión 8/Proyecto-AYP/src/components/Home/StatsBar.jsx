import { useEffect, useRef, useState } from "react";

const COLORS = {
  accent: "#FFC107", // Tu doradoAmbar
  bgCard: "rgba(255, 255, 255, 0.03)",
  border: "rgba(255, 255, 255, 0.08)"
};

const STATS = [
  {
    numero: 500, sufijo: "+", label: "Productos Disponibles", svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    )
  },
  {
    numero: 15, sufijo: "+", label: "Años de Experiencia", svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    numero: 2000, sufijo: "+", label: "Clientes Satisfechos", svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    numero: 48, sufijo: "H", label: "Entrega Garantizada", svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  },
];

// Hook de contador animado
function useCounter(target, duration = 1500, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCounter(stat.numero, 1500, visible);

  return (
    <div ref={ref} className="col-6 col-md-3 p-2">
      {/* Tarjeta con efecto Glassmorphism */}
      <div className="h-100 py-4 px-3 rounded-4 transition-all" 
           style={{ 
             background: COLORS.bgCard, 
             border: `1px solid ${COLORS.border}`,
             backdropFilter: "blur(5px)",
             transition: "transform 0.3s ease"
           }}>
        
        {/* Icono con resplandor */}
        <div
          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
          style={{ 
            width: 54, 
            height: 54, 
            background: "rgba(255,193,7,0.1)", 
            color: COLORS.accent,
            boxShadow: visible ? `0 0 20px rgba(255,193,7,0.2)` : "none",
            transition: "all 1s ease"
          }}
        >
          {stat.svg}
        </div>

        {/* Número Animado */}
        <div style={{ 
          fontFamily: "'Bebas Neue', sans-serif", 
          fontSize: "2.8rem", 
          color: "#fff", 
          lineHeight: 1,
          letterSpacing: "1px"
        }}>
          <span style={{ color: COLORS.accent }}>{count.toLocaleString()}</span>
          <span style={{ fontSize: "1.5rem", marginLeft: "2px" }}>{stat.sufijo}</span>
        </div>

        {/* Etiqueta */}
        <div className="text-uppercase mt-2" style={{ 
          fontSize: "0.7rem", 
          color: "rgba(255,255,255,0.5)", 
          letterSpacing: "2px", 
          fontWeight: 600 
        }}>
          {stat.label}
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="py-5" style={{ 
      background: "radial-gradient(circle at center, #1a1a2e 0%, #10142D 100%)",
      marginTop: "-20px", // Un pequeño solapamiento con el Hero para fluidez
      position: "relative",
      zIndex: 2
    }}>
      <div className="container">
        <div className="row g-3"> {/* g-3 añade espacio entre las tarjetas */}
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .transition-all:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 193, 7, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default StatsBar;