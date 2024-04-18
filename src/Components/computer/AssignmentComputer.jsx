import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useComputer from "../../hooks/useComputer";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentComputer = () => {
  const { computerInfo } = useComputer();

  useEffect(() => {}, [computerInfo]);

  return (
    <div className="container glass">
      {computerInfo.userId !== "Sin asignar" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssingnment />
      )}
    </div>
  );
};

export default AssignmentComputer;
