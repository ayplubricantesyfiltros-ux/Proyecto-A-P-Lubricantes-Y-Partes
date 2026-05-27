import { useState } from "react";

function ProductGallery({ imagenes, nombre }) {
  // Ordena las imágenes para que la principal aparezca primero por defecto
  const imagenesOrdenadas = [...imagenes].sort((a, b) => b.es_principal - a.es_principal);
  const [imagenActiva, setImagenActiva] = useState(imagenesOrdenadas[0]?.imagen_url || "");

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Contenedor Imagen Principal */}
      <div 
        className="position-relative bg-white border border-light d-flex align-items-center justify-content-center p-3 mb-3 overflow-hidden"
        style={{ width: "100%", height: "450px", borderRadius: "12px" }}
      >
        <img 
          src={imagenActiva} 
          alt={nombre} 
          className="img-fluid h-100 object-fit-contain transition-all duration-300 transform-hover-zoom"
        />
      </div>

      {/* Fila de Miniaturas */}
      <div className="d-flex gap-2 w-100 overflow-x-auto pb-2 scrollbar-premium">
        {imagenesOrdenadas.map((img) => (
          <button
            key={img.id}
            onClick={() => setImagenActiva(img.imagen_url)}
            className={`btn p-1 bg-white border ${imagenActiva === img.imagen_url ? "border-warning border-2" : "border-muted"}`}
            style={{ width: "80px", height: "80px", borderRadius: "8px", flexShrink: 0 }}
          >
            <img src={img.imagen_url} alt="Miniatura" className="w-100 h-100 object-fit-contain" />
          </button>
        ))}
      </div>

      <style>{`
        .transform-hover-zoom:hover {
          transform: scale(1.08);
          cursor: zoom-in;
        }
        .scrollbar-premium::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default ProductGallery;