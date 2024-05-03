import TextSnippetOutlined from "@mui/icons-material/TextSnippetOutlined";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AnnexedInfo from "../../Components/annexed/AnnexedInfo";
import useAnnexed from "../../hooks/useAnnexed";
import { useParams } from "react-router-dom";
import Global from "../../helpers/Global";
import moment from "moment";
import DeviceInfo from "../../Components/annexed/DevicesInfo";
import AddDevices from "../../Components/annexed/AddDevices";

moment.locale("es-mx");

const DetailsAnnexed = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { annexedData, setAnnexedData } = useAnnexed();

  const getAnnexed = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "annexeds/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const response = await request.json();
      const { data } = response;

      setAnnexedData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnexed();
  }, [annexedData]);

  return (
    <div className="content glass m-1">
      {loading ? (
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
                {annexedData ? (
                  <div className="card-body">
                    <h5 className="card-title">{annexedData.annexedNumber}</h5>
                    <p className="card-text">
                      {moment(annexedData.startDate).format("L")}
                    </p>
                    <p className="card-text">
                      {moment(annexedData.endDate).format("L")}
                    </p>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <CircularProgress />
                  </div>
                )}
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
