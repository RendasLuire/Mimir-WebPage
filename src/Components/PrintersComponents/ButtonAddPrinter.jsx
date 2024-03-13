import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PrinterForm from './PrinterForm'

const ButtonAddPrinter = () => {
  return (
    <div className="card shadow p-3">
        <div className="container">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#PrinterModal"><AddCircleOutlineOutlinedIcon /> </button>
            <PrinterForm />
        </div>
    </div>
  )
}

export default ButtonAddPrinter
