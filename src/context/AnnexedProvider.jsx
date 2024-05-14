import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const AnnexedContext = createContext();

export const AnnexedProvider = ({ children }) => {
  const [annexedData, setAnnexedData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateData = async () => {
    if (!annexedData._id) {
      setLoading(false);
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    updateData();
    setUpdate(false);
  }, [annexedData._id, annexedData.annexedNumber, update]);

  return (
    <AnnexedContext.Provider
      value={{ annexedData, setAnnexedData, setUpdate, loading }}
    >
      {children}
    </AnnexedContext.Provider>
  );
};

export default AnnexedContext;
