function ViewContact({ message }) {

    const closeModal = () => {
        document.querySelector(".viewContactModal").style.display = "none"
    }

    return (
        <>
            <div className="container admin-modal viewContactModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="flex">
                                <p className="f-5">Message:</p>
                                <p>{message}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewContact