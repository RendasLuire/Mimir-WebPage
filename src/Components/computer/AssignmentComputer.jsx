import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useComputer from "../../hooks/useComputer";
import { useEffect } from "react";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentComputer = () => {
  const { computerInfo } = useComputer();
  const { userId } = computerInfo;

  useEffect(() => {}, [computerInfo]);

  return (
    <div className="container glass">
      {userId === "unassigned" ? <SearchPersonToAssingnment /> : ""}
    </div>
  );
};

export default AssignmentComputer;
