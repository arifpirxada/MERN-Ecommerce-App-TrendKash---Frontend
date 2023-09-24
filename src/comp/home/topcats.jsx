import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Topcats = () => {

    const [catData, setCatData] = useState([])
    const [infinite, setInfinite] = useState(false)

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`/api/read-head-cat`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    useEffect(() => {
        if (catData.length >= 4) {
            setInfinite(true)
        } else {
            setInfinite(false)
        }
    }, [catData])


    const settings = {
        dots: false,
        infinite: infinite,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        ]
    }

    return (
        <>
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <Slider {...settings}>
                            {catData.map((element, i) => (
                                <div key={i} className="col-md-3 col-xs-6">
                                    <div className="shop">
                                        <div className="shop-img">
                                            <img src={`/api/read-head-img/${element.catImg}`} alt="" />
                                        </div>
                                        <div className="shop-body">
                                            <h3>{element.catName}<br />Collection</h3>
                                            <Link to={`/store/${element.catName}`} className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>

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
