import { useEffect } from "react";
import usePerson from "../../hooks/usePerson";
import SearchPersonToAssing from "./SearchPersonToAssing";
import ShowAssignmentInfo from "./ShowAssignmentInfo";

const AssignmentPersonManager = () => {
  const { personInfo } = usePerson();

  useEffect(() => {}, [personInfo]);

  const managerId =
    personInfo && personInfo.manager ? personInfo.manager.id : "Sin asignar";

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
