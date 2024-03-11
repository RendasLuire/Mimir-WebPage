import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const AddButton = ({title, content}) => {
    return (
        <div className="card shadow p-3">
            <div className="container">
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#Modal"><AddCircleOutlineOutlinedIcon /> </button>
                <div className='modal fade' id="Modal" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add {title}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {content}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    export default AddButton
    