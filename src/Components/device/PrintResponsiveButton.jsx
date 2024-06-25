import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import PrintIcon from "@mui/icons-material/Print";

const PrintResponsiveButton = ({ validationResponsive }) => {
  const { deviceData } = useDevice();

  const handleCreateResponsiva = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}reports/responsiveCSM/${deviceData._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const blob = await request.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className={`btn ${
        validationResponsive ? "btn-outline-primary" : "btn-outline-secondary"
      }`}
      disabled={!validationResponsive}
      onClick={handleCreateResponsiva}
    >
      <PrintIcon />
    </button>
  );
};

export default PrintResponsiveButton;
