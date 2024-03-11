const InputSearch = () => {
  return (
    <div className="card shadow p-3">
      <div className="container">
        <form className="d-flex col-md-8" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}

export default InputSearch
