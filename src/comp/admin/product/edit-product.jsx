import { useEffect } from "react"

function EditProduct() {

    useEffect(() => {
        document.querySelectorAll(".edit-product-btn").forEach(element => {
            element.addEventListener("click", () => {
                document.querySelector(".editProductModal").style.display = "block"
            })
        });
    }, [])

    const closeModal = () => {
        document.querySelector(".editProductModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal editProductModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Head Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-flex">
                                <select id="pro-select" className="form-select" aria-label="Default select example" style={{ marginBottom: "10px" }}>
                                    <option value="default">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <div className="m-2">
                                    <label htmlFor="header-img">Upload image for Head Category</label>
                                    <input type="file" id="header-img" />
                                </div>
                            </form>
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

export default EditProduct