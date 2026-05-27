import React, { useState } from "react";
import Swal from "sweetalert2";

function ProfilePage({ usuario, setVista, volverA }) {
    const [editando, setEditando] = useState(false);
    const [datosForm, setDatosForm] = useState({
        nombre: usuario?.nombre || "",
        email: usuario?.email || "",
        empresa: usuario?.empresa || "Cliente Particular",
        telefono: usuario?.telefono || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosForm(prev => ({ ...prev, [name]: value }));
    };

    const handleGuardar = () => {
        Swal.fire({
            icon: "success",
            title: "Perfil Actualizado",
            text: "Tus cambios se han guardado correctamente.",
            confirmButtonColor: "#F5A623", // El naranja de tu marca
        });
        setEditando(false);
    };

    // Extraer inicial para el avatar
    const inicial = datosForm.nombre.charAt(0).toUpperCase();

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F8F9FA" }}>
            {/* Header del Perfil */}
            <div className="bg-dark py-5 mb-5 shadow">
                <div className="container" style={{ maxWidth: "800px" }}>
                    <div className="d-flex align-items-center gap-4">
                        <button
                            className="btn btn-outline-light border-0 p-0"
                            onClick={() => setVista(volverA || "inicio")}
                        >
                            <i className="bi bi-arrow-left-circle fs-1"></i>
                        </button>

                        {/* Avatar */}
                        <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                            style={{ width: "80px", height: "80px", border: "4px solid rgba(255,255,255,0.2)" }}>
                            <span className="display-6 fw-bold text-dark">{inicial}</span>
                        </div>

                        <div className="text-white">
                            <h2 className="fw-bold mb-0">{datosForm.nombre}</h2>
                            <p className="text-white-50 mb-0">
                                <span className="badge bg-warning text-dark me-2">Cuenta {usuario?.rol || "Cliente"}</span>
                                {datosForm.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: "800px", marginTop: "-3rem" }}>
                <div className="row g-4">

                    {/* Tarjeta de Información Principal */}
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0"><i className="bi bi-person-badge me-2 text-warning"></i>Datos Personales</h5>
                                {!editando && (
                                    <button className="btn btn-light btn-sm fw-bold px-3" onClick={() => setEditando(true)}>
                                        <i className="bi bi-pencil-square me-2"></i>Editar
                                    </button>
                                )}
                            </div>

                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="small text-muted fw-bold text-uppercase">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={`form-control border-0 ${editando ? 'bg-light' : 'bg-white font-weight-bold'}`}
                                        value={datosForm.nombre}
                                        onChange={handleChange}
                                        disabled={!editando}
                                        style={{ fontSize: "1.1rem" }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="small text-muted fw-bold text-uppercase">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control border-0 ${editando ? 'bg-light' : 'bg-white'}`}
                                        value={datosForm.email}
                                        onChange={handleChange}
                                        disabled={!editando}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted fw-bold text-uppercase">Empresa / Razón Social</label>
                                    <input
                                        type="text"
                                        name="empresa"
                                        className={`form-control border-0 ${editando ? 'bg-light' : 'bg-white'}`}
                                        value={datosForm.empresa}
                                        onChange={handleChange}
                                        disabled={!editando}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted fw-bold text-uppercase">Teléfono de Contacto</label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        className={`form-control border-0 ${editando ? 'bg-light' : 'bg-white'}`}
                                        value={datosForm.telefono}
                                        onChange={handleChange}
                                        disabled={!editando}
                                        placeholder="No registrado"
                                    />
                                </div>
                            </div>

                            {editando && (
                                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                                    <button className="btn btn-warning flex-grow-1 py-2 fw-bold text-dark" onClick={handleGuardar}>
                                        Guardar Cambios
                                    </button>
                                    <button className="btn btn-outline-secondary px-4 py-2 fw-bold" onClick={() => setEditando(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Barra Lateral - Seguridad y Accesos */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white mb-4">
                            <h6 className="fw-bold mb-3 small text-muted text-uppercase">Seguridad</h6>
                            <button className="btn btn-outline-dark w-100 text-start mb-2 py-2 small fw-bold">
                                <i className="bi bi-shield-lock me-2"></i> Cambiar Clave
                            </button>
                            <button className="btn btn-outline-danger w-100 text-start py-2 small fw-bold">
                                <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                            </button>
                        </div>

                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-warning bg-opacity-10">
                            <h6 className="fw-bold mb-2">Ayuda Técnica</h6>
                            <p className="small text-muted mb-0">¿Necesitas ayuda con tu cuenta corporativa?</p>
                            <button className="btn btn-link text-warning fw-bold p-0 mt-2 text-decoration-none small">
                                Contactar Soporte
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* Sección de Historial de Pedidos - Proyecto A&P */}
            <div className="card border-0 shadow-sm rounded-4 bg-white mt-4 overflow-hidden">
                <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0 text-uppercase small text-muted">
                        <i className="bi bi-clock-history me-2 text-warning"></i>Historial de Pedidos A&P
                    </h6>
                    <span className="badge bg-dark-subtle text-dark border opacity-75">Registro de Compras</span>
                </div>

                <div className="p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                    <th className="border-0 ps-4 py-3">REFERENCIA</th>
                                    <th className="border-0 py-3">FECHA</th>
                                    <th className="border-0 py-3">ESTADO</th>
                                    <th className="border-0 py-3">TOTAL</th>
                                    <th className="border-0 py-3 text-end pe-4">GESTIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Ejemplo de un pedido de lubricantes/filtros */}
                                <tr>
                                    <td className="ps-4">
                                        <span className="fw-bold text-dark">#AP-2026-001</span>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Kit Mantenimiento</div>
                                    </td>
                                    <td className="small text-muted">28 Abr, 2026</td>
                                    <td>
                                        <span className="badge rounded-pill bg-success-subtle text-success border border-success border-opacity-10 px-3">
                                            Despachado
                                        </span>
                                    </td>
                                    <td className="fw-bold text-dark">$850.000</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-dark rounded-3 px-3 shadow-sm" style={{ fontSize: '0.75rem' }}>
                                            <i className="bi bi-file-earmark-pdf me-1"></i> Factura
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="ps-4">
                                        <span className="fw-bold text-dark">#AP-2026-002</span>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Filtros Hidráulicos</div>
                                    </td>
                                    <td className="small text-muted">15 Abr, 2026</td>
                                    <td>
                                        <span className="badge rounded-pill bg-warning-subtle text-warning border border-warning border-opacity-10 px-3">
                                            En Alistamiento
                                        </span>
                                    </td>
                                    <td className="fw-bold text-dark">$1'420.000</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-outline-dark rounded-3 px-3" style={{ fontSize: '0.75rem' }}>
                                            Detalles
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="p-5 text-center bg-white">
                        <div className="opacity-25 mb-3">
                            <i className="bi bi-clipboard-x-fill display-4"></i>
                        </div>
                        <h6 className="fw-bold text-muted">No hay pedidos registrados en A&P</h6>
                        <p className="small text-muted">Tus compras de lubricantes y filtros aparecerán aquí.</p>
                    </div>

                </div>
            </div>

            <style>{`
                .form-control:disabled { background-color: transparent !important; opacity: 1; cursor: default; padding-left: 0; }
                .form-control:focus { box-shadow: none; border-bottom: 2px solid #F5A623 !important; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </div>

    );
}

export default ProfilePage;