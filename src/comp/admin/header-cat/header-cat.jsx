import { useEffect, useState } from "react"

function HeaderCat() {

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-head-cat`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    return (
        <>
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {catData.map((element, index) => (
                        <div key={index} className="card cat-admin-card">
                            <img src={`${import.meta.env.VITE_SERVER_URL}read-head-img/${element.catImg}`} className="card-img-top" alt="..." style={{ width: "18rem" }} />
                            <div className="card-body my-flex">
                                <h5 className="card-title">{element.catName}</h5>
                                <input type="hidden" value={element._id}/>
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <button className="btn btn-primary m-2 edit-header-btn">Edit</button>
                                    <button className="btn btn-danger m-2">Delete</button>
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