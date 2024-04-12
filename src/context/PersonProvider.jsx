import { createContext, useState } from "react";

const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const [personInfo, setPersonInfo] = useState({});

  return (
    <PersonContext.Provider value={{ personInfo, setPersonInfo }}>
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContext;
