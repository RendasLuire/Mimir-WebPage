import { useState } from "react";
import SearchPersonToAssingnment from "./SearchPersonToAssingnment";

const AssignmentComputer = ({ user }) => {
  const [userId, setUserId] = useState(user);

  const handleSelectUser = (id) => {
    setUserId(id);
  };

  return (
    <div className="container glass">
      {!userId ? (
        <SearchPersonToAssingnment handleSelectUser={handleSelectUser} />
      ) : (
        <h5>Asignado</h5>
      )}
    </div>
  );
};

export default AssignmentComputer;
