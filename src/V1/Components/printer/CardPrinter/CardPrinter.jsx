import PropTypes from "prop-types";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import { capitalizeFirstLetterOfEachWord } from "../../../helpers/Tools";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Global from "../../../helpers/Global";
import { useEffect, useState } from "react";
import "./CardPrinter.css";

moment.locale("es-mx");

const CardDevice = ({ printer }) => {
  const [loading, setLoading] = useState(true);
  const {
    _id,
    hostname,
    model,
    network,
    brand,
    status,
    typeDevice,
    monitor,
    serialNumber,
  } = printer;
  const [listSettings, setListSettings] = useState([]);

  const getStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(`${Global.url}settings/statusDevice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        if (request.status === 404) {
          console.warn("Endpoint not found (404)");
        } else {
          console.error(`API error: ${request.status}`);
        }
        return;
      }
      setLoading(false);

      const response = await request.json();
      const { data } = response;
      setListSettings(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [printer]);

  const getColorAndLabel = (statusValue) => {
    const status = listSettings.find((item) => item.value === statusValue);
    return status
      ? { color: status.option, label: status.label }
      : { color: "#F44336", label: "Desconocido" };
  };

  const { color, label } = getColorAndLabel(status.value);

  const icon = <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />;

  return (
    <Link
      to={`/inventory/printers/v2/details/${_id}`}
      className="card device-card m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
    >
      <div className="mx-2 icon">{icon}</div>
      <div className="position-absolute top-0 start-0">
        {loading ? (
          <Tooltip title={"loading"} arrow>
            <CircleIcon sx={{ color: "grey" }} />
          </Tooltip>
        ) : (
          <Tooltip title={label} arrow>
            <CircleIcon sx={{ color }} />
          </Tooltip>
        )}
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{hostname.toUpperCase()}</h5>
        <p className="card-text">
          {capitalizeFirstLetterOfEachWord(`${brand} ${model}`)}
        </p>
        <p className="card-text">{serialNumber.toUpperCase()}</p>
        <p className="card-text">{network.ip}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            {moment(printer.lastChange).format("LL")}
          </small>
        </p>
      </div>
    </Link>
  );
};

CardDevice.propTypes = {
  device: PropTypes.object.isRequired,
};

export default CardDevice;
