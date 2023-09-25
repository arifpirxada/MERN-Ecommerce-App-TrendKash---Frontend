import { useEffect } from 'react';

function AddCat({ fetchCats }) {

    const addCategory = async () => {
        const messageBox = document.getElementById("catMesBox")
        const name = document.getElementById("catname").value
        var navigation = 0
        var slide = 0
        var groupSlider = 0
        if (document.getElementById("navigation").checked) {
            navigation = 1
        }
        if (document.getElementById("slide").checked) {
            slide = 1
        }

        if (document.getElementById("group-slider").checked) {
            groupSlider = 1
        }

        const categoryData = {
            name: name,
            navi: navigation,
            slide: slide,
            groupSlider: groupSlider
        }

        const req = await fetch(`/api/create-cat`, {
            method: "POST",
            body: JSON.stringify(categoryData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        messageBox.innerHTML = res.message
        if (res.message === "Insertion successful") {
            fetchCats()
        }
    }

    const closeModal = () => {
        document.querySelector(".addCatModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal addCatModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="catname" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="catname" />
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="navigation" />
                                    <label className="form-check-label m-2" htmlFor="navigation">Keep on navigation</label>
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="slide" />
                                    <label className="form-check-label m-2" htmlFor="slide">Keep on slide</label>
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="group-slider" />
                                    <label className="form-check-label m-2" htmlFor="group-slider">Keep products in group slider</label>
                                </div>
                            </div>
                            <p id="catMesBox"></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={addCategory} type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCat