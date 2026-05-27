import logoMarca from "../../assets/Home/Navbar/LOGO-SIN-FONDO.png";

const navLinks = ["Inicio", "Nosotros", "Productos", "Contactos"];
const productLinks = [
  "Compresores de Tornillo",
  "Compresores de Pistón",
  "Herramientas Neumáticas",
  "Repuestos",
  "Aceites y Lubricantes"
];

const contactInfo = [
  { icon: "bi-geo-alt", text: "Bogotá, Colombia" },
  { icon: "bi-telephone", text: "+57 311 440 5432" },
  { icon: "bi-envelope", text: "comercial@aylcompresoresypartes.com  alfredvesga@hotmail.com" },
  { icon: "bi-clock", text: "Lun–Vie: 8am – 6pm" },
];

function Footer() {
  return (
    <footer className="py-5" style={{ backgroundColor: "#10142D", color: "#F4F4F4" }}>
      <div className="container">

        <div className="row g-5">

          {/* LOGO + DESC */}
          <div className="col-12 col-md-4">
            <img
              src={logoMarca}
              alt="Logo"
              className="mb-3"
              style={{ maxWidth: "180px" }}
            />

            <p className="small opacity-75">
              Especialistas en compresores industriales y herramientas neumáticas.
              Calidad, respaldo y experiencia al servicio de la industria colombiana.
            </p>

            {/* REDES */}
            <div className="d-flex gap-3 mt-3">
              {["facebook", "tiktok", "whatsapp", "instagram"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "38px", height: "38px", color: "#F4F4F4" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFC107";
                    e.currentTarget.style.color = "#10142D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#F4F4F4";
                  }}
                >
                  <i className={`bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* EMPRESA */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase small mb-3">Empresa</h6>
            <ul className="list-unstyled">
              {navLinks.map((l) => (
                <li key={l} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none opacity-75"
                    style={{ color: "#F4F4F4" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FFC107";
                      e.target.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#F4F4F4";
                      e.target.style.opacity = "0.75";
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCTOS */}
          <div className="col-6 col-md-3">
            <h6 className="text-uppercase small mb-3">Productos</h6>
            <ul className="list-unstyled">
              {productLinks.map((l) => (
                <li key={l} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none opacity-75"
                    style={{ color: "#F4F4F4" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FFC107";
                      e.target.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#F4F4F4";
                      e.target.style.opacity = "0.75";
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="col-12 col-md-3">
            <h6 className="text-uppercase small mb-3">Contacto</h6>
            <ul className="list-unstyled">
              {contactInfo.map((c, index) => (
                <li key={index} className="d-flex mb-3">
                  <i className={`${c.icon} me-2`}></i>
                  <span className="small opacity-75">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="text-center mt-5 pt-4 border-top border-secondary small opacity-75">
          © 2026 A&P Lubricantes y Filtros. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}

export default Footer;