import { useEffect } from "react";

function EditCat({fetchCats}) {
    const editCategory = async () => {
        const messageBox = document.getElementById("editCatMesBox")
        const catId = document.getElementById("edit-cat-id").value
        const editCatName =  document.getElementById("edit-catname").value
        var navigation = 0
        var slide = 0

        if (document.getElementById("edit-navigation").checked) {
            navigation = 1
        }
        if (document.getElementById("edit-slide").checked) {
            slide = 1
        }

        const editCategoryData = {
            id: catId,
            catName: editCatName,
            navigation: navigation,
            slideTop: slide
        }

        const req = await fetch(`/api/update-cat`, {
            method: "PATCH",
            body: JSON.stringify(editCategoryData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        messageBox.innerHTML = res.message
        if (res.message === "Updation successful") {
            fetchCats()
        }
    }

    const closeModal = () => {
        document.querySelector(".editCatModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal editCatModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="edit-catname" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="edit-catname" />
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="edit-navigation" />
                                    <label className="form-check-label m-2" htmlFor="edit-navigation">Keep on navigation</label>
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="edit-slide" />
                                    <label className="form-check-label m-2" htmlFor="edit-slide">Keep on slide</label>
                                </div>
                            </div>
                            <input type="hidden" id="edit-cat-id" />
                            <p id="editCatMesBox"></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={editCategory} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCat