import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ComputerForm from './ComputerForm';

const ButtonAddComputer = () => {
  return (
    <div className="card shadow p-3">
        <div className="container">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#ComputerModal"><AddCircleOutlineOutlinedIcon /> </button>
            <ComputerForm />
        </div>
    </div>
  )
}

export default ButtonAddComputer
