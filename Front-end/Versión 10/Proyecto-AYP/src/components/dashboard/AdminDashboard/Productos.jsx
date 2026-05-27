// src/components/dashboard/AdminDashboard/Productos.jsx
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../lib/client";
const obtenerImagenLocal = (nombre) => {
    if (!nombre) return imgHerramienta;
    return imgHerramienta;
};

// Configuración de Cloudinary
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddyrgkdxq/image/upload";
const UPLOAD_PRESET = "A&P Lubricantes";

// ==========================================
// COMPONENTE SUB-INTERNO: MiniCarruselProducto
// ==========================================
function MiniCarruselProducto({ imagenes = [], nombreProducto }) {
    const [indexActual, setIndexActual] = useState(0);

    // Si no hay imágenes en la base de datos, mostramos la de respaldo
    if (!imagenes || imagenes.length === 0) {
        return (
            <img
                src={obtenerImagenLocal(nombreProducto)}
                className="img-producto-uniforme"
                alt={nombreProducto}
            />
        );
    }

    const anteriorImagen = (e) => {
        e.stopPropagation(); // Evita clics accidentales si la tarjeta tuviera eventos
        setIndexActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    };

    const siguienteImagen = (e) => {
        e.stopPropagation();
        setIndexActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="position-relative overflow-hidden group-carrusel" style={{ height: "180px" }}>
            {/* Imagen Actual */}
            <img
                src={imagenes[indexActual]?.imagen_url}
                className="img-producto-uniforme w-100 h-100"
                style={{ objectFit: "contain", padding: "15px", backgroundColor: "#f8f9fa" }}
                alt={`${nombreProducto} - vista ${indexActual + 1}`}
            />

            {/* Controles de navegación laterales (Solo se muestran si hay más de 1 imagen) */}
            {imagenes.length > 1 && (
                <>
                    <button
                        onClick={anteriorImagen}
                        className="btn-carrusel-nav position-absolute start-0 top-50 translate-middle-y ms-2"
                        type="button"
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                        onClick={siguienteImagen}
                        className="btn-carrusel-nav position-absolute end-0 top-50 translate-middle-y me-2"
                        type="button"
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>

                    {/* Puntos Indicadores (Dots estilo MercadoLibre) */}
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1 bg-dark bg-opacity-25 rounded-pill px-2 py-1">
                        {imagenes.map((_, idx) => (
                            <span
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setIndexActual(idx); }}
                                className={`rounded-circle cursor-pointer`}
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    backgroundColor: idx === indexActual ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                                    transition: "0.2s"
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


function Productos({ agregarAlCarrito = null }) {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [orden, setOrden] = useState("reciente");

    // ========== LEER PRODUCTOS DESDE SUPABASE ==========
    const leerProductos = async () => {
        setCargando(true);
        try {
            const { data, error } = await supabase
                .from("productos")
                .select(`
                    *,
                    producto_imagenes (
                        id,
                        imagen_url,
                        cloudinary_public_id,
                        es_principal,
                        orden
                    )
                `)
                .order("created_at", { ascending: false });

            if (error) throw error;

            const productosConImagen = (data || []).map(p => {
                // Ordenar las imágenes para que la marcada como principal sea siempre la primera del carrusel
                const imagenesOrdenadas = p.producto_imagenes?.sort((a, b) => {
                    if (a.es_principal) return -1;
                    if (b.es_principal) return 1;
                    return (a.orden || 0) - (b.orden || 0);
                }) || [];

                return {
                    ...p,
                    imagen_url: imagenesOrdenadas[0]?.imagen_url || null, // Mantenemos compatibilidad hacia atrás
                    todas_las_imagenes: imagenesOrdenadas
                };
            });

            setProductos(productosConImagen);
        } catch (error) {
            console.error("Error al cargar productos desde Supabase:", error);
            setProductos([]);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        leerProductos();
    }, []);

    // ========== SUBIR IMAGEN A CLOUDINARY ==========
    const subirACloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
            const data = await res.json();
            
            if (!res.ok || !data.secure_url) {
                throw new Error(data.error?.message || "Error desconocido en Cloudinary");
            }

            return { url: data.secure_url, publicId: data.public_id };
        } catch (err) {
            console.error("Error en Cloudinary:", err);
            return null;
        }
    };

    // ========== SUSPENDER / REACTIVAR PRODUCTO ==========
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
                const { error } = await supabase
                    .from("productos")
                    .update({ suspendido: !estaSuspendido })
                    .eq("id", id);

                if (error) throw error;
                await leerProductos(); 
                Swal.fire({ icon: "success", title: "Estado actualizado", timer: 1000, showConfirmButton: false });
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "No se pudo actualizar el estado", "error");
            }
        }
    };

    // ========== MODAL PARA CREAR / EDITAR PRODUCTO ==========
    const abrirModal = async (producto = null) => {
        let listaImagenes = [];

        if (producto && producto.todas_las_imagenes) {
            listaImagenes = producto.todas_las_imagenes.map((img, index) => ({
                id: img.id,
                url: img.imagen_url,
                file: null,
                es_principal: img.es_principal,
                esNueva: false,
                cloudinary_public_id: img.cloudinary_public_id,
                orden: img.orden || index
            }));
        }

        const actualizarVistaPreviasDOM = () => {
            const contenedor = document.getElementById("preview-container");
            const placeholder = document.getElementById("drop-zone-placeholder");
            
            if (!contenedor) return;
            
            if (listaImagenes.length === 0) {
                contenedor.innerHTML = "";
                placeholder.style.display = "block";
                return;
            }

            placeholder.style.display = "none";
            
            contenedor.innerHTML = listaImagenes.map((img, index) => `
                <div style="position: relative; width: 85px; height: 85px; border: 2px solid ${img.es_principal ? '#ffc107' : '#e1e5eb'}; border-radius: 8px; padding: 4px; background: #fff;">
                    <img src="${img.url}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;" />
                    <button type="button" class="btn-eliminar-img" data-index="${index}" style="position: absolute; top: -6px; right: -6px; width: 18px; height: 18px; border-radius: 50%; background: #dc3545; color: white; border: none; font-size: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold;">✕</button>
                    <button type="button" class="btn-principal-img" data-index="${index}" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); font-size: 9px; padding: 1px 5px; border-radius: 10px; border: none; cursor: pointer; background: ${img.es_principal ? '#ffc107' : '#6c757d'}; color: #fff; font-weight: 600; white-space: nowrap;">
                        ${img.es_principal ? 'Principal' : 'Fijar'}
                    </button>
                </div>
            `).join('');

            contenedor.querySelectorAll(".btn-eliminar-img").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute("data-index"));
                    listaImagenes.splice(idx, 1);
                    if (listaImagenes.length > 0 && !listaImagenes.some(i => i.es_principal)) {
                        listaImagenes[0].es_principal = true;
                    }
                    actualizarVistaPreviasDOM();
                };
            });

            contenedor.querySelectorAll(".btn-principal-img").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute("data-index"));
                    listaImagenes.forEach((img, i) => img.es_principal = (i === idx));
                    actualizarVistaPreviasDOM();
                };
            });
        };

        const { value: formData } = await Swal.fire({
            title: producto ? "✏️ Editar Producto" : "📦 Nuevo Ingreso",
            width: 550,
            background: "#ffffff",
            showCancelButton: true,
            confirmButtonColor: "#121212",
            cancelButtonColor: "#747474",
            confirmButtonText: producto ? "Guardar Cambios" : "Agregar Producto",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'rounded-4 shadow-lg p-3',
                title: 'fw-bold fs-4 text-dark pt-2',
                actions: 'mb-2'
            },
            html: `
                <div style="display: flex; flex-direction: column; gap: 16px; text-align: left; font-family: system-ui, sans-serif; padding: 10px 5px 0 5px;">
                    
                    <div id="drop-zone" style="border: 2px dashed #d1d5db; border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; background: #f9fafb; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#121212'; this.style.background='#f3f4f6';" onmouseout="this.style.borderColor='#d1d5db'; this.style.background='#f9fafb';">
                        <div id="drop-zone-placeholder">
                            <i class="bi bi-cloud-arrow-up-fill" style="font-size: 2rem; color: #9ca3af;"></i>
                            <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 500; color: #4b5563;">Haz clic para añadir una o más imágenes</p>
                            <p style="margin: 2px 0 0 0; font-size: 11px; color: #9ca3af;">Puedes seleccionar varios archivos a la vez</p>
                        </div>
                        <div id="preview-container" style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 5px;"></div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px;">Nombre del Producto</label>
                        <input id="nombre" class="form-control" placeholder="Ej. Filtro de Aceite Sintético" style="height: 45px; border-radius: 8px; border: 1px solid #d1d5db; padding: 10px 14px; font-size: 14px;" value="${producto?.nombre || ""}">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px;">Marca</label>
                            <input id="marca" class="form-control" placeholder="Ej. Mobil / Shell" style="height: 45px; border-radius: 8px; border: 1px solid #d1d5db; padding: 10px 14px; font-size: 14px;" value="${producto?.marca || ""}">
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px;">Ref. Interna (Opcional)</label>
                            <input id="referencia_interna" class="form-control" placeholder="Ej. REF-1020" style="height: 45px; border-radius: 8px; border: 1px solid #d1d5db; padding: 10px 14px; font-size: 14px;" value="${producto?.referencia_interna || ""}">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px;">Descripción Breve</label>
                        <textarea id="descripcion" class="form-control" placeholder="Especificaciones técnicas, compatibilidad o litraje..." style="height: 80px; border-radius: 8px; border: 1px solid #d1d5db; padding: 10px 14px; font-size: 14px; resize: none;">${producto?.descripcion || ""}</textarea>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 4px; width: 50%;">
                        <label style="font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px;">Precio de Venta</label>
                        <div style="position: relative; display: flex; align-items: center;">
                            <span style="position: absolute; left: 14px; color: #6b7280; font-size: 14px; font-weight: 500;">$</span>
                            <input id="precio" type="number" min="0.01" step="0.01" class="form-control" placeholder="0.00" style="height: 45px; border-radius: 8px; border: 1px solid #d1d5db; padding: 10px 14px 10px 28px; font-size: 14px; font-weight: 600; color: #0f172a;" value="${producto?.precio || ""}">
                        </div>
                    </div>

                </div>
            `,
            didOpen: () => {
                actualizarVistaPreviasDOM();

                const dropZone = document.getElementById("drop-zone");
                dropZone.onclick = () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.multiple = true;
                    input.onchange = (e) => {
                        const files = Array.from(e.target.files);
                        files.forEach(file => {
                            const esPrimera = listaImagenes.length === 0;
                            listaImagenes.push({
                                id: null,
                                url: URL.createObjectURL(file),
                                file: file,
                                es_principal: esPrimera,
                                esNueva: true
                            });
                        });
                        actualizarVistaPreviasDOM();
                    };
                    input.click();
                };
            },
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value.trim();
                if (!nombre) return Swal.showValidationMessage("El nombre es obligatorio");
                
                const marca = document.getElementById("marca").value.trim();
                if (!marca) return Swal.showValidationMessage("La marca es obligatoria");

                const descripcion = document.getElementById("descripcion").value.trim();
                if (!descripcion) return Swal.showValidationMessage("La descripción es obligatoria");

                const precio = document.getElementById("precio").value;
                if (!precio || isNaN(precio) || Number(precio) <= 0) {
                    return Swal.showValidationMessage("El precio es obligatorio y debe ser mayor a 0");
                }

                if (listaImagenes.length === 0) {
                    return Swal.showValidationMessage("Debes asociar al menos una imagen al producto");
                }
                
                return {
                    nombre: nombre,
                    marca: marca,
                    referencia_interna: document.getElementById("referencia_interna").value.trim() || null,
                    descripcion: descripcion,
                    precio: Number(precio),
                };
            }
        });

        if (!formData) return;

        Swal.fire({ title: 'Procesando imágenes y datos...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            let productoId = producto?.id;

            const datosProducto = {
                nombre: formData.nombre,
                marca: formData.marca,
                referencia_interna: formData.referencia_interna,
                descripcion: formData.descripcion,
                precio: formData.precio,
                suspendido: producto?.suspendido || false
            };

            if (producto) {
                const { error: errUp } = await supabase.from("productos").update(datosProducto).eq("id", productoId);
                if (errUp) throw errUp;
            } else {
                const { data: nuevoP, error: errIns } = await supabase.from("productos").insert([datosProducto]).select().single();
                if (errIns) throw errIns;
                productoId = nuevoP.id;
            }

            if (producto) {
                const idsQuedan = listaImagenes.filter(i => !i.esNueva).map(i => i.id);
                const imagenesAEliminar = producto.todas_las_imagenes.filter(img => !idsQuedan.includes(img.id));
                
                if (imagenesAEliminar.length > 0) {
                    const idsAEnviar = imagenesAEliminar.map(img => img.id);
                    await supabase.from("producto_imagenes").delete().in("id", idsAEnviar);
                }
            }

            for (let i = 0; i < listaImagenes.length; i++) {
                const itemImg = listaImagenes[i];

                if (itemImg.esNueva) {
                    const subida = await subirACloudinary(itemImg.file);
                    if (subida) {
                        await supabase.from("producto_imagenes").insert([{
                            producto_id: productoId,
                            imagen_url: subida.url,
                            cloudinary_public_id: subida.publicId,
                            es_principal: itemImg.es_principal,
                            orden: i
                        }]);
                    }
                } else {
                    await supabase.from("producto_imagenes").update({
                        es_principal: itemImg.es_principal,
                        orden: i
                    }).eq("id", itemImg.id);
                }
            }

            await leerProductos(); 
            Swal.fire("Éxito", "Producto y su galería actualizados correctamente", "success");
        } catch (err) {
            console.error("Error al procesar la solicitud en el inventario:", err);
            Swal.fire("Error", "Ocurrió un problema: " + err.message, "error");
        }
    };

    // ========== FILTRADO Y ORDENAMIENTO ==========
    const filtrados = useMemo(() => {
        let resultado = productos.filter((p) => {
            const coincide = p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                             p.marca?.toLowerCase().includes(busqueda.toLowerCase());
            if (orden === "deshabilitados") return coincide && p.suspendido;
            if (orden === "todos") return coincide;
            return coincide && !p.suspendido;
        });

        switch (orden) {
            case "reciente":
                resultado.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case "precio_asc":
                resultado.sort((a, b) => (a.precio || 0) - (b.precio || 0));
                break;
            case "precio_desc":
                resultado.sort((a, b) => (b.precio || 0) - (a.precio || 0));
                break;
            default:
                break;
        }
        return resultado;
    }, [productos, busqueda, orden]);

    // ========== RENDERIZADO ==========
    return (
        <div className="p-4 bg-white min-vh-100">
            <style>{`
                .shadow-hover:hover { transform: translateY(-5px); transition: 0.3s; }
                .filtro-btn { border: 1.5px solid #e0e0e0; background: #fff; border-radius: 20px; padding: 6px 16px; font-size: 13px; cursor: pointer; transition: 0.2s; }
                .filtro-btn.activo { background: #121212; color: #fff; border-color: #121212; }
                .img-producto-uniforme { width: 100%; height: 180px; object-fit: contain; padding: 15px; background-color: #f8f9fa; }
                .producto-suspendido { opacity: 0.5; filter: grayscale(1); }
                
                /* Estilos nuevos para los botones del mini-carrusel */
                .btn-carrusel-nav {
                    background: rgba(255, 255, 255, 0.85);
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
                    color: #333;
                    font-size: 12px;
                    transition: 0.2s;
                    opacity: 0; /* Ocultos por defecto */
                }
                .group-carrusel:hover .btn-carrusel-nav {
                    opacity: 1; /* Aparecen al pasar el cursor sobre la imagen */
                }
                .btn-carrusel-nav:hover {
                    background: #ffffff;
                    transform: scale(1.1) translateY(-50%);
                }
                .card-actions {
                    min-width: 0;
                }
                .action-button {
                    min-width: 0;
                    flex: 1 1 auto;
                }
                .action-icon {
                    flex: 0 0 auto;
                }
                @media (max-width: 768px) {
                    .card-actions {
                        width: 100%;
                    }
                    .action-button,
                    .action-icon {
                        flex: 1 1 100%;
                    }
                }
            `}</style>

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div>
                    <h3 className="fw-bold mb-0">Gestión de Inventario</h3>
                    <p className="text-muted small">Panel conectado a Supabase & Cloudinary</p>
                </div>
                <div className="d-flex gap-2 flex-wrap" style={{ minWidth: 0 }}>
                    <input 
                        type="text" 
                        className="form-control border-0 bg-light" 
                        placeholder="Buscar por nombre o marca..." 
                        style={{ borderRadius: '10px', width: '100%', maxWidth: '280px', minWidth: 0 }} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                    />
                    <button className="btn btn-warning fw-bold px-4" onClick={() => abrirModal()}>+ Nuevo Producto</button>
                </div>
            </div>

            <hr className="opacity-10" />

            <div className="d-flex gap-2 mb-4 flex-wrap">
                {[
                    { id: "todos", label: "Todos", icon: "bi-grid" },
                    { id: "reciente", label: "Recientes", icon: "bi-clock-history" },
                    { id: "precio_asc", label: "Menor Precio", icon: "bi-sort-numeric-up" },
                    { id: "precio_desc", label: "Mayor Precio", icon: "bi-sort-numeric-down" },
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
                    <p className="mt-2 text-muted">Cargando productos...</p>
                </div>
            ) : (
                <div className="row g-4">
                    {filtrados.length > 0 ? (
                        filtrados.map((p) => (
                            <div className="col-md-4 col-xl-3" key={p.id}>
                                <div className={`card h-100 border-0 bg-light rounded-4 shadow-hover overflow-hidden ${p.suspendido ? 'producto-suspendido' : ''}`}>
                                    
                                    {/* SE REEMPLAZÓ EL CONTENEDOR DE IMAGEN FIJA POR EL NUEVO MINI-CARRUSEL INTERACTIVO */}
                                    <MiniCarruselProducto 
                                        imagenes={p.todas_las_imagenes} 
                                        nombreProducto={p.nombre} 
                                    />

                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="badge bg-white text-dark border text-uppercase">{p.marca || 'Sin Marca'}</span>
                                            <small className="text-muted fw-bold">ID: {p.id}</small>
                                        </div>
                                        <h6 className="fw-bold text-truncate mb-1">{p.nombre}</h6>
                                        <p className="text-muted small mb-3">{p.referencia_interna || "Sin referencia"}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className="fw-bold text-success fs-5">${p.precio?.toLocaleString()}</span>
                                        </div>
                                          
                                        <div className="mt-3 d-flex flex-wrap gap-2 card-actions">
                                            <button onClick={() => abrirModal(p)} className="btn btn-sm btn-dark flex-grow-1 fw-bold rounded-3 action-button">Editar</button>
                                            <button 
                                                onClick={() => alternarEstadoProducto(p.id, p.suspendido)} 
                                                className={`btn btn-sm rounded-3 action-icon ${p.suspendido ? 'btn-success' : 'btn-outline-danger'}`}
                                                title={p.suspendido ? "Reactivar" : "Suspender"}
                                            >
                                                <i className={`bi ${p.suspendido ? 'bi-eye-fill' : 'bi-eye-slash'}`}></i>
                                            </button>
                                            {agregarAlCarrito && (
                                                <button 
                                                    onClick={() => agregarAlCarrito(p)} 
                                                    className="btn btn-sm btn-outline-warning rounded-3 action-icon"
                                                    title="Agregar al carrito"
                                                >
                                                    <i className="bi bi-cart-plus"></i>
                                                </button>
                                            )}
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