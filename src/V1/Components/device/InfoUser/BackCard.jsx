import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Pagination } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Global from "../../../helpers/Global";

const BackCard = ({
  setIsFlipped,
  setMessage,
  setOpen,
  setUpdate,
  userData,
  device,
}) => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 5;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCancel = () => {
    setMessage("Cambios cancelado.");
    setOpen(true);
    setIsFlipped(false);
  };

  const handleUnnasingClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(`${Global.url}device/unassing/${device}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await request.json();

      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectClick = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !device) {
        return false;
      }

      const messageUpdate = {
        idPerson: item._id,
        idDevice: device,
      };

      const request = await fetch(`${Global.url}device/resignDevice/`, {
        method: "POST",
        body: JSON.stringify(messageUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await request.json();

      setUpdate(true);
      setIsFlipped(false);
    } catch (error) {
      setMessage("Error" + error);
      setOpen(true);
    }
  };

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons?page=${currentPage}&limit=${usersPerPage}&search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const response = await request.json();
      const { data, pagination } = response;

      setPersons(data);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
  }, [search, currentPage]);

  return (
    <div className="card">
      <div className="card-header">
        <ListItem disablePadding>
          <ListItemButton onDoubleClick={handleUnnasingClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary={userData?.name ? userData?.name : "Nombre"}
              secondary={userData?.position ? userData?.position : "Puesto"}
            />
          </ListItemButton>
        </ListItem>
      </div>
      <div className="card-body">
        <TextField
          id="filled-search"
          label="Buscar usuario"
          type="search"
          variant="filled"
          value={search}
          onChange={handleInputChange}
        />
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            color="primary"
            onChange={handleChangePage}
            size="small"
          />
        </div>
        <List>
          {persons?.map((user) => (
            <ListItem key={user.id}>
              <ListItemButton onClick={() => handleSelectClick(user)}>
                <ListItemText primary={user.name} secondary={user.position} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="card-footer btn-group">
        <button className="btn btn-danger" type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default BackCard;
