import { useEffect, useState } from "react"

const Topcats = () => {

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
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {catData.map((element, i) => (
                            <div key={i} className="col-md-4 col-xs-6">
                                <div className="shop">
                                    <div className="shop-img">
                                        <img src={`${import.meta.env.VITE_SERVER_URL}read-head-img/${element.catImg}`} alt="" />
                                    </div>
                                    <div className="shop-body">
                                        <h3>{element.catName}<br />Collection</h3>
                                        <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* Section */}
        </>
    );
}


export default Topcats;
