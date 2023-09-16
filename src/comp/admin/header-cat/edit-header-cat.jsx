import { useEffect } from "react"

function EditHeaderCat() {

    useEffect(() => {
        document.querySelectorAll(".edit-header-btn").forEach(element => {
            element.addEventListener("click", () => {
                document.querySelector(".editHeaderCatModal").style.display = "block"
            })
        });
    }, [])

    const closeModal = () => {
        document.querySelector(".editHeaderCatModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal editHeaderCatModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-flex">
                                <div className="m-2">
                                    <label htmlFor="header-img">Upload image for Head Category</label>
                                    <input type="file" id="header-img" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditHeaderCat