import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useComputer from "../../hooks/useComputer";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentComputer = () => {
  const { computerInfo } = useComputer();
  const { userId } = computerInfo;

  useEffect(() => {
    console.log("Computer Info changed:", computerInfo);
  }, [computerInfo]);

  return (
    <div className="container glass">
      {computerInfo.userId !== "unassigned" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssingnment />
      )}
    </div>
  );
};

export default AssignmentComputer;
