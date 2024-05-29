import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useDevice from "../../hooks/useDevice";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentDevice = () => {
  const { deviceData } = useDevice();
  const { person } = deviceData;

  useEffect(() => {}, [deviceData]);

  return (
    <div className="container">
      {person.id !== "available" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssingnment />
      )}
    </div>
  );
};

export default AssignmentDevice;
