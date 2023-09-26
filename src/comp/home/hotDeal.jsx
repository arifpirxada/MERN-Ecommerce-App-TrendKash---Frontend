import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function HotDeal(props) {

    // Fetch Deals ->

    const [dealData, setDealData] = useState()

    const fetchDeal = async () => {
        try {
            const res = await fetch("/api/read-deal")
            const data = await res.json()
            setDealData(data)
        } catch (e) {
            console.error("Deal fetch Error")
        }
    }

    useEffect(() => {
        fetchDeal()
    }, [])

    // Get difference of deal ending date and now ->

    var timeInterval;

    const dateDiff = async (index, endDt, delId) => {
        const now = new Date()
        const endDate = new Date(endDt)
        const diff = (endDate - now) / 1000

        if (diff < 0) {
            try {
                const req = await fetch(`/api/delete-deal`, {
                    method: "DELETE",
                    body: JSON.stringify({ id: delId }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const res = await req.json()
                
                if (res.message === "Deletion successful") {
                    fetchDeal()
                    clearInterval(timeInterval)
                } else {
                    console.error(data.message)
                }
            } catch (e) {
                console.error("Error deleting deal")
            }
            return
        }

        const days = Math.floor(diff / (3600 * 24))
        const hours = Math.floor(diff / 3600 % 24)
        const minutes = Math.floor((diff / 60) % 60)
        const seconds = Math.floor(diff % 60)

        document.getElementById(`days${index}`).innerHTML = days
        document.getElementById(`hours${index}`).innerHTML = hours
        document.getElementById(`minutes${index}`).innerHTML = minutes
        document.getElementById(`seconds${index}`).innerHTML = seconds
    }

    useEffect(() => {
        if (dealData) {
            timeInterval = setInterval(() => {
                dealData.map((element, i) => {
                    dateDiff(i, element.endDate, element._id)
                })
            }, 1000);
        }
    }, [dealData])


    return (
        <>
            {dealData && dealData.map((element, i) => (
                <div key={i} id="hot-deal" style={{
                    backgroundImage: `URL(/api/read-deal-img/${element.img}`, backgroundSize: "cover", backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                }} className="section">
                    <div className="container">
                        <div style={{ marginRight: "0px" }} className="row">
                            <div className="col-md-12">
                                <div className="hot-deal">
                                    <ul className="hot-deal-countdown">
                                        <li>
                                            <div>
                                                <h3 id={`days${i}`}>02</h3>
                                                <span>Days</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <h3 id={`hours${i}`}>10</h3>
                                                <span>Hours</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <h3 id={`minutes${i}`}>34</h3>
                                                <span>Mins</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <h3 id={`seconds${i}`}>60</h3>
                                                <span>Secs</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <h2 className="text-uppercase">{element.name}</h2>
                                    <p>{element.offer}</p>
                                    <Link className="primary-btn cta-btn" onClick={() => { document.getElementById("top-header").scrollIntoView({ behavior: "smooth" }) }} to={`/store/${element.cat}`}>Shop now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {dealData && <img src={`/api/read-deal-img/${dealData[0].img}`} id="hot-deal-img" alt="deal image" />} */}
                </div>
            ))}

        </>
    )
}


export default HotDeal