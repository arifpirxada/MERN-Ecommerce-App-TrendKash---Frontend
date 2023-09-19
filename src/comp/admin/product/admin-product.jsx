import { useEffect, useState } from "react"
import AddProduct from "./add-product"
import EditProduct from "./edit-product"
import ViewProduct from "./view-product"
import EditProductImages from "./edit-product-img"

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

    // To open view modal

    const [productData, setProductData] = useState()
    const openViewModal = async (e) => {
        document.querySelector(".viewProductModal").style.display = "block"
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro/${e.target.parentNode.parentNode.children[3].value}`)
        const data = await res.json()
        setProductData(data)
    }

    // Open modal for editing images of product

    const openEditImgModal = (e) => {
        document.querySelector(".editProductImgModal").style.display = "block"
        /* Setting id value in hidden input of edit-img-modal 
        to edit images of selected product */
        document.getElementById("edit-pro-img-id").value = e.target.parentNode.parentNode.children[3].value
    }

    // Delete Product Here -->

    const delProduct = async (e) => {
        try {
            const delId = e.target.parentNode.parentNode.children[3].value
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}delete-pro`, {
                method: "DELETE",
                body: JSON.stringify({ id: delId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.message === "Deletion successful") {
                fetchProducts()
            } else {
                alert(data.message)
            }
        } catch (e) {
            alert("Some error occured")
        }
    }

    return (
        <>
            <AddProduct fetchProducts={fetchProducts} />
            <ViewProduct productData={productData} />
            <EditProduct fetchProducts={fetchProducts} productData={productData} />
            <EditProductImages fetchProducts={fetchProducts} />
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {(proData.length !== 0) ? "" : <div className="no-data">
                        No Products Found
                    </div>}
                    {proData.map((element, i) => (
                        <div key={i} className="card cat-admin-card">
                            <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${element.img[0]}`} className="card-img-top m-2" alt="..." style={{ width: "18rem" }} />
                            <div className="card-body my-flex">
                                <h5 className="card-title">{element.name}</h5>
                                <p>{element.desc.slice(0, 50)}</p>
                                <p>Price: ₹{element.price}</p>
                                <input type="hidden" value={element._id} />
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <button onClick={openEditImgModal} className="btn btn-warning m-2 r-2">Images</button>
                                    <button onClick={delProduct} className="btn btn-danger m-2 r-2">Delete</button>
                                </div>
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <button onClick={openViewModal} className="btn btn-warning m-2 r-2">View</button>
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