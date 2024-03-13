import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UserForm from './UserForm';


const ButtonAddUser = () => {
  return (
    <div className="card shadow p-3">
        <div className="container">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#UserModal"><AddCircleOutlineOutlinedIcon /> </button>
            <UserForm />
        </div>
    </div>
  )
}

export default ButtonAddUser
