import React, { useEffect } from 'react';


function AddCat() {

    useEffect(() => {
        document.querySelector(".firstNav").addEventListener("click", () => {
            document.querySelector(".addCatModal").style.display = "block"
        })
    }, [])

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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="catname" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="catname" />
                                </div>
                                <div className="m-2 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label m-2" htmlFor="exampleCheck1">Keep on navigation</label>
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
    );
}

export default AddCat