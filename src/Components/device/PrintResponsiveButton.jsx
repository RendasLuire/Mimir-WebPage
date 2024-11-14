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

      let link;
      if (
        deviceData.typeDevice == "desktop" ||
        deviceData.typeDevice == "laptop"
      ) {
        link = `${Global.url}reports-v2/responsivepc/${deviceData._id}`;
      } else {
        link = `${Global.url}reports-v2/responsivePrint/${deviceData._id}`;
      }

      const request = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const blob = await request.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace de descarga temporal
      const a = document.createElement("a");
      a.href = url;
      // Nombre del archivo dinámico
      const fileName = `${deviceData.serialNumber} - ${deviceData.person.name}.pdf`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
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
