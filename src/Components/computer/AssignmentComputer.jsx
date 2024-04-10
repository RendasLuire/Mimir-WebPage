import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useComputer from "../../hooks/useComputer";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentComputer = () => {
  const { computerInfo } = useComputer();

  useEffect(() => {}, [computerInfo]);

  return (
    <div className="container glass">
      {!computerInfo.user ? (
        <SearchPersonToAssingnment />
      ) : (
        <ShowAssignmentInfo />
      )}
    </div>
  );
};

export default AssignmentComputer;
