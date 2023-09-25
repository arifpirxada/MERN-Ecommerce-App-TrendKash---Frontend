import { useEffect, useState } from "react";
import AddCat from "./addcat";
import EditCat from "./editcat";

function Cats() {

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


    // function to open modal with existing category values for editing

    const openEditModal = (e) => {
        document.querySelector(".editCatModal").style.display = "block"
        const editArr = e.target.parentNode.children
        document.getElementById("edit-catname").value = editArr[0].innerHTML
        document.getElementById("edit-cat-id").value = editArr[1].innerHTML.slice(4)
        if (editArr[2].innerHTML.slice(12) === "Yes") {
            document.getElementById("edit-navigation").checked = true
        } else {
            document.getElementById("edit-navigation").checked = false
        }
        if (editArr[3].innerHTML.slice(7) === "Yes") {
            document.getElementById("edit-slide").checked = true
        } else {
            document.getElementById("edit-slide").checked = false
        }
        if (editArr[4].innerHTML.slice(14) === "Yes") {
            document.getElementById("edit-group-slider").checked = true
        } else {
            document.getElementById("edit-group-slider").checked = false
        }
    }

    // Function to delete Categories

    const deleteCategory = async (e) => {
        const delId = e.target.parentNode.children[1].innerHTML.slice(4)

        const delCategoryData = {
            id: delId
        }

        const req = await fetch(`/api/delete-cat`, {
            method: "DELETE",
            body: JSON.stringify(delCategoryData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        if (res.message === "Deletion successful") {
            fetchCats()
        } else {
            alert(res.message)
        }
    }

    return (
        <>
            <AddCat fetchCats={fetchCats} />
            <EditCat fetchCats={fetchCats} />
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {catData.map((element, index) => (
                        <div key={index} className="card cat-admin-card">
                            <div className="card-body">
                                <h5 className="card-title">{element.catName}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Id: {element._id}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Navigation: {element.navigation === 1 ? "Yes" : "No"}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Slide: {element.slideTop === 1 ? "Yes" : "No"}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Group slider: {element.groupSlider === 1 ? "Yes" : "No"}</h6>
                                <button onClick={openEditModal} className="btn btn-primary card-link cat-admin-link m-2 r-2">Edit</button>
                                <button onClick={deleteCategory} className="btn btn-danger card-link cat-admin-link m-2 r-2">Delete</button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default Cats