import { useContext } from "react";
import PersonContex from "../context/PersonProvider";

const usePerson = () => {
  return useContext(PersonContex);
};

export default usePerson;
