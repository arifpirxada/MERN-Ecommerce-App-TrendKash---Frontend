import { useEffect, useState } from "react";
import AddCat from "./addcat";

function Cats() {

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    return (
        <>
            <AddCat fetchCats={fetchCats}/>
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {catData.map((element, index) => (
                        <div key={index} className="card cat-admin-card">
                            <div className="card-body">
                                <h5 className="card-title">{element.catName}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Id: {element._id}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Navigation: {element.navigation === 1 ? "Yes" : "No"}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Slide: {element.slideTop === 1 ? "Yes" : "No"}</h6>
                                <button to="#" className="btn btn-primary card-link cat-admin-link m-2">Edit</button>
                                <button to="#" className="btn btn-danger card-link cat-admin-link m-2">Delete</button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default Cats