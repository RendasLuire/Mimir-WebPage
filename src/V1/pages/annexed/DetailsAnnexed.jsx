import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import useAnnexed from "../../hooks/useAnnexed";
import { useParams } from "react-router-dom";
import moment from "moment";
import BarInfoAnnexed from "../../Components/annexed/BarInfoAnnexed";

moment.locale("es-mx");

const DetailsAnnexed = () => {
  const { id } = useParams();
  const { annexedData, setAnnexedData, loading } = useAnnexed({});

  useEffect(() => {
    setAnnexedData({ _id: id });
  }, [id, setAnnexedData]);

  return (
    <div className="content m-1">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : !annexedData.number ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="m-3">
            <BarInfoAnnexed />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsAnnexed;
