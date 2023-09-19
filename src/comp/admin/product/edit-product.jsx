import { useEffect, useState } from "react"

function EditProduct({ fetchProducts, productData }) {

    const closeModal = () => {
        document.querySelector(".editProductModal").style.display = "none"
    }


    // To fetch Cats

    const [catData, setCatData] = useState([])

    const fetchCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    // Script for Details ->

    const [productDetails, setProductDetails] = useState([])

    // Function to add a new detail row
    const addDetail = () => {
        setProductDetails([...productDetails, { key: "", value: "" }])
    }

    // Function to remove a detail row by index
    const removeDetail = (index) => {
        const updatedDetails = [...productDetails]
        updatedDetails.pop()
        setProductDetails(updatedDetails)
    }


    // Script for Keyword ->

    const [productKeywords, setProductKeywords] = useState([])

    // Function to add a new Keyword box
    const addKeywords = () => {
        setProductKeywords([...productKeywords, ""])
    }

    // Function to remove a keyword box
    const removeKeywords = (index) => {
        const updatedKeywords = [...productKeywords]
        updatedKeywords.pop()
        setProductKeywords(updatedKeywords)
    }

    // Script for Categories ->

    const [productCategories, setProductCategories] = useState([])

    // Function to add a new categorie box
    const addCategorie = () => {
        setProductCategories([...productCategories, ""])
    }

    // Function to remove a categorie box
    const removeCategorie = (index) => {
        const updatedCategories = [...productCategories]
        updatedCategories.pop()
        setProductCategories(updatedCategories)
    }

    // To get the actual product data

    useEffect(() => {
        if (productData) {
            productData.details && setProductDetails(productData.details)
            productData.keywords && setProductKeywords(productData.keywords)
            productData.cat && setProductCategories(productData.cat)
        } else {
            setProductDetails([])
            setProductKeywords([])
            setProductCategories([])
        }
    }, [productData])


    // Update Product Here -->

    const updateProduct = async () => {

        const messBox = document.getElementById("edit-pro-message")
        const proName = document.getElementById("edit-pro-name").value
        const proDesc = document.getElementById("edit-pro-desc").value
        const detailData = []
        productDetails.map((_, index) => {
            detailData.push({
                key: document.getElementById(`edit-key${index}`).value,
                value: document.getElementById(`edit-value${index}`).value
            })
        })

        const price = document.getElementById("edit-pro-price").value
        const stock = document.getElementById("edit-pro-stock").value
        const brand = document.getElementById("edit-pro-brand").value

        const keywordData = []
        productKeywords.map((_, index) => {
            keywordData.push(document.getElementById(`edit-keyword${index}`).value)
        })

        const categoryData = []
        productCategories.map((_, index) => {
            categoryData.push(document.getElementById(`edit-cat${index}`).value)
        })

        const updateProductData = {
            id: productData._id,
            name: proName,
            desc: proDesc,
            details: detailData,
            price: price,
            stock: stock,
            brand: brand,
            keywords: keywordData,
            cat: categoryData
        }

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}update-pro`, {
            method: 'PATCH',
            body: JSON.stringify(updateProductData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()

        messBox.innerHTML = data.message
        if (data.message === "Updation successful") {
            fetchProducts()
        }
    }

    return (
        <>
            <div className="container admin-modal editProductModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form to edit Product */}

                            <div>
                                <div className="m-2">
                                    <label htmlFor="edit-pro-name" className="form-label">*&nbsp;Name</label>
                                    <input defaultValue={productData && productData.name} type="text" className="form-control" id="edit-pro-name" />
                                </div>
                                <div className="m-2">
                                    <label htmlFor="edit-pro-desc" className="form-label">*&nbsp;Description</label>
                                    <textarea defaultValue={productData && productData.desc} className="form-control" id="edit-pro-desc" rows="2"></textarea>
                                </div>

                                {/* div for details */}
                                <div className="detail-container m-2">
                                    <h5 className="mt-2">*&nbsp;Details</h5>
                                    <div className="detail-head d-flex" style={{ justifyContent: "end" }}>
                                        <button onClick={addDetail} className="btn btn-primary m-2">Add Row</button>
                                        <button onClick={removeDetail} className="btn btn-danger m-2">Delete Row</button>
                                    </div>
                                    {productData && productDetails.map((element, index) => (
                                        <div key={index} className="detail-item m-2 d-flex">
                                            <div className="key-contain d-flex">
                                                <label htmlFor={`edit-key${index}`}>Key</label>
                                                <input defaultValue={element.key} className="m-2 form-control" type="text" id={`edit-key${index}`} />
                                            </div>
                                            <div className="value-contain d-flex">
                                                <label htmlFor={`edit-value${index}`}>Value</label>
                                                <input defaultValue={element.value} className="m-2 form-control" type="text" id={`edit-value${index}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex mt-2">
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-price" className="mt-2">Price</label>
                                    <input defaultValue={productData && productData.price} className="form-control m-2 mt-2" type="number" id="edit-pro-price" />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-stock" className="mt-2">Stock</label>
                                    <input defaultValue={productData && productData.stock} className="form-control m-2 mt-2" type="number" id="edit-pro-stock" />
                                </div>
                            </div>

                            <div className="d-flex m-2 mt-2">
                                <label htmlFor="edit-pro-brand">*&nbsp;Brand</label>
                                <input defaultValue={productData && productData.brand} className="form-control m-2" type="text" id="edit-pro-brand" />
                            </div>

                            <div className="keywords-contain m-2 mt-2">
                                <h5>*&nbsp;Keywords</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addKeywords} className="btn btn-primary m-2">Add Keyword</button>
                                    <button onClick={removeKeywords} className="btn btn-danger m-2">Delete Keyword</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {productData && productKeywords.map((element, index) => (
                                        <input defaultValue={element} key={index} className="form-control m-2" type="text" id={`edit-keyword${index}`} style={{ width: "40%" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="category-contain m-2 mt-2">
                                <h5>*&nbsp;Categories</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addCategorie} className="btn btn-primary m-2">Add Category</button>
                                    <button onClick={removeCategorie} className="btn btn-danger m-2">Delete Category</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {productData && productCategories.map((element, index) => (
                                        <select key={index} id={`edit-cat${index}`} className="form-select m-2" aria-label="Default select example" style={{ width: "40%" }}>
                                            <option value={element}>{element}</option>
                                            {catData.map((element, index) => (
                                                <option key={index} defaultValue={element.catName}>{element.catName}</option>
                                            ))}
                                        </select>
                                    ))}
                                </div>
                            </div>
                            <p id="edit-pro-message" className="message" ></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={updateProduct} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct