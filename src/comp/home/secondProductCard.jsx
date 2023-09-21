import { React, useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import EcomContext from '../context/e-com-context';
import SlideHeader from './slideHeader';

const SecondProductSlide = (props) => {

    const [infinite, setInfinite] = useState(false)

    const settings = {
        dots: false,
        infinite: infinite,
        speed: 300,
        slidesToShow: 4,
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
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        ]
    }

    const { secondSlideData, fetchSecondSlide, shortProductDesc } = useContext(EcomContext)

    useEffect(() => {
        shortProductDesc()
        if (secondSlideData.length >= 5) {
            setInfinite(true)
        } else {
            setInfinite(false)
        }
    }, [secondSlideData])

    return (
        <>
            <SlideHeader cardTitle="Top Selling" fetchFunc={fetchSecondSlide} />
            <div className="section pro-section">
                <div className="container">
                    <div className="row">

                        {/* <!-- Products tab & slick --> */}
                        <div className="col-md-12">
                            <div className="row">
                                <div className="products-tabs">
                                    {/* <!-- tab --> */}
                                    <div id="tab1 firstSlide" className="tab-pane active">
                                        <div className="products-slick slide-container" data-nav="#slick-nav-1">
                                            <Slider {...settings}>
                                                {/* <!-- product --> */}
                                                {secondSlideData.map((element, i) => (
                                                    <div key={i} className="pro-container">
                                                        <div className="product" style={{ marginRight: "10px !important" }}>
                                                            <div className="product-img">
                                                                <img src={`${import.meta.env.VITE_SERVER_URL}read-pro-img/${element.img[0]}`} alt="" />
                                                                <div className="product-label">
                                                                    <span className="sale">-30%</span>
                                                                    <span className="new">NEW</span>
                                                                </div>
                                                            </div>
                                                            <div className="product-body">
                                                                <h3 className="product-name"><a href="#">{element.name}</a></h3>
                                                                <h4 className="product-price d-inline">₹{element.price}
                                                                    {/* <del className="product-old-price">$990.00</del> */}
                                                                </h4>
                                                                <div className="product-rating d-inline">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                </div>
                                                                <div className="product-desc d-inline">
                                                                    {element.desc}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* <!-- product --> */}
                                            </Slider>
                                        </div>
                                        <div id="slick-nav-1" className="products-slick-nav"></div>
                                    </div>
                                    {/* <!-- /tab --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Products tab & slick --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
        </>
    );
};



export default SecondProductSlide;
