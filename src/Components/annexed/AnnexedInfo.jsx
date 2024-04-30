import { useState } from "react";

const AnnexedInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="container mt-3">
      <div className="glass p-3">
        <div className="mb-1">
          <label htmlFor="annexedNumber" className="form-label">
            Anexo:
          </label>
          <input
            type="text"
            className="form-control"
            name="annexedNumber"
            id="annexedNumber"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="startDate" className="form-label">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            id="startDate"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="endDate" className="form-label">
            Fecha de Termino:
          </label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            id="endDate"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="bill" className="form-label">
            Factura:
          </label>
          <input
            type="text"
            className="form-control"
            name="bill"
            id="bill"
            disabled={!isEditing}
          />
        </div>
        <div className="text-center">
          {isEditing ? (
            <button className="btn btn-primary">Guardar</button>
          ) : (
            <button className="btn btn-primary">Editar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnexedInfo;
