import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useDevice from "../../hooks/useDevice";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentDevice = () => {
  const { deviceData } = useDevice();
  const { user } = deviceData;

  useEffect(() => {}, [deviceData]);

  return (
    <div className="container glass">
      {user.id !== "Sin asignar" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssingnment />
      )}
    </div>
  );
};

export default AssignmentDevice;
