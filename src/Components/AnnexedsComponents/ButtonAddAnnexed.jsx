import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AnnexedForm from './AnnexedForm';

const ButtonAddAnnexed = () => {
  return (
    <div className="card shadow p-3">
        <div className="container">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#AnnexedModal"><AddCircleOutlineOutlinedIcon /> </button>
            <AnnexedForm />
        </div>
    </div>
  )
}

export default ButtonAddAnnexed
