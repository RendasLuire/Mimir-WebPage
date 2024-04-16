import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import CardComputer from "../computer/CardComputer";

const ShowComputersAssignment = () => {
  const [computers, setComputers] = useState([]);
  const { personInfo } = usePerson();

  const getComputers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
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

    const { data } = response;
    if (!data.computers) {
      setComputers(data.computers);
    }
  };

  useEffect(() => {
    getComputers();
  }, []);

  return (
    <div className="container glass mt-3">
      <div className="container glass mt-3 mb-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {computers ? (
            computers.map((item) => (
              <div key={item._id} className="col">
                <CardComputer computer={item} />
              </div>
            ))
          ) : (
            <p>No abemus computers</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowComputersAssignment;
