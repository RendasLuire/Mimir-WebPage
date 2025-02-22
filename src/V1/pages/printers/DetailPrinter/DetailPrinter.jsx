import { useParams } from "react-router-dom";
import useDevice from "../../../hooks/useDevice";
import "./DetailPrinter.css";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
const DetailPrinter = () => {
  const { id } = useParams();
  const { setDeviceData, loading } = useDevice({});

  useEffect(() => {
    setDeviceData({ _id: id });
  }, [id, setDeviceData]);

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid-container">
          <div className="grid-item device"></div>
          <div className="grid-item user"></div>
          <div className="grid-item network"></div>
          <div className="grid-item comments"></div>
        </div>
      )}
    </div>
  );
};

export default DetailPrinter;
