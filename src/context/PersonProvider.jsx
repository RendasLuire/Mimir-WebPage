import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const [personData, setPersonData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateData = async () => {
    if (!personData._id) {
      setLoading(false);
      return false;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return false;
      }

      const request = await fetch(Global.url + "persons/" + personData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      setPersonData(data);
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
  }, [personData._id, personData.name, update]);

  return (
    <PersonContext.Provider
      value={{ personData, setPersonData, setUpdate, loading }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContext;
