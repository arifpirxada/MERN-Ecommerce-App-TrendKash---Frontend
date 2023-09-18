import { useEffect } from "react"

function AddDeal({fetchDeals}) {

    const closeModal = () => {
        document.querySelector(".addDealModal").style.display = "none"
    }

    // Function to add Deal

    const addDeal = async () => {
        const formData = new FormData()

        const messBox = document.getElementById("deal-message")
        const name = document.getElementById("dealName").value
        const img = document.getElementById("deal-img").files[0]

        formData.append("deal-img", img)
        formData.append("name", name)

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}create-deal`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()

        messBox.innerHTML = data.message
        if (data.message === "Insertion successful") {
            fetchDeals()
        }
    }

    return (
        <>
            <div className="container admin-modal addDealModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Deal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="dealName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="dealName" />
                                </div>
                                <div className="m-2">
                                    <label htmlFor="deal-img">Upload image for Deal</label>
                                    <input type="file" id="deal-img" accept="image/*" />
                                </div>
                                <p id="deal-message"></p>
                            </div>
                            <p id="catMesBox"></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={addDeal} type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDeal