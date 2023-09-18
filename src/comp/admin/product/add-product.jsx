import { useEffect, useState } from "react"

function AddProduct() {

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
                                    <h5 className="mt-2">*&nbsp;Details</h5>
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

                                <div className="d-flex">
                                    <div className="d-flex">
                                        <label htmlFor="pro-price" className="mt-2">Price</label>
                                        <input className="form-control m-2 mt-2" type="text" id="pro-price" />
                                    </div>
                                    <div className="d-flex">
                                        <label htmlFor="pro-stock" className="mt-2">Stock</label>
                                        <input className="form-control m-2 mt-2" type="text" id="pro-stock" />
                                    </div>
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

                            <div className="d-flex m-2 mt-2">
                                <label htmlFor="pro-brand">*&nbsp;Brand</label>
                                <input className="form-control m-2" type="text" id="pro-brand" />
                            </div>

                            <div className="keywords-contain m-2 mt-2">
                                <h5>*&nbsp;Keywords</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addkeyword} className="btn btn-primary m-2">Add Keyword</button>
                                    <button onClick={delkeyword} className="btn btn-danger m-2">Delete Keyword</button>
                                </div>
                                <div className="d-flex" style={{flexWrap: "wrap"}}>
                                    {keywordArr.map((_, index) => (
                                        <input key={index} className="form-control m-2" type="text" id={`keyword${index}`} style={{width: "40%"}} />
                                    ))}
                                </div>
                            </div>

                            <div className="category-contain m-2 mt-2">
                                <h5>*&nbsp;Categories</h5>
                                <div className="d-flex" style={{ justifyContent: "end" }}>
                                    <button onClick={addCat} className="btn btn-primary m-2">Add Category</button>
                                    <button onClick={delCat} className="btn btn-danger m-2">Delete Category</button>
                                </div>
                                <div className="d-flex" style={{flexWrap: "wrap"}}>
                                    {categoryArr.map((_, index) => (
                                        <input key={index} className="form-control m-2" type="text" id={`cat${index}`} style={{width: "40%"}} />
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct