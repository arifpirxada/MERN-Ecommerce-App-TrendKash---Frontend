function ViewProduct({ productData }) {

    const closeModal = () => {
        document.querySelector(".viewProductModal").style.display = "none"
    }

    // Open Modal to edit a product 

    const openEditModal = () => {
        document.querySelector(".editProductModal").style.display = "block"
        document.querySelector(".viewProductModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal viewProductModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {productData && <div className="view-contain">
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${productData.img[0]}`} className="card-img-top m-2" alt="..." style={{ width: "22rem" }} />
                                    <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${productData.img[1]}`} className="card-img-top m-2" alt="..." style={{ width: "22rem" }} />
                                    <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${productData.img[2]}`} className="card-img-top m-2" alt="..." style={{ width: "22rem" }} />
                                    <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${productData.img[3]}`} className="card-img-top m-2" alt="..." style={{ width: "22rem" }} />
                                </div>

                                <div className="m-2 pr-view mt-2"><p className="view-head" >_id: </p>{productData._id}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head" >Name: </p>{productData.name}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head" >Description: </p>{productData.desc}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head" >Details: </p>{productData.details.map((element, i) => (
                                    <div key={i} className="ml-2">
                                        <div className="d-inline">{element.key}: </div>
                                        <div className="d-inline">{element.value}</div>
                                    </div>
                                ))}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Price: </p>₹{productData.price}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Stock: </p>{productData.stock}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Brand: </p>{productData.brand}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Ratings: </p>{productData.price}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Old Price: </p>{productData.oldPrice}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Discount Percentage: </p>{productData.disPercentage}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Keywords: </p>{productData.keywords.map((element, i) => (
                                    <div key={i} className="ml-2 d-inline">
                                        {element}
                                    </div>
                                ))}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Categories: </p>{productData.cat.map((element, i) => (
                                    <div key={i} className="ml-2 d-inline">
                                        {element}
                                    </div>
                                ))}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Size: </p>{productData.size.map((element, i) => (
                                    <div key={i} className="ml-2 d-inline">
                                        {element}
                                    </div>
                                ))}</div><hr className="ad-hr" />
                                <div className="m-2 pr-view"><p className="view-head">Color: </p>{productData.color.map((element, i) => (
                                    <div key={i} className="ml-2 d-inline">
                                        {element}
                                    </div>
                                ))}</div><hr className="ad-hr" />
                            </div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={openEditModal} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct