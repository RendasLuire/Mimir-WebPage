import TextSnippetOutlined from "@mui/icons-material/TextSnippetOutlined";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import AnnexedInfo from "../../Components/annexed/AnnexedInfo";
import useAnnexed from "../../hooks/useAnnexed";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeviceInfo from "../../Components/annexed/DevicesInfo";
import AddDevices from "../../Components/annexed/AddDevices";

moment.locale("es-mx");

const DetailsAnnexed = () => {
  const { id } = useParams();
  const { annexedData, setAnnexedData, loading } = useAnnexed({});

  useEffect(() => {
    setAnnexedData({ _id: id });
  }, [id, setAnnexedData]);

  return (
    <div className="content glass m-1">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : !annexedData.annexedNumber ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="card glass m-3">
            <div className="g-0 row">
              <div className="glass col-md-1 m-1">
                <div className="img-fluid rounded-start">
                  <TextSnippetOutlined sx={{ width: 150, height: 150 }} />
                </div>
              </div>
              <div className="col glass m-1">
                <div className="card-body">
                  <h5 className="card-title">{annexedData.annexedNumber}</h5>
                  <p className="card-text">
                    {moment(annexedData.startDate).format("L")}
                  </p>
                  <p className="card-text">
                    {moment(annexedData.endDate).format("L")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass m-3">
            <div className="row g-0">
              <div className="col-md-3 m-1">
                <div className="glass p-3">
                  <AnnexedInfo />
                </div>
              </div>
              <div className="col-md-3 m-1">
                <div className="glass p-3">
                  <AddDevices />
                </div>
              </div>
              <div className="col m-1">
                <div className="glass p-3">
                  <DeviceInfo />
                </div>
              </div>
            </div>
          </div>
          <div className="glass m-3">
            <div className="glass">
              <label className="label">Movimientos</label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsAnnexed;
