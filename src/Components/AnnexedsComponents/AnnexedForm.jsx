const AnnexedForm = () => {
  return (
    <div className="modal fade" id="AnnexedModal" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="AnnexedModalLabel" >Add Annexed</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">DateInit</label>
                            <input type="date" className="form-control" placeholder="DateInit" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">DateEnd</label>
                            <input type="date" className="form-control" placeholder="DateEnd" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnnexedForm
