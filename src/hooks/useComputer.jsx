import { useContext } from "react";
import ComputerContext from "../context/ComputerProvider";

const useComputer = () => {
  return useContext(ComputerContext);
};

export default useComputer;
