import { React, useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import EcomContext from '../context/e-com-context';
import SlideHeader from './slideHeader';
import { Link } from 'react-router-dom';

const FirstProductCard = () => {

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
            breakpoint: 350,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        ]
    }

    const { firstSlideData, fetchFirstSlide, calcAvgRating } = useContext(EcomContext)

    useEffect(() => {
        if (firstSlideData && firstSlideData.length >= 5) {
            setInfinite(true)
        } else {
            setInfinite(false)
        }
    }, [firstSlideData])

    return (
        <>
            <SlideHeader cardTitle="New Products" fetchFunc={ fetchFirstSlide } fetchArg={ "FirstTop" } />
            <div className="section pro-section">
                <div className="container">
                    <div className="row">

                        {/* <!-- Products tab & slick --> */ }
                        <div className="col-md-12">
                            <div className="row">
                                <div className="products-tabs">
                                    {/* <!-- tab --> */ }
                                    <div id="tab1 firstSlide" className="tab-pane active">
                                        <div className="products-slick slide-container min-400" data-nav="#slick-nav-1">
                                            <Slider { ...settings }>
                                                {/* <!-- product --> */ }
                                                { firstSlideData ? firstSlideData.map((element, i) => (
                                                    <div key={ i } className="pro-container">
                                                        <div className="product" style={ { marginRight: "10px !important" } }>
                                                            <div className="product-img">
                                                                <img src={ `/api/read-pro-img/${element.img[0]}` } alt="" />
                                                                <div className="product-label">
                                                                    { element.disPercentage && <span className="sale">{ `-${element.disPercentage}%` }</span> }
                                                                    <span className="new">NEW</span>
                                                                </div>
                                                            </div>
                                                            <div className="product-body">
                                                                <h3 className="product-name"><Link onClick={ () => { window.scrollTo(0, 140) } } to={ `/product/${element._id}` }>{ element.name }</Link></h3>
                                                                <h4 className="product-price d-inline">₹{ element.price }
                                                                    <del className="product-old-price" style={ { marginLeft: "3px" } }>{ element.oldPrice && `₹${element.oldPrice}` }</del>
                                                                </h4>
                                                                { (element.ratings.length > 0) ?
                                                                    <div className="product-rating">
                                                                        <p className="d-inline f-5 mr-1" id={ `rate${i}` } >{ calcAvgRating(element.ratings) }</p>
                                                                        <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 1 ? "" : "-o"}` }></i>
                                                                        <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 2 ? "" : "-o"}` }></i>
                                                                        <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 3 ? "" : "-o"}` }></i>
                                                                        <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 4 ? "" : "-o"}` }></i>
                                                                        <i className={ `fa fa-star${calcAvgRating(element.ratings) == 5 ? "" : "-o"}` }></i>
                                                                    </div> : "" }
                                                                <div className="product-desc d-inline">
                                                                    { element.desc.length > 0 ? `${element.desc.slice(0, 45)}...` : "" }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <div className="container text-center mtb-2">
                                                    <img src="../img/Spinner.gif" width={ 50 } alt="Loading..." />
                                                </div> }
                                                {/* <!-- product --> */ }
                                            </Slider>
                                        </div>
                                        <div id="slick-nav-1" className="products-slick-nav"></div>
                                    </div>
                                    {/* <!-- /tab --> */ }
                                </div>
                            </div>
                        </div>
                        {/* <!-- Products tab & slick --> */ }
                    </div>
                    {/* <!-- /row --> */ }
                </div>
                {/* <!-- /container --> */ }
            </div>
        </>
    );
};



export default FirstProductCard;
