import usePerson from "../../hooks/usePerson";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import BarInfoPerson from "../../Components/person/BarInfoPerson";

const DetailsPerson = () => {
  const { personData, setPersonData, loading } = usePerson();
  const { id } = useParams();

  useEffect(() => {
    setPersonData({ _id: id });
  }, [id, setPersonData]);

  return (
    <div className="content m-1">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : !personData.name ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="m-1">
            <BarInfoPerson />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPerson;
