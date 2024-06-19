import { useEffect } from "react";
import usePerson from "../../hooks/usePerson";
import SearchPersonToAssing from "./SearchPersonToAssing";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentPersonManager = () => {
  const { personData } = usePerson();

  useEffect(() => {}, [personData]);

  return (
    <div className="container glass">
      {personData.manager.name !== "unassigned" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssing />
      )}
    </div>
  );
};

export default AssignmentPersonManager;
