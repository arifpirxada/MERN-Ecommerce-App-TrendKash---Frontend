import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function SlideHeader({ cardTitle, fetchFunc, fetchArg }) {

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`/api/cat-read-slide`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row">

                        {/* <!-- section title --> */}
                        <div className="col-md-12">
                            <div className="section-title">
                                <h3 className="title">{cardTitle}</h3>
                                <div className="section-nav">
                                    <ul className="section-tab-nav tab-nav">
                                        <li className="active" onClick={() => { fetchFunc(fetchArg) }} ><Link data-toggle="tab" to={`#top`}>Top</Link></li>
                                        {catData.map((element, i) => (
                                            <li key={i} onClick={() => { fetchFunc(element.catName) }} ><Link data-toggle="tab" to={`#${element.catName}`}>{element.catName}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /section title --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
        </>
    )
}



export default SlideHeader