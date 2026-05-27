import Swal from "sweetalert2";

function ActionButtons({ producto }) {
  const stock = producto.inventario?.stock_disponible || 0;
  const estaDisponible = stock > 0;

  const enviarCotizacionWhatsApp = () => {
    const telefono = "573000000000"; // Reemplazar con el número de A&P Lubricantes y Filtros
    const mensaje = encodeURIComponent(
      `Hola A&P Lubricantes y Filtros, deseo cotizar el siguiente producto industrial:\n\n` +
      `📌 *Producto:* ${producto.nombre}\n` +
      `🔢 *Referencia:* ${producto.referencia_interna || "N/A"}\n` +
      `🏷️ *Marca:* ${producto.marcas?.nombre}`
    );
    window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`, "_blank");
  };

  return (
    <div className="d-flex flex-column gap-3 mt-auto">
      <button
        onClick={enviarCotizacionWhatsApp}
        className="btn btn-success btn-lg w-100 rounded-pill fw-bold py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
        disabled={!estaDisponible}
      >
        <i className="bi bi-whatsapp"></i>
        {estaDisponible ? "Cotizar por WhatsApp" : "Consultar disponibilidad"}
      </button>
      {!estaDisponible && (
        <p className="text-center text-danger small mb-0">
          Producto sin stock actualmente. Te contactamos cuando vuelva a estar disponible.
        </p>
      )}
    </div>
  );
}

export default ActionButtons;