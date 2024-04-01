const UserForm = () => {


  return (
    <div className='modal fade' id="UserModal" aria-labelledby="ModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add User</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className='mb-3'>
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" placeholder="Name"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Deparment</label>
                  <input type="text" className="form-control" placeholder="Deparment"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <input type="text" className="form-control" placeholder="Position" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Manager</label>
                  <input type="text" className="form-control" placeholder="Manager" />
                </div>
                <div className="mb-3">
                  <label className="form-label">ManagerPosition</label>
                  <input type="text" className="form-control" placeholder="ManagerPosition" />
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

export default UserForm
