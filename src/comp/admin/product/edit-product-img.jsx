function EditProductImages({ fetchProducts }) {

    const closeModal = () => {
        document.querySelector(".editProductImgModal").style.display = "none"
    }

    // Edit Images function -->

    const editImages = async () => {
        const formData = new FormData()

        const messBox = document.getElementById("edit-img-message")
        const proId = document.getElementById("edit-pro-img-id").value
        const imgOne = document.getElementById("edit-pro-img1").files[0]
        const imgTwo = document.getElementById("edit-pro-img2").files[0]
        const imgThree = document.getElementById("edit-pro-img3").files[0]
        const imgFour = document.getElementById("edit-pro-img4").files[0]

        if (!imgOne || !imgTwo || !imgThree || !imgFour) {
            messBox.innerHTML = "Please choose all images!"
            return
        }

        formData.append("id", proId)
        formData.append("photos", imgOne)
        formData.append("photos", imgTwo)
        formData.append("photos", imgThree)
        formData.append("photos", imgFour)

        try {
            const res = await fetch(`/api/update-pro-img`, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            messBox.innerHTML = data.message
            if (data.message === "Updation successful") {
                fetchProducts()
            }
        } catch (e) {
            messBox.innerHTML = "Internal server error occured!"
        }
    }

    return (
        <>
            <div className="container admin-modal editProductImgModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Product Images</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="my-flex">
                                <div className="m-2">
                                    <h5>Choose Images</h5>
                                    <input type="file" id="edit-pro-img1" accept="image/*" />
                                    <input type="file" id="edit-pro-img2" accept="image/*" />
                                    <input type="file" id="edit-pro-img3" accept="image/*" />
                                    <input type="file" id="edit-pro-img4" accept="image/*" />
                                    <input type="hidden" id="edit-pro-img-id" />
                                </div>
                                <p id="edit-img-message" className="message"></p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={editImages} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProductImages