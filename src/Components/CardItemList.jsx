const CardItemList = ({title, imagen, paragraph1a, paragraph1b, title2, paragraph2a, paragraph2b}) => {

  return (
    <div className="card mb-3" >
        <div className="row g-0">
            <div className="col-md-2 pt-2 ps-2">
                {imagen}
            </div>
            <div className="col-md-4">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{paragraph1a}</p>
                    <p className="card-text"><small className="text-body-secondary">{paragraph1b}</small></p>
                </div>
            </div>
            <div className="col-md-2">
                <div className="card-body">
                    <h5 className="card-title">{title2}</h5>
                    <p className="card-text">{paragraph2a}</p>
                    <p className="card-text"><small className="text-body-secondary">{paragraph2b}</small></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardItemList
