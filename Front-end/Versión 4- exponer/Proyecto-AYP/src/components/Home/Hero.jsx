import React from 'react';

const colors = {
  fondo: "#10142D",
  azulReal: "#1E6FD9",
  plataAzulado: "#D1E4FF",
  doradoAmbar: "#FFC107",
  blancoMarfil: "#F4F4F4"
};

const SLIDES = [
  {
    titulo: "Filtros para Maquinaria Agrícola",
    subtitulo: "Protección máxima para tu cosecha",
    desc: "Soluciones de filtración diseñadas para resistir largas jornadas en el campo y proteger motores contra el polvo y la humedad.",
    accent: colors.doradoAmbar,
    img: "https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777130278/IMG_Agricola.jpg",
    alt: "Filtros de aire y combustible instalados en un tractor agrícola de alta tecnología"
  },
  {
    titulo: "Filtros para Maquinaria Pesada",
    subtitulo: "Rendimiento imparable en la construcción",
    desc: "Componentes de alta resistencia que optimizan el ciclo de vida de excavadoras y retroexcavadoras bajo condiciones extremas.",
    accent: colors.doradoAmbar,
    img: "https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777130859/IMG_Industrial.jpg",
    alt: "Filtros hidráulicos de alto flujo para maquinaria de construcción pesada"
  },
  {
    titulo: "Filtros para Transporte",
    subtitulo: "Eficiencia y ahorro en cada kilómetro",
    desc: "Gama completa para flotas de carga y pasajeros, enfocada en la reducción de emisiones y el ahorro de combustible.",
    accent: colors.doradoAmbar,
    img: "https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777132446/IMG_Transporte.jpg",
    alt: "Filtros de aceite y separadores de agua para motores de camiones de carga pesada"
  },
  {
    titulo: "Filtros para Maquinaria Minera",
    subtitulo: "Resistencia absoluta en entornos críticos",
    desc: "Filtración especializada para equipos de minería de superficie y subterránea, garantizando operatividad en ambientes altamente abrasivos.",
    accent: colors.doradoAmbar,
    img: "https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777132275/IMG_Minera.jpg",
    alt: "Sistemas de filtración reforzados para camiones mineros y palas mecánicas"
  },
  {
    titulo: "Repuestos y Accesorios",
    subtitulo: "Piezas originales siempre disponibles",
    desc: "Más de 500 referencias en stock con despacho en 48 horas a todo Colombia.",
    accent: colors.doradoAmbar,
    img: "https://res.cloudinary.com/ddyrgkdxq/image/upload/v1777133320/IMG_Repuestos.png",
    alt: "Repuestos originales para compresores industriales con envío a toda Colombia"
  }
];

function IconoCompresor({ color = colors.doradoAmbar, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="10" y="30" width="44" height="28" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
      <rect x="18" y="38" width="12" height="12" rx="2" fill={color} opacity="0.5" />
      <circle cx="54" cy="44" r="10" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
      <circle cx="54" cy="44" r="5" fill={color} />
      <line x1="54" y1="10" x2="54" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="58" x2="4" y2="64" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="54" y1="58" x2="54" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="54" y1="68" x2="66" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Hero({ setVista }) {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            style={{ background: colors.doradoAmbar, width: 10, height: 10, borderRadius: "50%", border: "none" }}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {SLIDES.map((slide, i) => {
          const slideStyle = {
            backgroundImage: `linear-gradient(rgba(6,8,15,0.55), rgba(6,8,15,0.55)), url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // Cambiamos minHeight por height para que sea fijo
            height: 550,
            color: "#fff",
            overflow: "hidden" // Evita que contenido extra rompa el diseño
          };

          return (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`} style={slideStyle}>
              <div className="container h-100">
                {/* Usamos h-100 para que la fila ocupe todo el alto del padre */}
                <div className="row align-items-center h-100">
                  <div className="col-lg-7 py-5">
                    <p className="fw-bold mb-2 text-uppercase" style={{ color: slide.accent, fontSize: "0.8rem", letterSpacing: 3 }}>
                      A&P Lubricantes y Filtros
                    </p>
                    <h1 style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2.5rem, 5vw, 4.5rem)", // Ajusté un poco el tamaño para evitar desbordes
                      color: "#ffffff",
                      lineHeight: 1.05,
                      marginBottom: "1rem"
                    }}>
                      {slide.titulo}
                    </h1>
                    <p className="fw-semibold mb-2" style={{ color: slide.accent, fontSize: "1.1rem" }}>
                      {slide.subtitulo}
                    </p>
                    <p className="mb-4" style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "0.97rem",
                      maxWidth: 520,
                      fontWeight: 300,
                      // Limitamos a 3 líneas de texto para mantener la simetría si la descripción es muy larga
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {slide.desc}
                    </p>
                    <div className="d-flex gap-3 flex-wrap">
                      <button className="btn" style={{ background: colors.doradoAmbar, color: "#0b0b0b", fontWeight: 700 }} onClick={() => setVista && setVista("productos")}>
                        Ver Productos
                      </button>
                      <button className="btn btn-outline-light fw-bold px-4 py-2" onClick={() => setVista && setVista("contactos")}>
                        Contáctanos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default Hero;  