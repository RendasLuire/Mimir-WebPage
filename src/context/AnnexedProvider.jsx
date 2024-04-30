import { createContext, useState } from "react";

const AnnexedContext = createContext();

export const AnnexedProvider = ({ children }) => {
  const [annexedData, setAnnexedData] = useState({});
  return (
    <AnnexedContext.Provider value={{ annexedData, setAnnexedData }}>
      {children}
    </AnnexedContext.Provider>
  );
};

export default AnnexedContext;
