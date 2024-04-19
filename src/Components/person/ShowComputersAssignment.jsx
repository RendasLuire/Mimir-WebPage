import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import CardComputer from "../computer/CardComputer";
import { CircularProgress } from "@mui/material";

const ShowComputersAssignment = () => {
  const [computers, setComputers] = useState([]);
  const { personInfo } = usePerson();
  const [loading, setLoading] = useState(true);

  const getComputers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personInfo._id) {
        return false;
      }

      const request = await fetch(
        Global.url + "persons/assigned/" + personInfo._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      const { computers } = response.data;

      setComputers(computers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComputers();
  }, [computers]);

  return (
    <div className="container glass mt-3">
      <div className="container glass mt-3 mb-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {computers.length > 1 ? (
              computers.map((item) => (
                <div key={item._id} className="col">
                  <CardComputer computer={item} />
                </div>
              ))
            ) : (
              <div className="d-flex text-center">
                <p>No abemus computers</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowComputersAssignment;
