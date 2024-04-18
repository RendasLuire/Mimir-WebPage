import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import ButtonAddComputer from "../../Components/computer/ButtonAddComputer";
import CardComputer from "../../Components/computer/CardComputer";
import CircularProgress from "@mui/material/CircularProgress";

const InventoryComputers = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getComputers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(Global.url + "computers/listall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        throw new Error("Error al obtener los datos del servidor.");
      }

      const response = await request.json();

      const { computers } = response.data;

      setComputers(computers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComputers();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container glass mt-3">
      <div className="d-flex justify-content-center mt-3 mb-3 glass">
        <div className="col-6">
          <input
            className="form-control m-3"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search"
          />
        </div>
        <div className="m-3">
          <ButtonAddComputer />
        </div>
      </div>
      <div className="container glass mt-3 mb-3">
        <h3>Inventario</h3>
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {computers.map((item) => (
              <div key={item._id} className="col">
                <CardComputer computer={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryComputers;
