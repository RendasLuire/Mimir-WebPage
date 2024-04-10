import { createContext, useState } from "react";
import Global from "../helpers/Global";

const ComputerContext = createContext();

export const ComputerProvider = ({ children }) => {
  const [computerInfo, setComputerInfo] = useState({});

  return (
    <ComputerContext.Provider value={{ computerInfo, setComputerInfo }}>
      {children}
    </ComputerContext.Provider>
  );
};

export default ComputerContext;
