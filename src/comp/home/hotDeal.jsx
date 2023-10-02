import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Slider from "react-slick"

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

    const [countdown, setCountdown] = useState()

    var timeInterval;
    const updateCount = []
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

        updateCount[index] = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        setCountdown([...updateCount])
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

    // Slider Script ->

    const [infinite, setInfinite] = useState(false)

    useEffect(() => {
        if (dealData) {
            if (dealData.length >= 2) {
                setInfinite(true)
            } else {
                setInfinite(false)
            }
        }
    }, [dealData])

    const settings = {
        dots: false,
        infinite: infinite,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
    }


    return (
        <>

            { (dealData && countdown) ?
                <Slider { ...settings }>
                    { dealData.map((element, i) => (
                        <div key={ i }>

                            <div id="hot-deal" style={ {
                                backgroundImage: `URL(/api/read-deal-img/${encodeURIComponent(element.img)}`, backgroundSize: "cover", backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat"
                            } } className="section">
                                <div className="container">
                                    <div style={ { marginRight: "0px" } } className="row">
                                        <div className="col-md-12">
                                            <div className="hot-deal">
                                                { countdown[i] && <ul className="hot-deal-countdown">
                                                    <li>
                                                        <div>
                                                            <h3 id={ `days${i}` }>{ countdown[i].days }</h3>
                                                            <span>Days</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <h3 id={ `hours${i}` }>{ countdown[i].hours }</h3>
                                                            <span>Hours</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <h3 id={ `minutes${i}` }>{ countdown[i].minutes }</h3>
                                                            <span>Mins</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <h3 id={ `seconds${i}` }>{ countdown && countdown[i].seconds }</h3>
                                                            <span>Secs</span>
                                                        </div>
                                                    </li>
                                                </ul> }
                                                <h2 className="text-uppercase">{ element.name }</h2>
                                                <p>{ element.offer }</p>
                                                <Link className="primary-btn cta-btn" onClick={ () => { document.getElementById("top-header").scrollIntoView({ behavior: "smooth" }) } } to={ `/store/${element.cat}` }>Shop now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )) }
                </Slider > : "Loading..."

            }

        </>
    )
}


export default HotDeal