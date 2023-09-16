function AdminProduct() {
    return (
        <>
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    <div className="card cat-admin-card">
                        <img src="img\product03.png" className="card-img-top" alt="..." style={{ width: "18rem" }} />
                        <div className="card-body my-flex">
                            <h5 className="card-title">Card title</h5>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-primary m-2 edit-product-btn">Edit</button>
                                <button className="btn btn-danger m-2">Delete</button>
                            </div>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-warning m-2">Edit Images</button>
                                <button className="btn btn-warning m-2">View</button>
                            </div>
                        </div>
                    </div>
                    <div className="card cat-admin-card">
                        <img src="img\product03.png" className="card-img-top" alt="..." style={{ width: "18rem" }} />
                        <div className="card-body my-flex">
                            <h5 className="card-title">Card title</h5>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-primary m-2 edit-product-btn">Edit</button>
                                <button className="btn btn-danger m-2">Delete</button>
                            </div>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-warning m-2">Edit Images</button>
                                <button className="btn btn-warning m-2">View</button>
                            </div>
                        </div>
                    </div>
                    <div className="card cat-admin-card">
                        <img src="img\product03.png" className="card-img-top" alt="..." style={{ width: "18rem" }} />
                        <div className="card-body my-flex">
                            <h5 className="card-title">Card title</h5>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-primary m-2 edit-product-btn">Edit</button>
                                <button className="btn btn-danger m-2">Delete</button>
                            </div>
                            <div className="my-flex" style={{ flexDirection: "row" }}>
                                <button className="btn btn-warning m-2">Edit Images</button>
                                <button className="btn btn-warning m-2">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct