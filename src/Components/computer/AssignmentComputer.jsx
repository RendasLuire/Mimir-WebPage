import SearchPersonToAssingnment from "./SearchPersonToAssingnment";
import useComputer from "../../hooks/useComputer";
import { useEffect } from "react";

const AssignmentComputer = () => {
  const { computerInfo } = useComputer();

  useEffect(() => {}, [computerInfo]);

  return (
    <div className="container glass">
      {!computerInfo.user ? <SearchPersonToAssingnment /> : <h5>Asignado</h5>}
    </div>
  );
};

export default AssignmentComputer;
