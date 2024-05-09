import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const [personData, setPersonData] = useState({});
  const [update, setUpdate] = useState(false);

  const updateData = async () => {
    if (!personData._id) {
      return false;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
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
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    updateData();
    setUpdate(false);
  }, [personData, update]);

  return (
    <PersonContext.Provider value={{ personData, setPersonData, setUpdate }}>
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContext;
