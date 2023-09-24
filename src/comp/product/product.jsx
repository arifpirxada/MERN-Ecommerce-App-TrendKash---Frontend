import { React, useEffect, useState, useContext, useRef } from "react"
import Slider from "react-slick"
import { Link, useParams } from "react-router-dom"
import EcomContext from "../context/e-com-context"

function Product() {

    const mainSettings = {
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        autoplay: true,
    }

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        centerPadding: 0,
        vertical: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                vertical: false,
                arrows: false,
                dots: true,
            }
        },
        ]
    }


    const relatedSettings = {
        dots: false,
        infinite: false,
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

    // Fetch Product Data Here

    const [productData, setProductData] = useState()
    const { id } = useParams()

    const fetchProductData = async () => {
        const res = await fetch(`/api/read-pro/${id}`)
        const data = await res.json()
        setProductData(data)
        if (data.message === "Internal server error") {
            alert("Error! Product Not found")
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [id])

    // For related products -> 

    const { relatedProducts, fetchRelatedProducts } = useContext(EcomContext)

    useEffect(() => {
        if (productData) {
            const newCats = productData.cat.filter(item => item !== "FirstTop" && item != "SecondTop")
            fetchRelatedProducts(newCats, id)
        }
    }, [productData])

    const productTabRef = useRef(null)
    const reviewBtnRef = useRef(null)

    const scrollToReviews = () => {
        productTabRef.current.scrollIntoView({ behavior: 'smooth' });
        reviewBtnRef.current.click()
    }

    return (
        <>
            {/* <!-- SECTION --> */}
            {productData && <div className="section" id="pro-section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row" id="product-page">
                        {/* <!-- Product main img --> */}
                        <div className="col-md-5 col-md-push-2 main-container">
                            <div className="img-container" id="product-main-img" >
                                <Slider {...mainSettings} >
                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[0]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[1]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[2]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[3]}`} alt="" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        {/* <!-- /Product main img --> */}

                        {/* <!-- Product thumb imgs --> */}
                        <div className="col-md-2  col-md-pull-5">
                            <div className="thumb-imgs-container" id="product-imgs" >
                                <Slider {...settings} >
                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[0]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[1]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[2]}`} alt="" />
                                    </div>

                                    <div className="product-preview">
                                        <img src={`/api/read-pro-img/${productData.img[3]}`} alt="" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        {/* <!-- /Product thumb imgs --> */}

                        {/* <!-- Product details --> */}
                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">{productData.name}</h2>
                                <div>
                                    {productData.ratings.length > 0 ? <div className="product-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div> : ""}
                                    <Link onClick={scrollToReviews} className="review-link" to="#">{productData.ratings.length} Review(s) | Add your review</Link>
                                </div>
                                <div>
                                    <h3 className="product-price">{`₹${productData.price}`} <del className="product-old-price">{productData.oldPrice > 0 ? `₹${productData.oldPrice}` : ""}</del></h3>
                                    <span className="product-available">{productData.stock > 0 ? "In Stock" : "Not Available"}</span>
                                </div>
                                <p>{productData.desc && productData.desc}</p>

                                <div className="product-options">
                                    {productData.size && <label>
                                        Size
                                        <select className="input-select ml-1">
                                            <option value={productData.size[0]}>{productData.size[0]}</option>
                                            {productData.size.map((element, i) => (
                                                <option key={i} value={element}>{element}</option>
                                            ))}
                                        </select>
                                    </label>}
                                    {productData.color && <label>
                                        Color
                                        <select className="input-select ml-1">
                                            <option value={productData.color[0]}>{productData.color[0]}</option>
                                            {productData.color.map((element, i) => (
                                                <option key={i} value={element}>{element}</option>
                                            ))}
                                        </select>
                                    </label>}
                                    {productData.stock > 0 && <label>
                                        Qty
                                        <select className="input-select ml-1">
                                            <option value={1}>1</option>
                                            {Array.from({ length: productData.stock - 1 }).map((_, index) => (
                                                <option key={index + 2} value={index + 2}>
                                                    {index + 2}
                                                </option>
                                            ))}
                                        </select>
                                    </label>}
                                </div>

                                <div className="add-to-cart pro-sale-btn">
                                    <button className="add-to-cart-btn m-2 r-2"><i className="fa fa-shopping-cart"></i> add to cart</button>
                                    <button className="add-to-cart-btn m-2 r-2"><i className="fa fa-heart-o"></i> Buy Now</button>
                                </div>

                                <ul className="product-links">
                                    <li>Share:</li>
                                    <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-envelope"></i></Link></li>
                                </ul>

                            </div>
                        </div>
                        {/* <!-- /Product details --> */}

                        {/* <!-- Product tab --> */}
                        <div className="col-md-12">
                            <div id="product-tab" ref={productTabRef}>
                                {/* <!-- product tab nav --> */}
                                <ul className="tab-nav">
                                    {/* <li className="active"><Link data-toggle="tab" to="#tab1">Description</Link></li> */}
                                    {(productData.details.length > 0 && productData.details[0].key && productData.details[0].value) ? <li className="active"><Link data-toggle="tab" to="#tab1">Details</Link></li> : ""}
                                    <li className={`${(productData.details.length > 0 && productData.details[0].key && productData.details[0].value) ? "" : "active"}`}><Link ref={reviewBtnRef} id="review-btn" data-toggle="tab" to="#tab3">Reviews ({productData.ratings.length})</Link></li>
                                </ul>
                                {/* <!-- /product tab nav --> */}

                                {/* <!-- product tab content --> */}
                                <div className="tab-content">
                                    {/* <!-- tab1  --> */}
                                    {/* <div id="tab1" className="tab-pane fade in active">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <!-- /tab1  --> */}

                                    {/* <!-- tab2  --> */}
                                    {(productData.details.length > 0 && productData.details[0].key && productData.details[0].value) ? <div id="tab1" className="tab-pane fade in active">
                                        <div className="row">
                                            {/* Detail Table */}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" colSpan="2" scope="col">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productData.details.map((element, i) => (
                                                        <tr key={i}>
                                                            <td>{element.key}</td>
                                                            <td>{element.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : ""}
                                    {/* <!-- /tab2  --> */}

                                    {/* <!-- tab3  --> */}
                                    <div id="tab3" className={`tab-pane fade in ${(productData.details.length > 0 && productData.details[0].key && productData.details[0].value) ? "" : "active"}`}>
                                        <div className="row">
                                            {/* <!-- Rating --> */}
                                            <div className="col-md-3">
                                                <div id="rating">
                                                    <div className="rating-avg">
                                                        <span>4.5</span>
                                                        <div className="rating-stars">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                        </div>
                                                    </div>
                                                    <ul className="rating">
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div style={{ width: "80%" }}></div>
                                                            </div>
                                                            <span className="sum">3</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div style={{ width: "60%" }}></div>
                                                            </div>
                                                            <span className="sum">2</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <!-- /Rating --> */}

                                            {/* <!-- Reviews --> */}
                                            <div className="col-md-6">
                                                {productData.ratings.length > 0 ? < div id="reviews">
                                                    <ul className="reviews">
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="reviews-pagination">
                                                        <li className="active">1</li>
                                                        <li><Link to="#">2</Link></li>
                                                        <li><Link to="#">3</Link></li>
                                                        <li><Link to="#">4</Link></li>
                                                        <li><Link to="#"><i className="fa fa-angle-right"></i></Link></li>
                                                    </ul>
                                                </div> : <p className="text-center no-review-container">No Reviews Yet</p>}
                                            </div>
                                            {/* <!-- /Reviews --> */}

                                            {/* <!-- Review Form --> */}
                                            <div className="col-md-3">
                                                <div id="review-form">
                                                    <form className="review-form">
                                                        <input className="input" type="text" placeholder="Your Name" />
                                                        <input className="input" type="email" placeholder="Your Email" />
                                                        <textarea className="input" placeholder="Your Review"></textarea>
                                                        <div className="input-rating">
                                                            <span>Your Rating: </span>
                                                            <div className="stars">
                                                                <input id="star5" name="rating" value="5" type="radio" /><label htmlFor="star5"></label>
                                                                <input id="star4" name="rating" value="4" type="radio" /><label htmlFor="star4"></label>
                                                                <input id="star3" name="rating" value="3" type="radio" /><label htmlFor="star3"></label>
                                                                <input id="star2" name="rating" value="2" type="radio" /><label htmlFor="star2"></label>
                                                                <input id="star1" name="rating" value="1" type="radio" /><label htmlFor="star1"></label>
                                                            </div>
                                                        </div>
                                                        <button className="primary-btn">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                            {/* <!-- /Review Form --> */}
                                        </div>
                                    </div>
                                    {/* <!-- /tab3  --> */}
                                </div>
                                {/* <!-- /product tab content  --> */}
                            </div>
                        </div>
                        {/* <!-- /product tab --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div >}
            {/* <!-- /SECTION --> */}

            {/* <!-- Section --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        <div>
                            <div className="section-title text-center">
                                <h3 className="title">Related Products</h3>
                            </div>
                        </div>

                        <Slider {...relatedSettings}>
                            {relatedProducts && relatedProducts.map((element, i) => (
                                <div key={i} className="pro-container">
                                    <div className="product" style={{ marginRight: "10px !important" }}>
                                        <div className="product-img">
                                            <img src={`/api/read-pro-img/${element.img[0]}`} alt="" />
                                            <div className="product-label">
                                                <span className="sale">-30%</span>
                                                <span className="new">NEW</span>
                                            </div>
                                        </div>
                                        <div className="product-body">
                                            <h3 className="product-name"><Link onClick={() => { window.scrollTo(0, 140) }} to={`/product/${element._id}`}>{element.name}</Link></h3>
                                            <h4 className="product-price d-inline">₹{element.price}
                                                <del className="product-old-price" style={{ marginLeft: "3px" }}>{element.oldPrice && `₹${element.oldPrice}`}</del>
                                            </h4>
                                            {(element.ratings.length > 0) ?
                                                <div className="product-rating d-inline">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div> : ""}
                                            <div className="product-desc d-inline">
                                                {element.desc.length > 0 ? `${element.desc.slice(0, 45)}...` : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /Section --></div> */}
        </>
    )
}



export default Product