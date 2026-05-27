import Swal from "sweetalert2";

function ActionButtons({ producto, agregarAlCarrito }) {
  const stock = producto.inventario?.stock_disponible || 0;

  const handleAgregar = () => {
    const itemNormalizado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio_oferta || producto.precio,
      categoria: producto.categorias?.nombre
    };
    agregarAlCarrito(itemNormalizado);
    
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Agregado al carrito",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // Generador automático de enlaces personalizados para el mercado industrial colombiano
  const enviarCotizacionWhatsApp = () => {
    const telefono = "573000000000"; // Reemplazar con el número de AYP Lubricantes y Filtros
    const mensaje = encodeURIComponent(
      `Hola AYP Lubricantes y Filtros, deseo cotizar el siguiente producto industrial:\n\n` +
      `📌 *Producto:* ${producto.nombre}\n` +
      `🔢 *Referencia:* ${producto.referencia_interna || "N/A"}\n` +
      `🏷️ *Marca:* ${producto.marcas?.nombre}`
    );
    window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`, "_blank");
  };

  return (
    <div className="d-flex flex-column gap-2 mt-auto">
      <div className="row g-2">
      </div>
      
      <button 
        onClick={enviarCotizacionWhatsApp}
        className="btn btn-success btn-lg w-100 rounded-pill fw-bold py-3 fs-6 d-flex align-items-center justify-content-center gap-2 mt-1"
      >
        <i className="bi bi-whatsapp"></i> Cotizar por WhatsApp
      </button>
    </div>
  );
}

export default ActionButtons;