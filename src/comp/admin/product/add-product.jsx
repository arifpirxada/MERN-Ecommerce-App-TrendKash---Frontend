import { useEffect, useState } from "react"

function AddProduct({fetchProducts}) {

    const closeModal = () => {
        document.querySelector(".addProductModal").style.display = "none"
    }

    // To add and remove detail rows in modal form ->

    const [detailRows, setDetailRows] = useState([{}])

    const addDetailrow = () => {
        setDetailRows([...detailRows, {}])
    }

    const delDetailRow = () => {
        const updatedRows = [...detailRows]
        updatedRows.pop()
        setDetailRows(updatedRows)
    }

    // To add and remove keywords ->

    const [keywordArr, setKeywordArr] = useState([{}])

    const addkeyword = () => {
        setKeywordArr([...keywordArr, {}])
    }

    const delkeyword = () => {
        const updatedKeywordArr = [...keywordArr]
        updatedKeywordArr.pop()
        setKeywordArr(updatedKeywordArr)
    }

    // To add and remove Categories ->

    const [categoryArr, setCategoryArr] = useState([{}])

    const addCat = () => {
        setCategoryArr([...categoryArr, {}])
    }

    const delCat = () => {
        const updatedCategoryArr = [...categoryArr]
        updatedCategoryArr.pop()
        setCategoryArr(updatedCategoryArr)
    }

    // Insert product into the database ->

    const addProduct = async () => {
        const formData = new FormData()

        const messBox = document.getElementById("pro-message")
        const proName = document.getElementById("pro-name").value
        const proDesc = document.getElementById("pro-desc").value
        const detailData = []
        detailRows.map((_, index) => {
            detailData.push({
                key: document.getElementById(`key${index}`).value,
                value: document.getElementById(`value${index}`).value
            })
        })
        const imgOne = document.getElementById("img1").files[0]
        const imgTwo = document.getElementById("img2").files[0]
        const imgThree = document.getElementById("img3").files[0]
        const imgFour = document.getElementById("img4").files[0]

        const price = document.getElementById("pro-price").value
        const stock = document.getElementById("pro-stock").value
        const brand = document.getElementById("pro-brand").value
        if (proName === "" || proDesc === "" || !imgOne || !imgTwo || !imgThree || !imgFour || price === "" || stock === "" ) {
            messBox.innerHTML = "Please fill all the required fields!"
            return;
        }

        const keywordData = []
        keywordArr.map((_, index) => {
            keywordData.push(document.getElementById(`keyword${index}`).value)
        })

        const categoryData = []
        categoryArr.map((_, index) => {
            categoryData.push(document.getElementById(`cat${index}`).value)
        })

        formData.append("name", proName)
        formData.append("desc", proDesc)
        formData.append("details", JSON.stringify(detailData))
        formData.append("photos", imgOne)
        formData.append("photos", imgTwo)
        formData.append("photos", imgThree)
        formData.append("photos", imgFour)
        formData.append("price", price)
        formData.append("stock", stock)
        formData.append("brand", brand)
        formData.append("keywords", JSON.stringify(keywordData))
        formData.append("cat", JSON.stringify(categoryArr))

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}create-pro`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()

        messBox.innerHTML = data.message
        if (data.message === "Insertion successful") {
            fetchProducts()
        }
    }

    // Fetch Categories

    const [catData, setCatData] = useState([])

    const fetchCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    return (
        <>
            <div className="container admin-modal addProductModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form for Product */}

                            <div>
                                <div className="m-2">
                                    <label htmlFor="pro-name" className="form-label">*&nbsp;Name</label>
                                    <input type="text" className="form-control" id="pro-name" />
                                </div>
                                <div className="m-2">
                                    <label htmlFor="pro-desc" className="form-label">*&nbsp;Description</label>
                                    <textarea className="form-control" id="pro-desc" rows="2"></textarea>
                                </div>

                                {/* div for details */}
                                <div className="detail-container m-2">
                                    <h5 className="mt-2">*&nbsp;Details (optional)</h5>
                                    <div className="detail-head d-flex" style={{ justifyContent: "end" }}>
                                        <button onClick={addDetailrow} className="btn btn-primary m-2">Add Row</button>
                                        <button onClick={delDetailRow} className="btn btn-danger m-2">Delete Row</button>
                                    </div>
                                    {detailRows.map((element, index) => (
                                        <div key={index} className="detail-item m-2 d-flex">
                                            <div className="key-contain d-flex">
                                                <label htmlFor={`key${index}`}>Key</label>
                                                <input className="m-2 form-control" type="text" id={`key${index}`} />
                                            </div>
                                            <div className="value-contain d-flex">
                                                <label htmlFor={`value${index}`}>Value</label>
                                                <input className="m-2 form-control" type="text" id={`value${index}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Photos */}
                            <div className="m-2 mt-2">
                                <h5>*&nbsp;Photos</h5>
                                <input className="m-2" type="file" id="img1" />
                                <input className="m-2" type="file" id="img2" />
                                <input className="m-2" type="file" id="img3" />
                                <input className="m-2" type="file" id="img4" />
                            </div>

                            <div className="d-flex mt-2">
                                <div className="d-flex">
                                    <label htmlFor="pro-price" className="mt-2">Price</label>
                                    <input className="form-control m-2 mt-2" type="number" id="pro-price" />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="pro-stock" className="mt-2">Stock</label>
                                    <input className="form-control m-2 mt-2" type="number" id="pro-stock" />
                                </div>
                            </div>

                            <div className="d-flex m-2 mt-2">
                                <label htmlFor="pro-brand">*&nbsp;Brand&nbsp;(optional)</label>
                                <input className="form-control m-2" type="text" id="pro-brand" />
                            </div>

                            <div className="keywords-contain m-2 mt-2">
                                <h5>*&nbsp;Keywords (optional)</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addkeyword} className="btn btn-primary m-2">Add Keyword</button>
                                    <button onClick={delkeyword} className="btn btn-danger m-2">Delete Keyword</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {keywordArr.map((_, index) => (
                                        <input key={index} className="form-control m-2" type="text" id={`keyword${index}`} style={{ width: "40%" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="category-contain m-2 mt-2">
                                <h5>*&nbsp;Categories (optional)</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addCat} className="btn btn-primary m-2">Add Category</button>
                                    <button onClick={delCat} className="btn btn-danger m-2">Delete Category</button>
                                </div>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {categoryArr.map((_, index) => (
                                        <select key={index} id={`cat${index}`} className="form-select m-2" aria-label="Default select example" style={{ width: "40%" }}>
                                            <option value="default">Select Category</option>
                                            {catData.map((element, index) => (
                                                <option key={index} value={element.catName}>{element.catName}</option>
                                            ))}
                                        </select>
                                    ))}
                                </div>
                            </div>
                            <p id="pro-message" ></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={addProduct} type="button" className="btn btn-primary">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct