import { useEffect, useState } from "react"
import AddHeaderCat from "./add-header-cat"

function HeaderCat() {

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`/api/read-head-cat`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])


    // Function to delete head category

    const delHeadCat = async (e) => {
        const delId = e.target.parentNode.children[0].value

        const delCatData = {
            id: delId
        }

        const req = await fetch(`/api/delete-head-cat`, {
            method: "DELETE",
            body: JSON.stringify(delCatData),
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
        <AddHeaderCat fetchReadCats={fetchCats}/>
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {catData.map((element, index) => (
                        <div key={index} className="card cat-admin-card">
                            <img src={`/api/read-head-img/${element.catImg}`} className="card-img-top" alt="..." style={{ width: "18rem" }} />
                            <div className="card-body my-flex">
                                <h5 className="card-title">{element.catName}</h5>
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <input type="hidden" value={element._id} />
                                    <button onClick={delHeadCat} className="btn btn-danger m-2">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default HeaderCat