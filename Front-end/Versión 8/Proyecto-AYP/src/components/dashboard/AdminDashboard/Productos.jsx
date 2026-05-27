import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import Notificaciones from "./Notificaciones";

// --- IMPORTACIÓN DE IMÁGENES LOCALES (Respaldo) ---
import imgHerramienta from "../../../assets/imgProductos/herramienta.jpg";
// Agrega aquí el resto de tus importaciones locales...

// --- CONFIGURACIÓN DE APIS ---
const API_URL = "http://localhost:3001/productos"; 
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload";
const UPLOAD_PRESET = "TU_UPLOAD_PRESET"; 

const obtenerImagenLocal = (nombre) => {
    if (!nombre) return imgHerramienta;
    const n = nombre.toLowerCase();
    // Tu lógica de imágenes locales se mantiene aquí
    return imgHerramienta;
};

function Productos() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [orden, setOrden] = useState("reciente");

    useEffect(() => {
        leíLosProductos();
    }, []);

    const leíLosProductos = async () => {
        setCargando(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al conectar con JSON Server:", error);
            setProductos([]);
        } finally {
            setCargando(false);
        }
    };

    const subirACloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
            const data = await res.json();
            return { url: data.secure_url, publicId: data.public_id };
        } catch (err) {
            console.error("Error en Cloudinary:", err);
            return null;
        }
    };

    const alternarEstadoProducto = async (id, estaSuspendido) => {
        const res = await Swal.fire({
            title: estaSuspendido ? "¿Reactivar producto?" : "¿Suspender producto?",
            text: "Esto cambiará la visibilidad en el catálogo.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#121212",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        });

        if (res.isConfirmed) {
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ suspendido: !estaSuspendido }),
                });
                leíLosProductos();
                Swal.fire({ icon: "success", title: "Estado actualizado", timer: 1000, showConfirmButton: false });
            } catch (err) {
                Swal.fire("Error", "No se pudo actualizar en el JSON", "error");
            }
        }
    };

    const abrirModal = async (p = null) => {
        const { value: v } = await Swal.fire({
            title: p ? "✏️ Editar Producto" : "📦 Nuevo Ingreso",
            width: 550,
            background: "#f9f9f9",
            showCancelButton: true,
            confirmButtonColor: "#121212",
            confirmButtonText: p ? "Guardar" : "Agregar",
            html: `
                <div style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
                    <div id="drop-zone" style="border: 2px dashed #ccc; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; background: #fff;">
                        <p style="margin:0; font-size:12px; color: #666;">Haz clic para subir imagen</p>
                        <img id="preview" src="${p?.ImagenUrl || ""}" style="margin-top:10px; max-width:100%; max-height: 150px; display:${p?.ImagenUrl ? "block" : "none"}; margin-left: auto; margin-right: auto;" />
                    </div>
                    <input id="n" class="swal2-input" placeholder="Nombre del producto" style="margin:0; width:100%" value="${p?.Nombre || ""}">
                    <input id="m" class="swal2-input" placeholder="Marca" style="margin:0; width:100%" value="${p?.Marca || ""}">
                    <input id="np" class="swal2-input" placeholder="N° de Parte" style="margin:0; width:100%" value="${p?.NumeroParte || ""}">
                    <div style="display: flex; gap: 10px;">
                        <input id="precio" type="number" class="swal2-input" placeholder="Precio ($)" style="margin:0; width:50%" value="${p?.Precio || ""}">
                        <input id="cantidad" type="number" class="swal2-input" placeholder="Stock" style="margin:0; width:50%" value="${p?.Cantidad || ""}">
                    </div>
                </div>
            `,
            didOpen: () => {
                const dz = document.getElementById("drop-zone");
                dz.onclick = () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            document.getElementById("preview").src = URL.createObjectURL(file);
                            document.getElementById("preview").style.display = "block";
                            dz.dataset.file = file;
                        }
                    };
                    input.click();
                };
            },
            preConfirm: () => {
                const nombre = document.getElementById("n").value;
                if (!nombre) return Swal.showValidationMessage("El nombre es obligatorio");
                return {
                    Nombre: nombre,
                    Marca: document.getElementById("m").value,
                    NumeroParte: document.getElementById("np").value,
                    Precio: Number(document.getElementById("precio").value),
                    Cantidad: Number(document.getElementById("cantidad").value),
                    ImagenFile: document.getElementById("drop-zone").dataset.file || null
                }
            }
        });

        if (v) {
            Swal.fire({ title: 'Procesando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            let imgFinal = { url: p?.ImagenUrl || "", publicId: p?.ImagenPublicId || "" };
            if (v.ImagenFile) {
                const subida = await subirACloudinary(v.ImagenFile);
                if (subida) imgFinal = subida;
            }

            const dataFinal = {
                ...p,
                Nombre: v.Nombre,
                Marca: v.Marca,
                NumeroParte: v.NumeroParte,
                Precio: v.Precio,
                Cantidad: v.Cantidad,
                ImagenUrl: imgFinal.url,
                ImagenPublicId: imgFinal.publicId,
                suspendido: p ? p.suspendido : false
            };

            try {
                await fetch(p ? `${API_URL}/${p.id}` : API_URL, {
                    method: p ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataFinal),
                });
                leíLosProductos();
                Swal.fire("Éxito", "Producto guardado correctamente", "success");
            } catch (err) {
                Swal.fire("Error", "No se pudo guardar la información", "error");
            }
        }
    };

    const filtrados = useMemo(() => {
        return productos
            .filter((p) => {
                const coincide = p.Nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                                 p.Marca?.toLowerCase().includes(busqueda.toLowerCase());
                
                if (orden === "deshabilitados") return coincide && p.suspendido;
                if (orden === "todos") return coincide;
                // Para el resto de filtros, solo mostrar activos
                return coincide && !p.suspendido;
            })
            .sort((a, b) => {
                const valA = a[Object.keys(a).find(k => k.toLowerCase() === 'precio')] || 0;
                const valB = b[Object.keys(b).find(k => k.toLowerCase() === 'precio')] || 0;

                switch (orden) {
                    case "reciente": return Number(b.id) - Number(a.id);
                    case "precio_asc": return Number(a.Precio) - Number(b.Precio);
                    case "precio_desc": return Number(b.Precio) - Number(a.Precio);
                    case "unidades_asc": return Number(a.Cantidad) - Number(b.Cantidad);
                    case "unidades_desc": return Number(b.Cantidad) - Number(a.Cantidad);
                    default: return 0;
                }
            });
    }, [productos, busqueda, orden]);

    return (
        <div className="p-4 bg-white min-vh-100">
            <style>{`
                .shadow-hover:hover { transform: translateY(-5px); transition: 0.3s; }
                .filtro-btn { border: 1.5px solid #e0e0e0; background: #fff; border-radius: 20px; padding: 6px 16px; font-size: 13px; cursor: pointer; transition: 0.2s; }
                .filtro-btn.activo { background: #121212; color: #fff; border-color: #121212; }
                .img-producto-uniforme { width: 100%; height: 180px; object-fit: contain; padding: 15px; background-color: #f8f9fa; }
                .producto-suspendido { opacity: 0.5; filter: grayscale(1); }
            `}</style>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-0">Gestión de Inventario</h3>
                    <p className="text-muted small">Panel conectado a Cloudinary & DB Local</p>
                </div>
                <div className="d-flex gap-2">
                    <input 
                        type="text" 
                        className="form-control border-0 bg-light" 
                        placeholder="Buscar por nombre o marca..." 
                        style={{ borderRadius: '10px', width: '280px' }} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                    />
                    <button className="btn btn-warning fw-bold px-4" onClick={() => abrirModal()}>+ Nuevo Producto</button>
                </div>
            </div>

            <Notificaciones productos={productos} />
            <hr className="opacity-10" />

            <div className="d-flex gap-2 mb-4 flex-wrap">
                {[
                    { id: "todos", label: "Todos", icon: "bi-grid" },
                    { id: "reciente", label: "Recientes", icon: "bi-clock-history" },
                    { id: "precio_asc", label: "Menor Precio", icon: "bi-sort-numeric-up" },
                    { id: "precio_desc", label: "Mayor Precio", icon: "bi-sort-numeric-down" },
                    { id: "unidades_asc", label: "Menor Stock", icon: "bi-arrow-down-short" },
                    { id: "unidades_desc", label: "Mayor Stock", icon: "bi-arrow-up-short" },
                    { id: "deshabilitados", label: "Suspendidos", icon: "bi-eye-slash" },
                ].map((f) => (
                    <button
                        key={f.id}
                        className={`filtro-btn ${orden === f.id ? "activo" : ""}`}
                        onClick={() => setOrden(f.id)}
                    >
                        <i className={`bi ${f.icon} me-1`}></i>
                        {f.label}
                    </button>
                ))}
            </div>

            {cargando ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status"></div>
                    <p className="mt-2 text-muted">Cargando base de datos...</p>
                </div>
            ) : (
                <div className="row g-4">
                    {filtrados.length > 0 ? (
                        filtrados.map((p) => (
                            <div className="col-md-4 col-xl-3" key={p.id}>
                                <div className={`card h-100 border-0 bg-light rounded-4 shadow-hover overflow-hidden ${p.suspendido ? 'producto-suspendido' : ''}`}>
                                    <div className="position-relative">
                                        <img
                                            src={p.ImagenUrl || obtenerImagenLocal(p.Nombre)}
                                            className="img-producto-uniforme"
                                            alt={p.Nombre}
                                        />
                                        {p.Cantidad <= 5 && !p.suspendido && (
                                            <span className="position-absolute top-0 end-0 m-2 badge bg-danger">¡Stock Bajo!</span>
                                        )}
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="badge bg-white text-dark border text-uppercase">{p.Marca || 'Sin Marca'}</span>
                                            <small className="text-muted fw-bold">ID: {p.id}</small>
                                        </div>
                                        <h6 className="fw-bold text-truncate mb-1">{p.Nombre}</h6>
                                        <p className="text-muted small mb-3">{p.NumeroParte}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className="fw-bold text-success fs-5">${p.Precio?.toLocaleString()}</span>
                                            <span className={`badge ${p.Cantidad > 0 ? 'bg-secondary' : 'bg-dark'}`}>
                                                {p.Cantidad} und.
                                            </span>
                                        </div>
                                          
                                        <div className="mt-3 d-flex gap-2">
                                            <button onClick={() => abrirModal(p)} className="btn btn-sm btn-dark w-100 fw-bold rounded-3">Editar</button>
                                            <button 
                                                onClick={() => alternarEstadoProducto(p.id, p.suspendido)} 
                                                className={`btn btn-sm rounded-3 ${p.suspendido ? 'btn-success' : 'btn-outline-danger'}`}
                                                title={p.suspendido ? "Reactivar" : "Suspender"}
                                            >
                                                <i className={`bi ${p.suspendido ? 'bi-eye-fill' : 'bi-eye-slash'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <i className="bi bi-search fs-1 text-muted"></i>
                            <p className="mt-3 text-muted">No se encontraron productos con esos criterios.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Productos;