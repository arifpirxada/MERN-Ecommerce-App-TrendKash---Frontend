import { useEffect, useState } from "react"
import AddProduct from "./add-product"
import EditProduct from "./edit-product"

function AdminProduct() {

    // Read Product Data

    const [proData, setProData] = useState([])

    const fetchProducts = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro-half`)
        const data = await res.json()
        setProData(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <AddProduct fetchProducts={fetchProducts} />
            <EditProduct />
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {proData.map((element, i) => (
                        <div key={i} className="card cat-admin-card">
                            <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${element.img[0]}`} className="card-img-top" alt="..." style={{ width: "18rem" }} />
                            <div className="card-body my-flex">
                                <h5 className="card-title">{element.name}</h5>
                                <p>{element.desc.slice(0, 50)}</p>
                                <p>Price: ₹{element.price}</p>
                                <input type="hidden" value={element._id} />
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <button className="btn btn-primary m-2 edit-product-btn r-2">Edit</button>
                                    <button className="btn btn-danger m-2 r-2">Delete</button>
                                </div>
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <button className="btn btn-warning m-2 r-2">Images</button>
                                    <button className="btn btn-warning m-2 r-2">View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminProduct