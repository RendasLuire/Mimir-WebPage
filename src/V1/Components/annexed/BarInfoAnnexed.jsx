import { TextSnippetOutlined } from "@mui/icons-material";
import useAnnexed from "../../hooks/useAnnexed";
import moment from "moment";
import EditAnnexedInfoCard from "./EditAnnexedInfoCard";
import { useEffect } from "react";
import LoadDevicesCard from "./LoadDevicesCard";

const BarInfoAnnexed = () => {
  const { annexedData } = useAnnexed({});

  useEffect(() => {}, [annexedData]);

  return (
    <div className="card glass">
      <div className="row g-0 align-items-center">
        <div className="col-auto text-center m-3">
          <div className="img-fluid rounded-start">
            <TextSnippetOutlined sx={{ width: 100, height: 100 }} />
          </div>
        </div>
        <div className="col-auto">
          <div className="card-body">
            <h5 className="card-title">
              {annexedData.number} : {annexedData.bill}
            </h5>
            <p className="card-text">
              {moment(annexedData.startDate).format("L")}
            </p>
            <p className="card-text">
              {moment(annexedData.endDate).format("L")}
            </p>
          </div>
        </div>
        <div className="col-auto m-3">
          <LoadDevicesCard />
        </div>
        <div className="col-auto m-3">
          <EditAnnexedInfoCard />
        </div>
      </div>
    </div>
  );
};

export default BarInfoAnnexed;
