import { useContext } from "react";
import AnnexedContext from "../context/AnnexedProvider";

const useAnnexed = () => {
  return useContext(AnnexedContext);
};

export default useAnnexed;
