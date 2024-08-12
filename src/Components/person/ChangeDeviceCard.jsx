import CachedIcon from "@mui/icons-material/Cached";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import { useState } from "react";

const ChangeDeviceCard = () => {
  const { personData } = usePerson();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 6;

  const getDevicesAssign = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personData._id) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons/assigned/${personData._id}?page=${currentPage}&limit=${devicesPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
    } catch (error) {}
  };
  return (
    <div className="card glass">
      <div
        className="card-body text-center"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#ChangeDeviceModal"
      >
        <CachedIcon sx={{ fontSize: 50 }} />
      </div>
      <div
        className="modal fade"
        id="ChangeDeviceModal"
        tabIndex={"-1"}
        aria-labelledby="ChangeDeviceModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Cambio de equipos</h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="card col">
                  <h5 className="card-title text-center">Equipo Actual</h5>
                  <div className="card-body"></div>
                </div>
                <div className="d-flex justify-content-center align-items-center mx-3">
                  <SyncAltIcon sx={{ fontSize: 50 }} />
                </div>
                <div className="card col">
                  <h5 className="card-title text-center">Equipo Nuevo</h5>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeDeviceCard;
