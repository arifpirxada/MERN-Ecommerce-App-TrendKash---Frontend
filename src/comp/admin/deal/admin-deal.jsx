import { useState, useEffect } from "react"
import AddDeal from "./add-deal"

function AdminDeal() {

    // Fetch Deals ->

    const [dealData, setDealData] = useState([])

    const fetchDeals = async () => {
        const res = await fetch(`/api/read-deal`)
        const data = await res.json()
        setDealData(data)
    }

    useEffect(() => {
        fetchDeals()
    }, [])

    // Delete Deal

    const delDeal = async (e) => {
        const delId = e.target.parentNode.children[0].value

        const delDealData = {
            id: delId
        }
        const req = await fetch(`/api/delete-deal`, {
            method: "DELETE",
            body: JSON.stringify(delDealData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        if (res.message === "Deletion successful") {
            fetchDeals()
        } else {
            alert(res.message)
        }
    }

    return (
        <>
            <AddDeal fetchDeals={fetchDeals} />
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {dealData.map((element) => (
                        <div key={element._id} className="card cat-admin-card">
                            <img src={`/api/read-deal-img/${element.img}`} className="card-img-top" alt="..." style={{ width: "18rem" }} />
                            <div className="card-body my-flex">
                                <h5 className="card-title">{element.name}</h5>
                                <div className="my-flex" style={{ flexDirection: "row" }}>
                                    <input type="hidden" value={element._id} />
                                    <button onClick={delDeal} className="btn btn-danger m-2">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminDeal