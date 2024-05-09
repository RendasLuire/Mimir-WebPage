import { useEffect } from "react";
import usePerson from "../../hooks/usePerson";
import SearchPersonToAssing from "./SearchPersonToAssing";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentPersonManager = () => {
  const { personData } = usePerson();

  useEffect(() => {}, [personData]);

  const managerId =
    personData && personData.manager ? personData.manager.id : "Sin asignar";

  return (
    <div className="container glass">
      {managerId !== "Sin asignar" ? (
        <ShowAssignmentInfo />
      ) : (
        <SearchPersonToAssing />
      )}
    </div>
  );
};

export default AssignmentPersonManager;
