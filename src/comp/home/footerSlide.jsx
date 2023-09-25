import { React, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"

function FooterSlide() {

    const settings = {
        infinite: true,
        autoplay: true,
        speed: 300,
        dots: false,
        arrows: true,
    }

    // Fetch group slider categories ->

    const [groupCatData, setGroupCatData] = useState()
    const [productArr, setProductArr] = useState()

    const fetchGroupSliderCats = async () => {
        try {
            const res = await fetch(`/api/cat-read-group-slider`)
            const data = await res.json()
            setGroupCatData(data)
        } catch (e) {
            console.error("Error while fetching group slider cats")
        }
    }

    useEffect(() => {
        fetchGroupSliderCats()
    }, [])

    // Fetch product data according to categories here ->

    const fetchProductData = async () => {
        if (groupCatData) {
            try {
                var updateProArr = []
                for (const element of groupCatData) {
                    const res = await fetch(`/api/read-pro-group-slider/${element.catName}`)
                    const data = await res.json()
                    updateProArr.push(data)
                }
                setProductArr(updateProArr)
            } catch (e) {
                console.error("Error while fetching product array", e)
            }
        }

    }

    useEffect(() => {
        fetchProductData()
    }, [groupCatData])

    return (
        <>
            {/* <!-- SECTION --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {groupCatData && groupCatData.map((element, i) => (
                            <div key={i} className="col-md-4 col-xs-6">
                                <div className="section-title">
                                    <h4 className="title">{element.catName}</h4>
                                    <div className="section-nav">
                                        <div id="slick-nav-3" className="products-slick-nav"></div>
                                    </div>
                                </div>

                                <div className="products-widget-slick" data-nav="#slick-nav-3">
                                    <Slider {...settings}>
                                        <div>
                                            {Array.from({ length: 3 }, (_, index) => (
                                                <div key={index} className="product-widget">
                                                    {(productArr && productArr[i][index]) ? <>
                                                        <div className="product-img">
                                                            <img src={`/api/read-pro-img/${productArr[i][index].img[0]}`} alt="" />
                                                        </div>
                                                        <div className="product-body">
                                                            <p className="product-category">{element.catName}</p>
                                                            <h3 className="product-name"><Link onClick={() => { window.scrollTo(0, 140) }} to={`/product/${productArr[i][index]._id}`}>{productArr[i][index].name}</Link></h3>
                                                            <h4 className="product-price">&#x20B9;{productArr[i][index].price} <del className="product-old-price">&#x20B9;{productArr[i][0].oldPrice}</del></h4>
                                                        </div>
                                                    </> : ""}
                                                </div>
                                            ))}

                                        </div>

                                        {(productArr && productArr[i][i + 3]) ? <div>
                                            {Array.from({ length: 3 }, (_, index) => (
                                                <div key={index} className="product-widget">
                                                    {(productArr && productArr[i][index + 3]) ? <>
                                                        <div className="product-img">
                                                            <img src={`/api/read-pro-img/${productArr[i][index + 3].img[0]}`} alt="" />
                                                        </div>
                                                        <div className="product-body">
                                                            <p className="product-category">{element.catName}</p>
                                                            <h3 className="product-name"><Link onClick={() => { window.scrollTo(0, 140) }} to={`/product/${productArr[i][index + 3]._id}`}>{productArr[i][index + 3].name}</Link></h3>
                                                            <h4 className="product-price">&#x20B9;{productArr[i][index + 3].price} <del className="product-old-price">&#x20B9;{productArr[i][0].oldPrice}</del></h4>
                                                        </div>
                                                    </> : ""}
                                                </div>
                                            ))}

                                        </div> : ""}
                                    </Slider>
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* <!-- /row --> */}
                </div >
                {/* <!-- /container --> */}
            </div >
            {/* <!-- /SECTION --> */}
        </>
    )
}


export default FooterSlide