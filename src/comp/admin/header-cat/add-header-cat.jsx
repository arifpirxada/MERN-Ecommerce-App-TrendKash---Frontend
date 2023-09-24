import { useEffect, useState } from "react"

function AddHeaderCat({fetchReadCats}) {

    const closeModal = () => {
        document.querySelector(".addHeaderCatModal").style.display = "none"
    }

    // To fetch categories for select

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

    // Function to add header categories

    const addHeadCat = async () => {
        const formData = new FormData()

        const messBox = document.getElementById("head-message")
        const name= document.getElementById("head-category").value
        const img = document.getElementById("head-img").files[0]
        
        formData.append("header-img", img)
        formData.append("name", name)

        const res = await fetch(`/api/create-head-cat`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()

        messBox.innerHTML = data.message
        if (data.message === "Insertion successful") {
            fetchReadCats()
        }
    }

    return (
        <>
            <div className="container admin-modal addHeaderCatModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Head Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-flex">
                                <select id="head-category" className="form-select" aria-label="Default select example" style={{marginBottom: "10px"}}>
                                    <option value="default">Open this select menu</option>
                                    {catData.map((element, index) => (
                                        <option key={index} value={element.catName}>{element.catName}</option>
                                    ))}
                                </select>
                                <div className="m-2">
                                    <label htmlFor="head-img">Upload image for Head Category</label>
                                    <input type="file" id="head-img" accept="image/*" />
                                </div>
                                <p id="head-message"></p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button onClick={addHeadCat} type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddHeaderCat