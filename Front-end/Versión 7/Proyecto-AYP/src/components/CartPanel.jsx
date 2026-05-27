import Swal from "sweetalert2";

// 1. Agregamos 'usuario' y 'onOpenLogin' a las props
function CartPanel({ 
  carrito, 
  cartOpen, 
  setCartOpen, 
  cambiarCantidad, 
  eliminarDelCarrito, 
  setVista, 
  usuario, 
  onOpenLogin 
}) {
  
  if (!cartOpen) return null;

  const total = carrito.reduce((acc, item) => {
    const num = parseInt(item.precio.replace(/\D/g, ""), 10);
    return acc + num * item.cantidad;
  }, 0);

  // 2. Lógica de validación mejorada
  const handleIrAlCheckout = () => {
  if (!usuario) {
    // Cerramos el carrito para que no estorbe al ver el login
    setCartOpen(false);

    Swal.fire({
      title: "¡Ya casi es tuyo!",
      text: "Para procesar tu compra, por favor inicia sesión.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#F5A623",
      cancelButtonColor: "#10142D",
      confirmButtonText: "Iniciar Sesión",
      cancelButtonText: "Seguir viendo",
    }).then((result) => {
      // SI EL USUARIO HACE CLIC EN "Iniciar Sesión"
      if (result.isConfirmed) {
        onOpenLogin(); // <--- Esta es la función que pasamos desde Productos.jsx
      }
    });
  } else {
    setCartOpen(false);
    setVista("checkout");
  }
};

  return (
    <>
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 10000 }}
        onClick={() => setCartOpen(false)}
      />

      <div
        className="bg-white d-flex flex-column shadow-lg"
        style={{
          position: "fixed", top: 0, right: 0,
          width: "100%", maxWidth: 400,
          height: "100vh", zIndex: 10001,
          transition: "transform 0.3s ease-in-out"
        }}
      >
        {/* Cabecera */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <div>
            <h2 className="fw-bold mb-0" style={{ fontSize: "1.1rem", color: "#10142D" }}> 
                <i className="bi bi-cart3 me-2"></i>Tu Pedido
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: "0.8rem" }}>
              {carrito.length} {carrito.length === 1 ? "artículo" : "artículos"}
            </p>
          </div>
          <button className="btn-close shadow-none" onClick={() => setCartOpen(false)} />
        </div>

        {/* Lista de productos */}
        <div className="flex-grow-1 overflow-auto p-3">
          {carrito.length === 0 ? (
            <div className="text-center py-5 mt-5">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: "4rem", opacity: "0.3" }}></i>
              <p className="text-secondary mt-3 fw-semibold">Tu carrito está esperando por herramientas de calidad.</p>
              <button 
                className="btn btn-outline-warning btn-sm rounded-pill mt-2"
                onClick={() => setCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {carrito.map((item) => (
                <div key={item.id} className="d-flex gap-3 bg-white border rounded-3 p-2 shadow-sm align-items-center">
                   {/* Aquí puedes usar el icono o la imagen según tu lógica de obtenerImagen */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 bg-light"
                    style={{ width: 60, height: 60, border: "1px solid #f0f0f0" }}
                  >
                     <i className="bi bi-box-seam text-secondary"></i>
                  </div>

                  <div className="flex-grow-1 min-width-0">
                    <div className="fw-bold text-truncate" style={{ fontSize: "0.85rem", color: "#10142D" }}>
                      {item.nombre}
                    </div>
                    <div className="fw-bold text-warning" style={{ fontSize: "0.9rem" }}>
                      {item.precio}
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-2">
                      <div className="btn-group border rounded-pill bg-white overflow-hidden" style={{ height: "28px" }}>
                        <button
                          className="btn btn-sm border-0 px-2 py-0 hover-bg-warning"
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                        >−</button>
                        <span className="d-flex align-items-center px-2 fw-bold" style={{ fontSize: "0.8rem" }}>
                          {item.cantidad}
                        </span>
                        <button
                          className="btn btn-sm border-0 px-2 py-0"
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                        >+</button>
                      </div>
                      <button 
                        className="btn btn-link text-danger p-0 text-decoration-none small"
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Carrito */}
        {carrito.length > 0 && (
          <div className="p-4 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-secondary fw-semibold">Subtotal:</span>
              <span className="fw-bold fs-4" style={{ color: "#10142D" }}>
                ${total.toLocaleString("es-CO")}
              </span>
            </div>
            <button
              className="w-100 border-0 rounded-pill fw-bold py-3 text-white shadow"
              style={{ 
                background: "linear-gradient(90deg, #F5A623 0%, #FFC107 100%)", 
                fontSize: "1rem", 
                letterSpacing: "1px" 
              }}
              onClick={handleIrAlCheckout}
            >
              PROCEDER AL PAGO <i className="bi bi-arrow-right ms-2"></i>
            </button>
            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.7rem" }}>
                <i className="bi bi-shield-check"></i> Pago 100% seguro y cifrado
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPanel;