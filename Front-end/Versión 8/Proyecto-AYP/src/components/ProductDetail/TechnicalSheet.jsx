function TechnicalSheet({ especificaciones }) {
  if (!especificaciones || especificaciones.length === 0) {
    return <p className="text-muted small italic">No hay especificaciones técnicas registradas para este modelo.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle border mb-0" style={{ borderRadius: "8px", overflow: "hidden" }}>
        <tbody>
          {especificaciones.map((spec) => (
            <tr key={spec.id}>
              <td className="bg-light fw-bold text-secondary text-capitalize py-2 px-3" style={{ width: "40%", fontSize: "0.88rem" }}>
                {spec.clave}
              </td>
              <td className="text-dark py-2 px-3 fw-semibold" style={{ fontSize: "0.88rem" }}>
                {spec.valor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicalSheet;