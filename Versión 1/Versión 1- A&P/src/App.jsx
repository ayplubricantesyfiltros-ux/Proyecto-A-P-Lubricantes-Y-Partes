import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#10141D",
  primary: "#2B52A1",
  silver: "#D1E4FF",
  gold: "#FFC107",
  text: "#F4F4F4",
};

const products = [
  {
    icon: "🛢️",
    name: "Aceites de Motor",
    desc: "Lubricantes de alta performance para motores a gasolina, diésel e híbridos. Protección total en cualquier condición.",
    badge: "TOP SELLER",
  },
  {
    icon: "⚙️",
    name: "Filtros de Aceite",
    desc: "Filtración premium que elimina impurezas y prolonga la vida útil de tu motor hasta un 40% más.",
    badge: "NUEVO",
  },
  {
    icon: "💧",
    name: "Filtros de Combustible",
    desc: "Máxima pureza en el suministro de combustible. Compatibles con las principales marcas del mercado.",
    badge: null,
  },
  {
    icon: "🌬️",
    name: "Filtros de Aire",
    desc: "Flujo de aire optimizado para mayor potencia y eficiencia. Diseño multicapa de alta retención.",
    badge: null,
  },
  {
    icon: "🔧",
    name: "Aceites de Transmisión",
    desc: "Formulación especial para cajas automáticas y manuales. Suavidad en cada cambio de marcha.",
    badge: null,
  },
  {
    icon: "🏭",
    name: "Lubricantes Industriales",
    desc: "Soluciones para maquinaria pesada, compresores y sistemas hidráulicos de alta exigencia.",
    badge: "PRO",
  },
];

const services = [
  {
    icon: "🎓",
    title: "Capacitación Técnica",
    desc: "Formamos a tu equipo en las mejores prácticas de lubricación y mantenimiento preventivo.",
  },
  {
    icon: "📦",
    title: "Programa de Stock",
    desc: "Gestión inteligente de inventarios para que nunca te falte el producto que necesitas.",
  },
  {
    icon: "🔩",
    title: "Mantenimiento Preventivo",
    desc: "Asesoría especializada para diseñar planes de mantenimiento que reducen costos operativos.",
  },
  {
    icon: "🚚",
    title: "Distribución Nacional",
    desc: "Cobertura en toda Colombia con entregas rápidas y seguras directamente a tu negocio.",
  },
];

const stats = [
  { value: "15+", label: "Años de experiencia" },
  { value: "5000+", label: "Clientes satisfechos" },
  { value: "200+", label: "Referencias disponibles" },
  { value: "98%", label: "Tasa de satisfacción" },
];

const brands = ["MOBIL", "SHELL", "CASTROL", "VALVOLINE", "TOTAL", "PENNZOIL", "WIX", "MANN"];

export default function APLubricantes() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nombre: "", empresa: "", email: "", mensaje: "" });
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --bg: #10141D;
          --primary: #2B52A1;
          --silver: #D1E4FF;
          --gold: #FFC107;
          --text: #F4F4F4;
          --bg2: #161C2A;
          --card-bg: #1A2236;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Barlow', sans-serif;
          overflow-x: hidden;
        }

        /* ---- NAVBAR ---- */
        .navbar-ap {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          transition: all 0.4s ease;
          padding: 18px 0;
        }
        .navbar-ap.scrolled {
          background: rgba(16,20,29,0.97);
          backdrop-filter: blur(12px);
          padding: 10px 0;
          border-bottom: 1px solid rgba(43,82,161,0.3);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }
        .nav-brand {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.6rem; font-weight: 700;
          color: var(--silver) !important;
          letter-spacing: 2px;
        }
        .nav-brand span { color: var(--gold); }
        .nav-link-ap {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(209,228,255,0.7) !important;
          padding: 6px 14px !important;
          transition: color 0.3s;
          cursor: pointer; background: none; border: none;
        }
        .nav-link-ap:hover, .nav-link-ap.active { color: var(--gold) !important; }
        .btn-nav-cta {
          background: var(--gold); color: #10141D !important;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.8rem; letter-spacing: 2px; font-weight: 700;
          padding: 8px 20px; border-radius: 2px;
          transition: all 0.3s; border: none; cursor: pointer;
        }
        .btn-nav-cta:hover { background: #ffcd38; transform: translateY(-1px); }
        .hamburger { background: none; border: none; cursor: pointer; }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: var(--silver); margin: 5px 0;
          transition: all 0.3s;
        }
        .mobile-menu {
          display: none; position: fixed; top: 60px; left: 0; width: 100%;
          background: rgba(16,20,29,0.98); backdrop-filter: blur(12px);
          padding: 24px; z-index: 999;
          border-bottom: 1px solid rgba(43,82,161,0.3);
        }
        .mobile-menu.open { display: block; }
        .mobile-menu .nav-link-ap {
          display: block; padding: 12px 0 !important;
          font-size: 1rem; border-bottom: 1px solid rgba(209,228,255,0.08);
        }

        /* ---- HERO ---- */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0d14 0%, #10141D 40%, #0e1828 100%);
          position: relative; overflow: hidden;
          display: flex; align-items: center;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(43,82,161,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,82,161,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(43,82,161,0.18) 0%, transparent 70%);
          border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%,-50%);
          animation: pulse 4s ease-in-out infinite;
        }
        .hero-glow2 {
          position: absolute; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,193,7,0.08) 0%, transparent 70%);
          border-radius: 50%; top: 30%; right: 15%;
          animation: pulse 6s ease-in-out infinite reverse;
        }
        @keyframes pulse {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
        }
        .hero-badge {
          display: inline-block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem; letter-spacing: 4px; text-transform: uppercase;
          color: var(--gold); background: rgba(255,193,7,0.1);
          border: 1px solid rgba(255,193,7,0.3);
          padding: 6px 16px; border-radius: 2px; margin-bottom: 20px;
          animation: fadeDown 0.8s ease both;
        }
        .hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700; line-height: 1.05;
          color: var(--silver);
          animation: fadeDown 0.9s ease both 0.1s;
        }
        .hero-title .gold { color: var(--gold); }
        .hero-title .primary {
          background: linear-gradient(90deg, var(--silver), var(--primary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 1.1rem; color: rgba(209,228,255,0.65);
          max-width: 500px; line-height: 1.8; margin-top: 16px;
          font-weight: 300;
          animation: fadeDown 1s ease both 0.2s;
        }
        .hero-ctas {
          display: flex; gap: 16px; flex-wrap: wrap; margin-top: 36px;
          animation: fadeDown 1s ease both 0.3s;
        }
        .btn-gold {
          background: var(--gold); color: #10141D;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.9rem; letter-spacing: 2px; font-weight: 700;
          padding: 14px 32px; border-radius: 2px; border: none;
          cursor: pointer; transition: all 0.3s;
        }
        .btn-gold:hover { background: #ffcd38; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,193,7,0.3); }
        .btn-outline-silver {
          background: transparent; color: var(--silver);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.9rem; letter-spacing: 2px; font-weight: 700;
          padding: 13px 32px; border-radius: 2px;
          border: 1px solid rgba(209,228,255,0.3); cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline-silver:hover {
          border-color: var(--silver); background: rgba(209,228,255,0.05);
          transform: translateY(-2px);
        }
        .hero-divider {
          width: 80px; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--primary));
          margin: 24px 0; border-radius: 2px;
          animation: fadeDown 1s ease both 0.15s;
        }
        .hero-logo-wrap {
          display: flex; align-items: center; justify-content: center;
          animation: floatLogo 6s ease-in-out infinite;
        }
        .hero-logo-wrap img {
          max-width: 420px; width: 100%;
          filter: drop-shadow(0 0 40px rgba(43,82,161,0.5)) drop-shadow(0 0 80px rgba(255,193,7,0.15));
        }
        @keyframes floatLogo {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---- STATS BAR ---- */
        .stats-bar {
          background: var(--card-bg);
          border-top: 1px solid rgba(43,82,161,0.2);
          border-bottom: 1px solid rgba(43,82,161,0.2);
          padding: 32px 0;
        }
        .stat-item { text-align: center; }
        .stat-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2.4rem; font-weight: 700; color: var(--gold);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(209,228,255,0.5); margin-top: 4px;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .stat-divider {
          width: 1px; background: rgba(43,82,161,0.3); align-self: stretch;
        }

        /* ---- SECTION COMMON ---- */
        .section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem; letter-spacing: 4px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700;
          color: var(--silver); line-height: 1.15;
        }
        .section-title span { color: var(--primary); }
        .title-line {
          width: 60px; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, var(--gold), var(--primary));
          margin: 16px 0 24px;
        }
        .section-desc {
          color: rgba(209,228,255,0.6); font-size: 1rem;
          line-height: 1.8; max-width: 560px;
        }

        /* ---- PRODUCTS ---- */
        .products-section { background: var(--bg2); padding: 100px 0; }
        .product-card {
          background: var(--card-bg);
          border: 1px solid rgba(43,82,161,0.15);
          border-radius: 4px; padding: 32px 28px;
          height: 100%; position: relative; overflow: hidden;
          transition: all 0.4s ease; cursor: default;
        }
        .product-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--gold));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .product-card:hover { transform: translateY(-6px); border-color: rgba(43,82,161,0.4); }
        .product-card:hover::before { transform: scaleX(1); }
        .product-icon { font-size: 2.4rem; margin-bottom: 16px; }
        .product-badge {
          position: absolute; top: 16px; right: 16px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem; letter-spacing: 2px;
          background: var(--gold); color: #10141D;
          padding: 3px 8px; border-radius: 2px; font-weight: 700;
        }
        .product-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.3rem; font-weight: 700; color: var(--silver); margin-bottom: 10px;
        }
        .product-desc { font-size: 0.9rem; color: rgba(209,228,255,0.55); line-height: 1.7; }
        .product-arrow {
          margin-top: 20px; color: var(--gold); font-size: 0.85rem;
          font-family: 'Barlow Condensed', sans-serif; letter-spacing: 2px;
          opacity: 0; transition: opacity 0.3s;
        }
        .product-card:hover .product-arrow { opacity: 1; }

        /* ---- SERVICES ---- */
        .services-section { background: var(--bg); padding: 100px 0; }
        .service-card {
          display: flex; gap: 24px; padding: 28px;
          background: var(--card-bg); border-radius: 4px;
          border: 1px solid rgba(43,82,161,0.12);
          transition: all 0.3s; height: 100%;
        }
        .service-card:hover {
          border-color: rgba(255,193,7,0.25);
          background: #1e2840;
        }
        .service-icon-wrap {
          width: 56px; height: 56px; min-width: 56px;
          background: rgba(43,82,161,0.15);
          border: 1px solid rgba(43,82,161,0.25);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
        }
        .service-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem; font-weight: 700; color: var(--silver); margin-bottom: 8px;
        }
        .service-desc { font-size: 0.88rem; color: rgba(209,228,255,0.55); line-height: 1.7; }

        /* ---- ABOUT ---- */
        .about-section {
          background: linear-gradient(135deg, #0e1220 0%, var(--bg2) 100%);
          padding: 100px 0; position: relative; overflow: hidden;
        }
        .about-accent {
          position: absolute; right: -100px; top: 50%;
          transform: translateY(-50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(43,82,161,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }
        .about-feature {
          display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px;
        }
        .about-feat-icon {
          width: 40px; height: 40px; min-width: 40px;
          background: rgba(255,193,7,0.1); border: 1px solid rgba(255,193,7,0.2);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
        }
        .about-feat-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem; font-weight: 700; color: var(--silver);
        }
        .about-feat-desc { font-size: 0.85rem; color: rgba(209,228,255,0.5); }
        .about-img-wrap {
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        .about-img-bg {
          width: 340px; height: 340px;
          background: rgba(43,82,161,0.08);
          border: 1px solid rgba(43,82,161,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .about-img-bg::before {
          content: ''; position: absolute;
          width: 380px; height: 380px; border-radius: 50%;
          border: 1px dashed rgba(255,193,7,0.15);
          animation: rotate 20s linear infinite;
        }
        @keyframes rotate { to { transform: rotate(360deg); } }
        .about-img-bg img { width: 260px; filter: drop-shadow(0 0 30px rgba(43,82,161,0.4)); }

        /* ---- BRANDS ---- */
        .brands-section { background: var(--card-bg); padding: 60px 0; }
        .brand-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.1rem; font-weight: 700; letter-spacing: 3px;
          color: rgba(209,228,255,0.25); transition: color 0.3s;
          cursor: default; white-space: nowrap;
        }
        .brand-item:hover { color: rgba(209,228,255,0.7); }

        /* ---- CONTACT ---- */
        .contact-section { background: var(--bg); padding: 100px 0; }
        .contact-card {
          background: var(--card-bg);
          border: 1px solid rgba(43,82,161,0.2);
          border-radius: 4px; padding: 48px;
        }
        .contact-info-item {
          display: flex; gap: 16px; margin-bottom: 28px; align-items: flex-start;
        }
        .contact-icon {
          width: 44px; height: 44px; min-width: 44px;
          background: rgba(43,82,161,0.1); border: 1px solid rgba(43,82,161,0.2);
          border-radius: 4px; display: flex; align-items: center;
          justify-content: center; font-size: 1.2rem;
        }
        .contact-info-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 4px;
        }
        .contact-info-text { font-size: 0.9rem; color: rgba(209,228,255,0.7); line-height: 1.6; }
        .form-field {
          background: rgba(22,28,42,0.8) !important;
          border: 1px solid rgba(43,82,161,0.2) !important;
          color: var(--text) !important; border-radius: 2px !important;
          padding: 12px 16px !important; font-size: 0.9rem !important;
          transition: border-color 0.3s !important;
          font-family: 'Barlow', sans-serif !important;
        }
        .form-field:focus {
          border-color: rgba(255,193,7,0.4) !important;
          box-shadow: 0 0 0 3px rgba(255,193,7,0.08) !important;
          background: rgba(22,28,42,1) !important; outline: none !important;
        }
        .form-field::placeholder { color: rgba(209,228,255,0.25) !important; }
        .form-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(209,228,255,0.5); margin-bottom: 6px;
        }
        .success-msg {
          background: rgba(43,82,161,0.15); border: 1px solid rgba(43,82,161,0.3);
          color: var(--silver); padding: 14px 20px; border-radius: 2px;
          font-size: 0.9rem; text-align: center; margin-top: 16px;
        }

        /* ---- FOOTER ---- */
        .footer {
          background: #0a0d14;
          border-top: 1px solid rgba(43,82,161,0.2);
          padding: 48px 0 24px;
        }
        .footer-brand {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.5rem; font-weight: 700; color: var(--silver);
          letter-spacing: 2px;
        }
        .footer-brand span { color: var(--gold); }
        .footer-tagline {
          font-size: 0.8rem; color: rgba(209,228,255,0.35);
          font-style: italic; margin-top: 4px;
        }
        .footer-link {
          display: block; color: rgba(209,228,255,0.5);
          font-size: 0.85rem; margin-bottom: 8px;
          text-decoration: none; transition: color 0.3s; cursor: pointer;
          background: none; border: none; text-align: left; padding: 0;
        }
        .footer-link:hover { color: var(--gold); }
        .footer-col-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase;
          color: var(--silver); margin-bottom: 16px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(43,82,161,0.15);
          padding-top: 24px; margin-top: 40px;
          font-size: 0.78rem; color: rgba(209,228,255,0.3);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 8px;
        }
        .footer-bottom span { color: var(--gold); }

        /* ---- WHATSAPP BUTTON ---- */
        .whatsapp-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 56px; height: 56px;
          background: #25D366; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          font-size: 1.6rem;
          animation: wobble 3s ease-in-out infinite;
        }
        .whatsapp-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.5); }
        @keyframes wobble {
          0%,90%,100% { transform: rotate(0deg); }
          92% { transform: rotate(-8deg); }
          96% { transform: rotate(8deg); }
          98% { transform: rotate(-5deg); }
        }

        @media (max-width: 768px) {
          .hero { padding-top: 80px; }
          .hero-logo-wrap img { max-width: 280px; }
          .contact-card { padding: 28px 20px; }
          .stat-divider { display: none; }
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className={`navbar-ap ${scrolled ? "scrolled" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between">
          <button className="nav-brand" style={{background:"none",border:"none",cursor:"pointer"}} onClick={() => scrollTo("inicio")}>
            A<span>&</span>P
          </button>
          <div className="d-none d-lg-flex align-items-center gap-2">
            {["inicio","productos","servicios","nosotros","contacto"].map(s => (
              <button key={s} className={`nav-link-ap ${activeSection===s?"active":""}`} onClick={() => scrollTo(s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
            <button className="btn-nav-cta ms-2" onClick={() => scrollTo("contacto")}>Cotizar Ahora</button>
          </div>
          <button className="hamburger d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {["inicio","productos","servicios","nosotros","contacto"].map(s => (
          <button key={s} className="nav-link-ap" onClick={() => scrollTo(s)}>
            {s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
        <button className="btn-gold mt-3 w-100" onClick={() => scrollTo("contacto")}>Cotizar Ahora</button>
      </div>

      {/* ===== HERO ===== */}
      <section id="inicio" className="hero" ref={heroRef}>
        <div className="hero-grid"/>
        <div className="hero-glow"/>
        <div className="hero-glow2"/>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">🛢️ &nbsp;Lubricantes · Filtros · Protección</div>
              <h1 className="hero-title">
                <span className="primary">Protección</span><br/>
                que <span className="gold">mueve</span><br/>
                tu potencia
              </h1>
              <div className="hero-divider"/>
              <p className="hero-sub">
                Distribuidores especializados en lubricantes y filtros de alta calidad para vehículos livianos, pesados e industria. 
                Soluciones técnicas respaldadas por los mejores fabricantes del mundo.
              </p>
              <div className="hero-ctas">
                <button className="btn-gold" onClick={() => scrollTo("productos")}>Ver Productos</button>
                <button className="btn-outline-silver" onClick={() => scrollTo("contacto")}>Solicitar Cotización</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-logo-wrap">
                <img src="/mnt/user-data/uploads/Gemini_Generated_Image_gbcdabgbcdabgbcd-Photoroom.png" alt="A&P Lubricantes y Filtros"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <div className="stats-bar">
        <div className="container">
          <div className="row g-3 align-items-center justify-content-center">
            {stats.map((s,i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PRODUCTS ===== */}
      <section id="productos" className="products-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label">Nuestro Portafolio</div>
            <h2 className="section-title">Productos de <span>Alta Performance</span></h2>
            <div className="title-line mx-auto"/>
            <p className="section-desc mx-auto text-center">
              Trabajamos con las marcas líderes del mercado para ofrecerte lubricantes y filtros que maximizan el rendimiento y la vida útil de tu motor.
            </p>
          </div>
          <div className="row g-4">
            {products.map((p,i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="product-card h-100">
                  {p.badge && <div className="product-badge">{p.badge}</div>}
                  <div className="product-icon">{p.icon}</div>
                  <div className="product-name">{p.name}</div>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-arrow">EXPLORAR →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <div className="brands-section">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label">Marcas que distribuimos</div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-md-5">
            {brands.map((b,i) => (
              <div key={i} className="brand-item">{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section id="servicios" className="services-section">
        <div className="container">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-5">
              <div className="section-label">Lo que ofrecemos</div>
              <h2 className="section-title">Servicios <span>Especializados</span></h2>
              <div className="title-line"/>
              <p className="section-desc">
                Más que productos, somos tu socio técnico. Ofrecemos soluciones integrales que van desde la asesoría hasta la capacitación y gestión de inventarios.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {services.map((s,i) => (
              <div key={i} className="col-md-6">
                <div className="service-card">
                  <div className="service-icon-wrap">{s.icon}</div>
                  <div>
                    <div className="service-title">{s.title}</div>
                    <p className="service-desc">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="nosotros" className="about-section">
        <div className="about-accent"/>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5 d-flex justify-content-center">
              <div className="about-img-bg">
                <img src="/mnt/user-data/uploads/Gemini_Generated_Image_gbcdabgbcdabgbcd-Photoroom.png" alt="A&P Logo"/>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-label">¿Quiénes somos?</div>
              <h2 className="section-title">Expertos en <span>Lubricación</span> y Filtración</h2>
              <div className="title-line"/>
              <p className="section-desc mb-4">
                A&P Lubricantes y Filtros es una empresa colombiana especializada en la distribución de productos de lubricación y filtración para el sector automotriz e industrial. Nos respalda años de experiencia y el compromiso con la calidad.
              </p>
              {[
                { icon: "🏆", title: "Calidad Garantizada", desc: "Solo trabajamos con marcas certificadas que cumplen los más altos estándares internacionales." },
                { icon: "🤝", title: "Asesoría Técnica", desc: "Nuestro equipo de expertos te ayuda a encontrar el producto ideal para cada aplicación." },
                { icon: "⚡", title: "Despacho Rápido", desc: "Entregamos en toda Colombia con tiempos de respuesta ágiles y confiables." },
              ].map((f,i) => (
                <div key={i} className="about-feature">
                  <div className="about-feat-icon">{f.icon}</div>
                  <div>
                    <div className="about-feat-title">{f.title}</div>
                    <div className="about-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contacto" className="contact-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label">Estamos para servirte</div>
            <h2 className="section-title">Contáctanos <span>Hoy</span></h2>
            <div className="title-line mx-auto"/>
          </div>
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <div className="contact-card h-100">
                <h3 style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.4rem",color:"var(--silver)",marginBottom:"28px"}}>
                  Información de Contacto
                </h3>
                {[
                  { icon: "📍", label: "Ubicación", text: "Colombia — Bogotá y ciudades principales" },
                  { icon: "📞", label: "Teléfono / WhatsApp", text: "+57 300 000 0000\nLunes a Sábado · 8am – 6pm" },
                  { icon: "✉️", label: "Correo Electrónico", text: "info@aplubricantes.com\nventas@aplubricantes.com" },
                  { icon: "🕐", label: "Horario de Atención", text: "Lunes – Viernes: 8:00am – 6:00pm\nSábados: 8:00am – 1:00pm" },
                ].map((c,i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <div className="contact-info-label">{c.label}</div>
                      <div className="contact-info-text" style={{whiteSpace:"pre-line"}}>{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-card">
                <h3 style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.4rem",color:"var(--silver)",marginBottom:"28px"}}>
                  Solicita una Cotización
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre Completo</label>
                      <input className="form-control form-field" placeholder="Tu nombre" value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})} required/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Empresa</label>
                      <input className="form-control form-field" placeholder="Nombre de tu empresa" value={formData.empresa}
                        onChange={e => setFormData({...formData, empresa: e.target.value})}/>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Correo Electrónico</label>
                      <input type="email" className="form-control form-field" placeholder="tu@correo.com" value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})} required/>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Mensaje / Productos de interés</label>
                      <textarea className="form-control form-field" rows={4}
                        placeholder="Describe los productos o servicios que necesitas..."
                        value={formData.mensaje}
                        onChange={e => setFormData({...formData, mensaje: e.target.value})} required/>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-gold w-100" style={{fontSize:"0.9rem",padding:"14px"}}>
                        ENVIAR SOLICITUD →
                      </button>
                    </div>
                  </div>
                </form>
                {submitted && (
                  <div className="success-msg">
                    ✅ ¡Mensaje enviado! Te contactaremos pronto.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-brand">A<span>&</span>P</div>
              <div style={{fontFamily:"Barlow Condensed",fontSize:"0.75rem",letterSpacing:"2px",color:"rgba(209,228,255,0.4)",marginTop:"2px"}}>
                LUBRICANTES Y FILTROS
              </div>
              <p className="footer-tagline mt-2">Protección que mueve tu potencia.</p>
              <div className="d-flex gap-3 mt-3">
                {["fb","ig","wa","li"].map(s => (
                  <div key={s} style={{width:"32px",height:"32px",background:"rgba(43,82,161,0.15)",border:"1px solid rgba(43,82,161,0.2)",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"0.8rem",color:"rgba(209,228,255,0.4)",fontFamily:"Barlow Condensed",fontWeight:700,letterSpacing:1}}>
                    {s.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <div className="footer-col-title">Productos</div>
              {["Aceites de Motor","Filtros de Aceite","Filtros de Aire","Transmisión","Industrial"].map((l,i) => (
                <button key={i} className="footer-link">{l}</button>
              ))}
            </div>
            <div className="col-6 col-lg-2">
              <div className="footer-col-title">Servicios</div>
              {["Capacitación","Programa Stock","Mantenimiento","Distribución","Asesoría"].map((l,i) => (
                <button key={i} className="footer-link">{l}</button>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="footer-col-title">Newsletter</div>
              <p style={{fontSize:"0.82rem",color:"rgba(209,228,255,0.4)",lineHeight:"1.7",marginBottom:"16px"}}>
                Recibe novedades, ofertas y consejos de mantenimiento directamente en tu correo.
              </p>
              <div className="d-flex gap-2">
                <input className="form-control form-field" placeholder="tu@correo.com" style={{fontSize:"0.82rem"}}/>
                <button className="btn-gold" style={{padding:"10px 16px",fontSize:"0.8rem",whiteSpace:"nowrap"}}>SUSCRIBIR</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span style={{color:"rgba(209,228,255,0.3)"}}>© 2025 A&P Lubricantes y Filtros · Todos los derechos reservados</span>
            <span style={{color:"rgba(209,228,255,0.3)"}}>Hecho con <span style={{color:"var(--gold)"}}>♥</span> en Colombia</span>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP BTN ===== */}
      <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className="whatsapp-btn" title="Escríbenos por WhatsApp">
        💬
      </a>
    </>
  );
}