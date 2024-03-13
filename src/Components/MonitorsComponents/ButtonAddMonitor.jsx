import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UserForm from '../UsersComponents/UserForm';

const ButtonAddMonitor = () => {
  return (
    <div className="card shadow p-3">
        <div className="conteiner">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#MonitorModal"><AddCircleOutlineOutlinedIcon /> </button>
            <UserForm />
        </div>
    </div>
  )
}

export default ButtonAddMonitor
