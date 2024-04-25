import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useDevice from "../../hooks/useDevice";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentDevice = () => {
  const { deviceInfo } = useDevice();
  const { user } = deviceInfo;

  useEffect(() => {}, [deviceInfo]);

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
