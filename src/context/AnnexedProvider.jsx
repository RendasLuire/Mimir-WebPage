import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const AnnexedContext = createContext();

export const AnnexedProvider = ({ children }) => {
  const [annexedData, setAnnexedData] = useState({});
  const [update, setUpdate] = useState(false);

  const updateData = async () => {
    if (!annexedData._id) {
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      const request = await fetch(Global.url + "annexeds/" + annexedData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const response = await request.json();
      const { data } = response;

      setAnnexedData(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    updateData();
    setUpdate(false);
  }, [annexedData, update]);

  return (
    <AnnexedContext.Provider value={{ annexedData, setAnnexedData, setUpdate }}>
      {children}
    </AnnexedContext.Provider>
  );
};

export default AnnexedContext;
