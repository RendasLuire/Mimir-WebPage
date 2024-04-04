const InfoComputer = ({ computer }) => {
  const { hostname, model, user, brand, serialNumber, status, type } = computer;
  return (
    <div className="countainer m-2">
      <form>
        <div className="mb-1">
          <label className="form-label" htmlFor="hostname">
            Hostname:
          </label>
          <input
            className="form-control"
            type="text"
            name="hostname"
            id="hostname"
            value={hostname}
            disabled
          />
        </div>
        <div className="mb-1">
          <label type="text" htmlFor="brand" className="form-label">
            Brand:
          </label>
          <input
            className="form-control"
            type="text"
            name="brand"
            id="brand"
            value={brand}
            disabled
          />
        </div>
        <div className="mb-1">
          <label type="text" htmlFor="model" className="form-label">
            Model:
          </label>
          <input
            className="form-control"
            type="text"
            name="model"
            id="model"
            value={model}
            disabled
          />
        </div>
        <div className="mb-1">
          <label htmlFor="serialNumber" className="form-label">
            Serial Number:
          </label>
          <input
            className="form-control"
            type="text"
            name="serialNumber"
            id="serialNumber"
            value={serialNumber}
            disabled
          />
        </div>
        <div className="mb-1">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <input
            className="form-control"
            type="text"
            name="status"
            id="status"
            value={status}
            disabled
          />
        </div>
        <div className="mb-1">
          <label htmlFor="user" className="form-label">
            User:
          </label>
          <input
            className="form-control"
            type="text"
            name="user"
            id="user"
            value={user}
            disabled
          />
        </div>
      </form>
    </div>
  );
};

export default InfoComputer;
