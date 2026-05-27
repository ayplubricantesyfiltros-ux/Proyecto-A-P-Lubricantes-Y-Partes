function ProductInfo({ producto }) {
  const tieneOferta = producto.precio_oferta && producto.precio_oferta < producto.precio;
  const precioFinal = tieneOferta ? producto.precio_oferta : producto.precio;
  const stock = producto.inventario?.stock_disponible || 0;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="text-uppercase fw-bold text-warning small">{producto.marcas?.nombre}</span>
        <span className="text-muted small">REF: <b className="text-dark">{producto.referencia_interna || "N/A"}</b></span>
      </div>
      
      <h2 className="fw-bold text-dark mb-3" style={{ fontSize: "1.8rem" }}>{producto.nombre}</h2>
      
      {/* Contenedor de Precios estructurado en Pesos Colombianos (COP) */}
      <div className="bg-light p-3 rounded-4 mb-4">
        {tieneOferta && (
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="text-muted text-decoration-line-through fs-5">
              ${Number(producto.precio).toLocaleString("es-CO")} COP
            </span>
            <span className="badge bg-danger rounded-pill">Oferta</span>
          </div>
        )}
        <div className="d-flex align-items-baseline gap-2">
          <span className="h1 fw-bold text-dark mb-0">
            ${Number(precioFinal).toLocaleString("es-CO")}
          </span>
          <span className="text-muted small fw-semibold">COP</span>
        </div>
        <p className="text-success small mb-0 mt-2">
          <i className="bi bi-patch-check-fill me-1"></i> Emitimos factura electrónica reglamentaria DIAN
        </p>
      </div>

      {/* Stock e Indicadores rápidos */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className={`badge ${stock > 0 ? "bg-success" : "bg-danger"}`}>
            {stock > 0 ? "En existencias" : "Agotado"}
          </span>
          <span className="text-secondary small">{stock} unidades listas para despacho</span>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;