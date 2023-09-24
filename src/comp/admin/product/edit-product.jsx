import { useEffect, useState } from "react"

function EditProduct({ fetchProducts, productData, setProductData }) {

    const closeModal = () => {
        document.querySelector(".editProductModal").style.display = "none"
    }


    // To fetch Cats

    const [catData, setCatData] = useState([])

    const fetchCats = async () => {
        const res = await fetch(`/api/cat-read-admin`)
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
    const removeDetail = () => {
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
    const removeKeywords = () => {
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
    const removeCategorie = () => {
        const updatedCategories = [...productCategories]
        updatedCategories.pop()
        setProductCategories(updatedCategories)
    }


    // To add and remove size ->

    const [sizeArr, setSizeArr] = useState([])

    const addSize = () => {
        setSizeArr([...sizeArr, ""])
    }

    const delSize = () => {
        const updatedSizeArr = [...sizeArr]
        updatedSizeArr.pop()
        setSizeArr(updatedSizeArr)
    }

    // To add and remove Color ->

    const [colorArr, setColorArr] = useState([])

    const addColor = () => {
        setColorArr([...colorArr, ""])
    }

    const delColor = () => {
        const updatedColorArr = [...colorArr]
        updatedColorArr.pop()
        setColorArr(updatedColorArr)
    }

    // To get the actual product data

    useEffect(() => {
        if (productData) {
            productData.details && setProductDetails(productData.details)
            productData.keywords && setProductKeywords(productData.keywords)
            productData.cat && setProductCategories(productData.cat)
            productData.size && setSizeArr(productData.size)
            productData.color && setColorArr(productData.color)
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
        const oldPrice = document.getElementById("edit-pro-oldPrice").value
        const disPercentage = document.getElementById("edit-pro-disPercentage").value

        const keywordData = []
        productKeywords.map((_, index) => {
            keywordData.push(document.getElementById(`edit-keyword${index}`).value)
        })

        const categoryData = []
        productCategories.map((_, index) => {
            categoryData.push(document.getElementById(`edit-cat${index}`).value)
        })

        const sizeData = []
        sizeArr.map((_, index) => {
            sizeData.push(document.getElementById(`edit-size${index}`).value)
        })

        const colorData = []
        colorArr.map((_, index) => {
            colorData.push(document.getElementById(`edit-color${index}`).value)
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
            cat: categoryData,
            size: sizeData,
            color: colorData,
            disPercentage: disPercentage,
            oldPrice: oldPrice
        }

        const res = await fetch(`/api/update-pro`, {
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

    // Handle Changes ->

    const handleName = (e) => {
        const updatedData = { ...productData }
        updatedData.name = e.target.value
        setProductData(updatedData)
    }
    const handleDesc = (e) => {
        const updatedData = { ...productData }
        updatedData.desc = e.target.value
        setProductData(updatedData)
    }
    const handleKey = (e) => {
        const updatedData = { ...productData }
        updatedData.details[e.target.id.slice(8)].key = e.target.value
        setProductData(updatedData)
    }
    const handleValue = (e) => {
        const updatedData = { ...productData }
        updatedData.details[e.target.id.slice(10)].value = e.target.value
        setProductData(updatedData)
    }
    const handlePrice = (e) => {
        const updatedData = { ...productData }
        updatedData.price = e.target.value
        setProductData(updatedData)
    }
    const handleOldprice = (e) => {
        const updatedData = { ...productData }
        updatedData.oldPrice = e.target.value
        setProductData(updatedData)
    }
    const handleStock = (e) => {
        const updatedData = { ...productData }
        updatedData.stock = e.target.value
        setProductData(updatedData)
    }
    const handleDispercentage = (e) => {
        const updatedData = { ...productData }
        updatedData.disPercentage = e.target.value
        setProductData(updatedData)
    }
    const handleBrand = (e) => {
        const updatedData = { ...productData }
        updatedData.brand = e.target.value
        setProductData(updatedData)
    }
    const handleSize = (e) => {
        const updatedData = { ...productData }
        updatedData.size[e.target.id.slice(9)] = e.target.value
        setProductData(updatedData)
    }
    const handleColor = (e) => {
        const updatedData = { ...productData }
        updatedData.color[e.target.id.slice(10)] = e.target.value
        setProductData(updatedData)
    }
    const handleKeyword = (e) => {
        const updatedData = { ...productData }
        updatedData.keywords[e.target.id.slice(12)] = e.target.value
        setProductData(updatedData)
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
                        {productData && <div className="modal-body">
                            {/* Form to edit Product */}

                            <div>
                                <div className="m-2">
                                    <label htmlFor="edit-pro-name" className="form-label">*&nbsp;Name</label>
                                    <input value={productData.name} onChange={handleName} type="text" className="form-control" id="edit-pro-name" />
                                </div>
                                <div className="m-2">
                                    <label htmlFor="edit-pro-desc" className="form-label">*&nbsp;Description</label>
                                    <textarea value={productData.desc} onChange={handleDesc} className="form-control" id="edit-pro-desc" rows="2"></textarea>
                                </div>

                                {/* div for details */}
                                <div className="detail-container m-2">
                                    <h5 className="mt-2">*&nbsp;Details</h5>
                                    <div className="detail-head d-flex" style={{ justifyContent: "end" }}>
                                        <button onClick={addDetail} className="btn btn-primary m-2">Add Row</button>
                                        <button onClick={removeDetail} className="btn btn-danger m-2">Delete Row</button>
                                    </div>
                                    {productDetails.map((element, index) => (
                                        <div key={index} className="detail-item m-2 d-flex">
                                            <div className="key-contain d-flex">
                                                <label htmlFor={`edit-key${index}`}>Key</label>
                                                <input value={element.key} onChange={handleKey} className="m-2 form-control" type="text" id={`edit-key${index}`} />
                                            </div>
                                            <div className="value-contain d-flex">
                                                <label htmlFor={`edit-value${index}`}>Value</label>
                                                <input value={element.value} onChange={handleValue} className="m-2 form-control" type="text" id={`edit-value${index}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex mt-2" style={{ flexWrap: "wrap" }}>
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-price" className="mt-2">Price</label>
                                    <input value={productData.price === null ? "" : productData.price} onChange={handlePrice} className="form-control m-2 mt-2" type="number" id="edit-pro-price" />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-oldPrice" className="mt-2">Old&nbsp;Price</label>
                                    <input value={productData.oldPrice === null ? "" : productData.oldPrice} onChange={handleOldprice} className="form-control m-2 mt-2" type="number" id="edit-pro-oldPrice" />
                                </div>
                            </div>

                            <div className="d-flex mt-2" style={{ flexWrap: "wrap" }}>
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-stock" className="mt-2">Stock</label>
                                    <input value={productData.stock === null ? "" : productData.stock} onChange={handleStock} className="form-control m-2 mt-2" type="number" id="edit-pro-stock" />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="edit-pro-disPercentage" className="mt-2">Discount&nbsp;Percentage</label>
                                    <input value={productData.disPercentage === null ? "" : productData.disPercentage} onChange={handleDispercentage} className="form-control m-2 mt-2" type="number" id="edit-pro-disPercentage" />
                                </div>
                            </div>

                            <div className="d-flex m-2 mt-2">
                                <label htmlFor="edit-pro-brand">*&nbsp;Brand</label>
                                <input value={productData.brand} onChange={handleBrand} className="form-control m-2" type="text" id="edit-pro-brand" />
                            </div>

                            <div className="m-2 mt-2">
                                <h5>*&nbsp;Size (optional)</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addSize} className="btn btn-primary m-2">Add Size</button>
                                    <button onClick={delSize} className="btn btn-danger m-2">Delete Size</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {sizeArr.map((element, index) => (
                                        <input key={index} value={element} onChange={handleSize} className="form-control m-2" type="text" id={`edit-size${index}`} style={{ width: "40%" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="m-2 mt-2">
                                <h5>*&nbsp;Color (optional)</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addColor} className="btn btn-primary m-2">Add Color</button>
                                    <button onClick={delColor} className="btn btn-danger m-2">Delete Color</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {colorArr.map((element, index) => (
                                        <input key={index} value={element} onChange={handleColor} className="form-control m-2" type="text" id={`edit-color${index}`} style={{ width: "40%" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="keywords-contain m-2 mt-2">
                                <h5>*&nbsp;Keywords</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addKeywords} className="btn btn-primary m-2">Add Keyword</button>
                                    <button onClick={removeKeywords} className="btn btn-danger m-2">Delete Keyword</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {productKeywords.map((element, index) => (
                                        <input value={element} key={index} onChange={handleKeyword} className="form-control m-2" type="text" id={`edit-keyword${index}`} style={{ width: "40%" }} />
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
                                    {productCategories.map((element, index) => (
                                        <select key={index} id={`edit-cat${index}`} className="form-select m-2" aria-label="Default select example" style={{ width: "40%" }}>
                                            <option value={element}>{element}</option>
                                            {catData.map((element, index) => (
                                                <option key={index} value={element.catName} >{element.catName}</option>
                                            ))}
                                        </select>
                                    ))}
                                </div>
                            </div>
                            <p id="edit-pro-message" className="message" ></p>
                        </div>}
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