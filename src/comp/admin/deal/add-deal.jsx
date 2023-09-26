import { useEffect, useState } from "react"

function AddDeal({ fetchDeals }) {

    const closeModal = () => {
        document.querySelector(".addDealModal").style.display = "none"
    }

    // Function to add Deal

    const addDeal = async () => {
        const formData = new FormData()

        const messBox = document.getElementById("deal-message")
        const name = document.getElementById("dealName").value
        const img = document.getElementById("deal-img").files[0]
        const offer = document.getElementById("dealOffer").value
        const cat = document.getElementById("dealCat").value
        const date = document.getElementById("dealDate").value
        const time = document.getElementById("dealTime").value
        const endDate = `${date} ${time}`

        if (name === "" || !img || offer === "" || endDate === "" || time === "") {
            messBox.innerHTML = "Please fill all fields"
            setTimeout(() => {
                messBox.innerHTML = ""
            }, 4000);
            return
        }

        formData.append("deal-img", img)
        formData.append("name", name)
        formData.append("offer", offer)
        formData.append("endDate", endDate)
        formData.append("cat", cat)

        const res = await fetch(`/api/create-deal`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()

        messBox.innerHTML = data.message
        setTimeout(() => {
            messBox.innerHTML = ""
        }, 4000);
        if (data.message === "Insertion successful") {
            fetchDeals()
        }
    }

    // Fetch Categories here ->

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`/api/cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])


    const today = new Date()

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
                                <div className="mb-3">
                                    <label htmlFor="dealOffer" className="form-label mt-2">Offer</label>
                                    <input type="text" className="form-control" id="dealOffer" />
                                </div>
                                <div className="mt-2 text-end">
                                    <input onClick={(e) => { e.target.showPicker() }} type="date" id="dealDate" className="form-control c-pointer" min={`${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`} />
                                    <label onClick={(e) => { e.target.parentNode.parentNode.children[0].showPicker() }} htmlFor="dealDate"><button className="btn btn-success r-2">Select Ending Date</button></label>
                                </div>
                                <div className="mt-2 text-end">
                                    <input onClick={(e) => { e.target.showPicker() }} type="time" className="form-control c-pointer" id="dealTime" />
                                    <label onClick={(e) => { e.target.parentNode.parentNode.children[0].showPicker() }} htmlFor="dealTime" className="form-label"><button className="btn btn-success r-2">Select Ending Time</button></label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dealCat" className="form-label mt-2">Product Category</label>
                                    <select type="text" className="form-control" id="dealCat" >
                                        <option value="">Select Category</option>
                                        {catData && catData.map((element, i) => (
                                            <option key={i} value={element.catName}>{element.catName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="deal-img">Upload image for Deal</label>
                                    <input type="file" id="deal-img" accept="image/*" />
                                </div>
                                <p id="deal-message" className="c-red mt-2 text-center"></p>
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