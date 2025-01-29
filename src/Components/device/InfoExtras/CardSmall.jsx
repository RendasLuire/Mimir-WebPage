import React, { useState } from "react";

const CardSmall = ({ icon: Icon, date, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const [isActive, setIsActive] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onEdit({ date: tempDate, isActive });
  };

  return (
    <div className="card">
      {!isEditing ? (
        <div className="card-body">
          <button
            type="button"
            className="btn btn-success icon"
            onClick={() => setIsEditing(true)}
          >
            <Icon sx={{ fontSize: 50 }} />
          </button>
        </div>
      ) : (
        <div className="card-body">
          <input
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            className="form-control mb-2"
          />
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isActive">
              Activo
            </label>
          </div>
        </div>
      )}
      <div className="card-footer d-flex justify-content-between align-items-center">
        {!isEditing && <span>{date}</span>}
        {isEditing && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSmall;
