import { useEffect } from "react";
import usePerson from "../../hooks/usePerson";
import SearchPersonToAssing from "./SearchPersonToAssing";

const AssignmentPersonManager = () => {
  const { personInfo } = usePerson();

  useEffect(() => {}, [personInfo]);

  return (
    <div className="container glass">
      {personInfo?.manager !== "" ? (
        <p>tiene manager</p>
      ) : (
        <SearchPersonToAssing />
      )}
    </div>
  );
};

export default AssignmentPersonManager;
