const ComputerForm = () => {
  return (
    <div className="modal fade" id="ComputerModal" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="ComputerModalLabel">Add Computer</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Brand</label>
                            <input type="text" className="form-control" placeholder="Brand" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Model</label>
                            <input type="text" className="form-control" placeholder="Model" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Serial Number</label>
                            <input type="text" className="form-control" placeholder="Serial Number" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User</label>
                            <input type="text" className="form-control" placeholder="User" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Annexed</label>
                            <input type="text" className="form-control" placeholder="Annexed" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">HostName</label>
                            <input type="text" className="form-control" placeholder="HostName" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">WareHouse</label>
                            <input type="text" className="form-control" placeholder="WareHouse" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Monitor</label>
                            <input type="text" className="form-control" placeholder="Monitor" />
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

export default ComputerForm
