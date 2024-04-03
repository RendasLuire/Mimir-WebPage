import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";

const CardComputer = ({ hostname, type }) => {
  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };

  const icon = iconMap[type] || null;

  return (
    <div className="card glass m-3 d-flex flex-column justify-content-center align-items-center">
      {icon && <div className="glass m-2">{icon}</div>}
      <div className="card-body">
        <h5 className="card-title text-center">Hostname: {hostname}</h5>
        <p className=""></p>
      </div>
    </div>
  );
};

export default CardComputer;
