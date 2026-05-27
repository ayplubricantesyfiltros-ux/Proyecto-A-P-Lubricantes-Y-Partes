import { useState, useRef } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import LoginModal from "../components/LoginModal";
import CartPanel from "../components/CartPanel";
import CTA from "../components/Home/CTA";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

/* ============================================================
   COMPONENTES INTERNOS
   ============================================================ */
const URL_FONDO = "/images/Nosotros/somos.png";

const Hero = () => (
  <section
    className="position-relative overflow-hidden"
    style={{
      backgroundImage: `url(${URL_FONDO})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "500px"
    }}
  >
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1 }} />
    <div className="container text-center py-5 position-relative" style={{ zIndex: 2 }}>
      <p className="text-light mb-2" style={{ letterSpacing: "5px" }}>CONTACTO</p>
      <h1 className="display-1 fw-bold text-light">HABLEMOS</h1>
      <p className="lead text-light mx-auto mt-4 col-lg-8">
        Estamos listos para ayudarte con soluciones industriales a tu medida.
      </p>
    </div>
  </section>
);

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */
export default function ContactoPage({
  setVista, usuario, login, logout, carrito, totalItems, cartOpen, setCartOpen, cambiarCantidad, eliminarDelCarrito
}) {
  const [showModal, setShowModal] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Enviando...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    emailjs.sendForm(
      'service_i16u9vm',
      'template_aqqdq5c',
      form.current,
      'sgFOZY5SPPk7ruthI'
    )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Gracias, te contactaremos pronto para procesar tu pedido.',
          confirmButtonColor: '#ffc107',
        });
        e.target.reset();
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un problema',
          text: 'No pudimos enviar tu mensaje. Por favor intenta de nuevo.',
          confirmButtonColor: '#d33',
        });
        console.error("Error:", error.text);
      });
  };

  return (
    <div>
      <Navbar onOpenLogin={() => setShowModal(true)} vistaActual="contacto" setVista={setVista} usuario={usuario} logout={logout} totalItems={totalItems} setCartOpen={setCartOpen} />

      <main>
        <Hero />

        <section className="py-5 bg-light">
          <div className="container">
            <div className="row g-5">

              {/* FORMULARIO (Izquierda) */}
              <div className="col-lg-6">
                <h2 className="fw-bold mb-4">Envíanos un mensaje</h2>
                <form ref={form} onSubmit={sendEmail} className="row g-3">
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Nombre" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="email" className="form-control" placeholder="Correo" required />
                  </div>
                  <div className="col-12">
                    <input type="text" name="title" className="form-control" placeholder="Asunto (Ej: Pedido de repuestos)" required />
                  </div>
                  <div className="col-12">
                    <textarea name="message" className="form-control" rows="5" placeholder="Escribe aquí los productos que necesitas..." required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-warning w-100 fw-bold py-3 shadow-sm text-uppercase">
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </div>

              {/* INFO DE CONTACTO (Derecha) */}
              <div className="col-lg-6">
                <h2 className="fw-bold mb-4 position-relative pb-2">
                  Información de contacto
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '3px', backgroundColor: '#ffc107' }}></span>
                </h2>

                <div className="d-flex flex-column gap-3 mt-4">
                  {/* Dirección */}
                  <div className="d-flex align-items-center p-3 bg-white shadow-sm rounded-3 border-start border-warning border-4">
                    <div
                      className="bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                      style={{ width: '60px', height: '60px' }}
                    >
                      <i className="bi bi-geo-alt fs-4 text-warning"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0 small fw-bold">DIRECCIÓN</p>
                      <p className="mb-0 fw-semibold">Bogotá, Colombia</p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="d-flex align-items-center p-3 bg-white shadow-sm rounded-3 border-start border-warning border-4">
                    <div
                      className="bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                      style={{ width: '60px', height: '60px' }}
                    >
                      <i className="bi bi-telephone fs-4 text-warning"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0 small fw-bold">TELÉFONO</p>
                      <p className="mb-0 fw-semibold">+57 311 440 5432</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="d-flex align-items-center p-3 bg-white shadow-sm rounded-3 border-start border-warning border-4">
                    <div
                      className="bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                      style={{ width: '60px', height: '60px' }}
                    >
                      <i className="bi bi-envelope fs-4 text-warning"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0 small fw-bold">EMAIL</p>
                      <p className="mb-0 fw-semibold text-break">comercial@aylcompresoresypartes.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAPA FULL WIDTH (Debajo de ambas columnas) */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="rounded-4 overflow-hidden shadow-sm">
                  <iframe
                    title="mapa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127233.15555416049!2d-74.15317769999999!3d4.6784512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9572996962f3%3A0x63351239841434c4!2zQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1713915000000!5m2!1ses!2sco"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
      <CartPanel carrito={carrito} cartOpen={cartOpen} setCartOpen={setCartOpen} cambiarCantidad={cambiarCantidad} eliminarDelCarrito={eliminarDelCarrito} />
      {showModal && <LoginModal login={login} onClose={() => setShowModal(false)} />}
    </div>
  );
}