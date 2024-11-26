import React from "react";

const FilterBarDevice = () => {
  return (
    <div className="d-flex flex-wrap justify-content-start align-items-center">
      <div className="m-2">
        <label className="form-label" htmlFor="status">
          Estatus
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          aria-label="Status"
        >
          <option value="">Seleccionar estatus</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div className="m-2">
        <label className="form-label" htmlFor="bussinesUnit">
          Unidad de Negocio
        </label>
        <select
          className="form-select"
          id="bussinesUnit"
          name="bussinesUnit"
          aria-label="Unidad de negocio"
        >
          <option value="">Seleccionar unidad de negocio</option>
          <option value="unidad1">Unidad 1</option>
          <option value="unidad2">Unidad 2</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBarDevice;
