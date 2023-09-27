import { React, useEffect, useState, useContext, useRef } from "react";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import EcomContext from "../context/e-com-context";

function Product() {
    const mainSettings = {
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        autoplay: true,
    };

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        centerPadding: 0,
        vertical: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    vertical: false,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    const relatedSettings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Fetch Product Data Here

    const [productData, setProductData] = useState();
    const { id } = useParams();

    const fetchProductData = async () => {
        const res = await fetch(`/api/read-pro/${id}`);
        const data = await res.json();
        setProductData(data);
        if (data.message === "Internal server error") {
            alert("Error! Product Not found");
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    // For related products ->
    const { relatedProducts, fetchRelatedProducts, uid, logged, fetchCartData } = useContext(EcomContext);

    useEffect(() => {
        if (productData) {
            const newCats = productData.cat.filter(
                (item) => item !== "FirstTop" && item != "SecondTop"
            );
            fetchRelatedProducts(newCats, id);
        }
    }, [productData]);

    const productTabRef = useRef(null);
    const reviewBtnRef = useRef(null);

    const scrollToReviews = () => {
        productTabRef.current.scrollIntoView({ behavior: "smooth" });
        reviewBtnRef.current.click();
    };

    // Add Product to cart ->

    const qtyRef = useRef(null);

    const addToCart = async () => {
        if (!qtyRef.current) {
            return (document.getElementById("cart-message").innerHTML =
                "Product is not available");
        }
        try {
            if (uid && logged) {
                const cartData = {
                    uid: uid,
                    product: {
                        pid: id,
                        name: productData.name,
                        img: productData.img[0],
                        price: productData.price,
                        qty: parseInt(qtyRef.current.value),
                        stock: productData.stock,
                    },
                };

                const res = await fetch("/api/add-to-cart", {
                    method: "POST",
                    body: JSON.stringify(cartData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.message === "Insertion successful") {
                    fetchCartData();
                    document.getElementById("cart-message").innerHTML =
                        "Product added to cart";
                    setTimeout(() => {
                        document.getElementById("cart-message").innerHTML = "";
                    }, 5000);
                } else {
                    document.getElementById("cart-message").innerHTML = data.message;
                    setTimeout(() => {
                        document.getElementById("cart-message").innerHTML = "";
                    }, 5000);
                }
            } else {
                document
                    .getElementById("top-header")
                    .scrollIntoView({ behavior: "smooth" });
                document.querySelector(".signupModal").style.display = "flex";
                document.querySelector(".signup-modal-content").style.marginTop =
                    "-250px";
                setTimeout(() => {
                    document.querySelector(".signup-modal-content").style.marginTop =
                        "0px";
                }, 0);
            }
        } catch (e) {
            document.getElementById("cart-message").innerHTML =
                "Some error occured! please try later";
        }
    }

    // Fetch User ->

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/read-user/${uid}`)
            const data = await res.json()
            return data.name
        } catch {
            console.error("err: setting user")
        }
    }

    // Review Products ->

    const [rating, setRating] = useState();
    const reviewProduct = async () => {
        if (logged && uid && productData) {
            try {
                const messBox = document.getElementById("review-message");
                const reviewElement = document.getElementById("user-review");
                if (reviewElement.value === "") {
                    messBox.innerHTML = "Please write a review!";
                    setTimeout(() => {
                        messBox.innerHTML = "";
                    }, 4000);
                    return;
                }
                if (!rating) {
                    messBox.innerHTML = "Please provide a rating!";
                    setTimeout(() => {
                        messBox.innerHTML = "";
                    }, 4000);
                    return;
                }
                const userName = await fetchUser()
                const reviewData = {
                    id: productData._id,
                    rating: {
                        uid: uid,
                        name: userName,
                        review: reviewElement.value,
                        rating: rating
                    }
                };
                const res = await fetch("/api/update-pro-review", {
                    method: "PATCH",
                    body: JSON.stringify(reviewData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                messBox.innerHTML = data.message;
                setTimeout(() => {
                    messBox.innerHTML = "";
                }, 4000);
                if (data.message === "Review Added") {
                    reviewElement.value = "";
                    document.getElementById(`star${rating}`).checked = false
                    fetchProductData()
                    setRating()
                }
            } catch (e) {
                console.error("An error occured while adding review");
            }
        } else {
            document
                .getElementById("top-header")
                .scrollIntoView({ behavior: "smooth" });
            document.querySelector(".signupModal").style.display = "flex";
            document.querySelector(".signup-modal-content").style.marginTop =
                "-250px";
            setTimeout(() => {
                document.querySelector(".signup-modal-content").style.marginTop = "0px";
            }, 0);
        }
    };

    const now = new Date()

    const reviewDateDiff = (reviewDt) => {
        const reviewDate = new Date(reviewDt)
        const diff = (now - reviewDate) / 1000
        const dayDiff = Math.floor(diff / (3600 * 24))

        if (dayDiff > 6) {
            // Return Weeks
            const weekDiff = Math.floor(diff / (3600 * 24 * 7))
            const weeks = weekDiff === 1 ? `${weekDiff} week` : `${weekDiff} weeks`
            return weeks
        } else if (dayDiff >= 1) {
            // Return Days
            const days = dayDiff === 1 ? `${dayDiff} day` : `${dayDiff} days`
            return days
        } else if (diff / 3600 % 24 < 1) {
            // Return Minutes
            const min = `${Math.floor((diff / 60) % 60)} min`
            return min
        } else if (dayDiff < 1) {
            // Return Hours
            const hourDiff = Math.floor(diff / 3600 % 24)
            const hours = hourDiff === 1 ? `${hourDiff} hour` : `${hourDiff} hours`
            return hours
        }
        return dayDiff
    }

    // Delete Review here ->

    const delReview = async (review) => {
        try {
            const delData = {
                id: productData._id,
                uid: uid,
                review: review
            }
            const res = await fetch("/api/delete-pro-review", {
                method: "PATCH",
                body: JSON.stringify(delData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.message === "Review deleted") {
                fetchProductData()
            } else {
                alert("An error occured while deleting your review")
            }
        } catch {
            alert("An error occured while deleting your review")
        }
    }

    // Get Average Rating and Rating by number ->

    const [avgRating, setAvgRating] = useState()
    const [numRating, setNumRating] = useState()

    const calcRating = () => {
        if (productData) {
            var rateArr = 0
            var numArr = [0, 0, 0, 0, 0]
            productData.ratings.map((element) => {
                rateArr += parseInt(element.rating)
                if (element.rating === "1") {
                    numArr[0] += 1
                } else if (element.rating === "2") {
                    numArr[1] += 1
                } else if (element.rating === "3") {
                    numArr[2] += 1
                } else if (element.rating === "4") {
                    numArr[3] += 1
                } else {
                    numArr[4] += 1
                }
            })
            const avg = Math.round(rateArr / productData.ratings.length * 10)
            setAvgRating(avg/10)
            setNumRating(numArr)
        }
    }

    useEffect(() => {
        calcRating()
    }, [productData])


    return (
        <>
            {/* <!-- SECTION --> */ }
            { productData && (
                <div className="section" id="pro-section">
                    {/* <!-- container --> */ }
                    <div className="container">
                        {/* <!-- row --> */ }
                        <div className="row" id="product-page">
                            {/* <!-- Product main img --> */ }
                            <div className="col-md-5 col-md-push-2 main-container">
                                <div className="img-container" id="product-main-img">
                                    <Slider { ...mainSettings }>
                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[0]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[1]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[2]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[3]}` }
                                                alt=""
                                            />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                            {/* <!-- /Product main img --> */ }

                            {/* <!-- Product thumb imgs --> */ }
                            <div className="col-md-2  col-md-pull-5">
                                <div className="thumb-imgs-container" id="product-imgs">
                                    <Slider { ...settings }>
                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[0]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[1]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[2]}` }
                                                alt=""
                                            />
                                        </div>

                                        <div className="product-preview">
                                            <img
                                                src={ `/api/read-pro-img/${productData.img[3]}` }
                                                alt=""
                                            />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                            {/* <!-- /Product thumb imgs --> */ }

                            {/* <!-- Product details --> */ }
                            <div className="col-md-5">
                                <div className="product-details">
                                    <h2 className="product-name">{ productData.name }</h2>
                                    <div>
                                        { productData.ratings.length > 0 ? (
                                            <div className="product-rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o"></i>
                                            </div>
                                        ) : (
                                            ""
                                        ) }
                                        <Link
                                            onClick={ scrollToReviews }
                                            className="review-link"
                                            to="#"
                                        >
                                            { productData.ratings.length } Review(s) | Add your review
                                        </Link>
                                    </div>
                                    <div>
                                        <h3 className="product-price">
                                            { `₹${productData.price}` }{ " " }
                                            <del className="product-old-price">
                                                { productData.oldPrice > 0
                                                    ? `₹${productData.oldPrice}`
                                                    : "" }
                                            </del>
                                        </h3>
                                        <span className="product-available">
                                            { productData.stock > 0 ? "In Stock" : "Not Available" }
                                        </span>
                                    </div>
                                    <p>{ productData.desc && productData.desc }</p>

                                    <div className="product-options">
                                        { productData.size && (
                                            <label>
                                                Size
                                                <select className="input-select ml-1">
                                                    <option value={ productData.size[0] }>
                                                        { productData.size[0] }
                                                    </option>
                                                    { productData.size.map((element, i) => (
                                                        <option key={ i } value={ element }>
                                                            { element }
                                                        </option>
                                                    )) }
                                                </select>
                                            </label>
                                        ) }
                                        { productData.color && (
                                            <label>
                                                Color
                                                <select className="input-select ml-1">
                                                    <option value={ productData.color[0] }>
                                                        { productData.color[0] }
                                                    </option>
                                                    { productData.color.map((element, i) => (
                                                        <option key={ i } value={ element }>
                                                            { element }
                                                        </option>
                                                    )) }
                                                </select>
                                            </label>
                                        ) }
                                        { productData.stock > 0 && (
                                            <label>
                                                Qty
                                                <select ref={ qtyRef } className="input-select ml-1">
                                                    <option value={ 1 }>1</option>
                                                    { Array.from({ length: productData.stock - 1 }).map(
                                                        (_, index) => (
                                                            <option key={ index + 2 } value={ index + 2 }>
                                                                { index + 2 }
                                                            </option>
                                                        )
                                                    ) }
                                                </select>
                                            </label>
                                        ) }
                                    </div>

                                    <div className="add-to-cart pro-sale-btn">
                                        <button
                                            onClick={ addToCart }
                                            className="add-to-cart-btn m-2 r-2"
                                        >
                                            <i className="fa fa-shopping-cart"></i> add to cart
                                        </button>
                                        <button className="add-to-cart-btn m-2 r-2">
                                            <i className="fa fa-heart-o"></i> Buy Now
                                        </button>
                                    </div>
                                    <p
                                        id="cart-message"
                                        className="f-5 c-red text-center f-16"
                                    ></p>
                                    <ul className="product-links">
                                        <li>Share:</li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-facebook"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-twitter"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-google-plus"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-envelope"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- /Product details --> */ }

                            {/* <!-- Product tab --> */ }
                            <div className="col-md-12">
                                <div id="product-tab" ref={ productTabRef }>
                                    {/* <!-- product tab nav --> */ }
                                    <ul className="tab-nav">
                                        {/* <li className="active"><Link data-toggle="tab" to="#tab1">Description</Link></li> */ }
                                        { productData.details.length > 0 &&
                                            productData.details[0].key &&
                                            productData.details[0].value ? (
                                            <li className="active">
                                                <Link data-toggle="tab" to="#tab1">
                                                    Details
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        ) }
                                        <li
                                            className={ `${productData.details.length > 0 &&
                                                productData.details[0].key &&
                                                productData.details[0].value
                                                ? ""
                                                : "active"
                                                }` }
                                        >
                                            <Link
                                                ref={ reviewBtnRef }
                                                id="review-btn"
                                                data-toggle="tab"
                                                to="#tab3"
                                            >
                                                Reviews ({ productData.ratings.length })
                                            </Link>
                                        </li>
                                    </ul>
                                    {/* <!-- /product tab nav --> */ }

                                    {/* <!-- product tab content --> */ }
                                    <div className="tab-content">
                                        {/* <!-- tab1 --> */ }
                                        { productData.details.length > 0 &&
                                            productData.details[0].key &&
                                            productData.details[0].value ? (
                                            <div id="tab1" className="tab-pane fade in active">
                                                <div className="row">
                                                    {/* Detail Table */ }
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    className="text-center"
                                                                    colSpan="2"
                                                                    scope="col"
                                                                >
                                                                    Details
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { productData.details.map((element, i) => (
                                                                <tr key={ i }>
                                                                    <td>{ element.key }</td>
                                                                    <td>{ element.value }</td>
                                                                </tr>
                                                            )) }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        ) }
                                        {/* <!-- /tab2  --> */ }

                                        {/* <!-- tab3  --> */ }
                                        <div
                                            id="tab3"
                                            className={ `tab-pane fade in ${productData.details.length > 0 &&
                                                productData.details[0].key &&
                                                productData.details[0].value
                                                ? ""
                                                : "active"
                                                }` }
                                        >
                                            <div className="row">
                                                {/* <!-- Rating --> */ }
                                                { productData.ratings.length > 0 ? (
                                                    <div className="col-md-3">
                                                        <div id="rating">
                                                            { avgRating && <div className="rating-avg">
                                                                <span>{ avgRating }</span>
                                                                <div className="rating-stars">
                                                                    <i className={ `fa fa-star${parseInt(avgRating) > 0 ? "" : "-o"}` }></i>
                                                                    <i className={ `fa fa-star${parseInt(avgRating) > 1 ? "" : "-o"}` }></i>
                                                                    <i className={ `fa fa-star${parseInt(avgRating) > 2 ? "" : "-o"}` }></i>
                                                                    <i className={ `fa fa-star${parseInt(avgRating) > 3 ? "" : "-o"}` }></i>
                                                                    <i className={ `fa fa-star${parseInt(avgRating) > 4 ? "" : "-o"}` }></i>
                                                                </div>
                                                            </div> }
                                                            { numRating && <ul className="rating">
                                                                <li>
                                                                    <div className="rating-stars">
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                    </div>
                                                                    <div className="rating-progress">
                                                                        <div style={ { width: `${Math.round((numRating[4] / productData.ratings.length) * 100)}%` } }></div>
                                                                    </div>
                                                                    <span className="sum">{ numRating[4] }</span>
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
                                                                        <div style={ { width: `${Math.round((numRating[3] / productData.ratings.length) * 100)}%` } }></div>
                                                                    </div>
                                                                    <span className="sum">{ numRating[3] }</span>
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
                                                                        <div style={ { width: `${Math.round((numRating[2] / productData.ratings.length) * 100)}%` } }></div>
                                                                    </div>
                                                                    <span className="sum">{ numRating[2] }</span>
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
                                                                        <div style={ { width: `${Math.round((numRating[1] / productData.ratings.length) * 100)}%` } }></div>
                                                                    </div>
                                                                    <span className="sum">{ numRating[1] }</span>
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
                                                                        <div style={ { width: `${Math.round((numRating[0] / productData.ratings.length) * 100)}%` } }></div>
                                                                    </div>
                                                                    <span className="sum">{ numRating[0] }</span>
                                                                </li>
                                                            </ul> }
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                ) }
                                                {/* <!-- /Rating --> */ }

                                                {/* <!-- Reviews --> */ }

                                                <div className="col-md-6">
                                                    { productData.ratings.length > 0 ? (
                                                        <div id="reviews">
                                                            <ul className="reviews">
                                                                { productData.ratings.map((element, i) => (
                                                                    <li key={ i }>
                                                                        { uid && uid === element.uid ? <><span onClick={ () => { delReview(element.review) } } className="text-muted del-review c-pointer tooltip-trigger" data-pid={ "wait" }>&#10005;</span><div className="tooltip-content">Delete Review</div></> : "" }
                                                                        <div className="review-heading">
                                                                            <h5 className="name">{ element.name }</h5>
                                                                            <p className="date">
                                                                                { reviewDateDiff(element.time) }
                                                                            </p>
                                                                            <div className="review-rating">
                                                                                <i className={ `fa fa-star${parseInt(element.rating) > 0 ? "" : "-o"}` }></i>
                                                                                <i className={ `fa fa-star${parseInt(element.rating) > 1 ? "" : "-o"}` }></i>
                                                                                <i className={ `fa fa-star${parseInt(element.rating) > 2 ? "" : "-o"}` }></i>
                                                                                <i className={ `fa fa-star${parseInt(element.rating) > 3 ? "" : "-o"}` }></i>
                                                                                <i className={ `fa fa-star${parseInt(element.rating) > 4 ? "" : "-o"}` }></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="review-body">
                                                                            <p>{ element.review }</p>
                                                                        </div>
                                                                    </li>
                                                                )) }
                                                                {/* <li>
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
                                                        </li> */}
                                                                {/* <li>
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
                                                        </li> */}
                                                            </ul>
                                                            <ul className="reviews-pagination">
                                                                <li className="active">1</li>
                                                                <li>
                                                                    <Link to="#">2</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="#">3</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="#">4</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="#">
                                                                        <i className="fa fa-angle-right"></i>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <p className="text-center no-review-container">
                                                            No Reviews Yet
                                                        </p>
                                                    ) }
                                                </div>
                                                {/* <!-- /Reviews --> */ }

                                                {/* <!-- Review Form --> */ }
                                                <div className="col-md-3">
                                                    <div id="review-form">
                                                        <div className="review-form">
                                                            <textarea
                                                                id="user-review"
                                                                className="input"
                                                                placeholder="Your Review"
                                                            ></textarea>
                                                            <div className="input-rating">
                                                                <span>Your Rating: </span>
                                                                <div className="stars">
                                                                    <input
                                                                        onChange={ (e) => { setRating(e.target.value); } }
                                                                        id="star5"
                                                                        name="rating"
                                                                        value="5"
                                                                        type="radio"
                                                                    />
                                                                    <label htmlFor="star5"></label>
                                                                    <input
                                                                        onChange={ (e) => {
                                                                            setRating(e.target.value);
                                                                        } }
                                                                        id="star4"
                                                                        name="rating"
                                                                        value="4"
                                                                        type="radio"
                                                                    />
                                                                    <label htmlFor="star4"></label>
                                                                    <input
                                                                        onChange={ (e) => {
                                                                            setRating(e.target.value);
                                                                        } }
                                                                        id="star3"
                                                                        name="rating"
                                                                        value="3"
                                                                        type="radio"
                                                                    />
                                                                    <label htmlFor="star3"></label>
                                                                    <input
                                                                        onChange={ (e) => {
                                                                            setRating(e.target.value);
                                                                        } }
                                                                        id="star2"
                                                                        name="rating"
                                                                        value="2"
                                                                        type="radio"
                                                                    />
                                                                    <label htmlFor="star2"></label>
                                                                    <input
                                                                        onChange={ (e) => {
                                                                            setRating(e.target.value);
                                                                        } }
                                                                        id="star1"
                                                                        name="rating"
                                                                        value="1"
                                                                        type="radio"
                                                                    />
                                                                    <label htmlFor="star1"></label>
                                                                </div>
                                                            </div>
                                                            <p
                                                                id="review-message"
                                                                className="c-red f-5 ml-1"
                                                            ></p>
                                                            <button
                                                                onClick={ reviewProduct }
                                                                className="primary-btn"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- /Review Form --> */ }
                                            </div>
                                        </div>
                                        {/* <!-- /tab3  --> */ }
                                    </div>
                                    {/* <!-- /product tab content  --> */ }
                                </div>
                            </div>
                            {/* <!-- /product tab --> */ }
                        </div>
                        {/* <!-- /row --> */ }
                    </div>
                    {/* <!-- /container --> */ }
                </div>
            ) }
            {/* <!-- /SECTION --> */ }

            {/* <!-- Section --> */ }
            <div className="section">
                {/* <!-- container --> */ }
                <div className="container">
                    {/* <!-- row --> */ }
                    <div className="row">
                        { relatedProducts && relatedProducts.length > 0 && (
                            <div>
                                <div className="section-title text-center">
                                    <h3 className="title">Related Products</h3>
                                </div>
                            </div>
                        ) }

                        <Slider { ...relatedSettings }>
                            { relatedProducts &&
                                relatedProducts.length > 0 &&
                                relatedProducts.map((element, i) => (
                                    <div key={ i } className="pro-container">
                                        <div
                                            className="product"
                                            style={ { marginRight: "10px !important" } }
                                        >
                                            <div className="product-img">
                                                <img
                                                    src={ `/api/read-pro-img/${element.img[0]}` }
                                                    alt=""
                                                />
                                                <div className="product-label">
                                                    <span className="sale">-30%</span>
                                                    <span className="new">NEW</span>
                                                </div>
                                            </div>
                                            <div className="product-body">
                                                <h3 className="product-name">
                                                    <Link
                                                        onClick={ () => {
                                                            window.scrollTo(0, 140);
                                                        } }
                                                        to={ `/product/${element._id}` }
                                                    >
                                                        { element.name }
                                                    </Link>
                                                </h3>
                                                <h4 className="product-price d-inline">
                                                    ₹{ element.price }
                                                    <del
                                                        className="product-old-price"
                                                        style={ { marginLeft: "3px" } }
                                                    >
                                                        { element.oldPrice && `₹${element.oldPrice}` }
                                                    </del>
                                                </h4>
                                                { element.ratings.length > 0 ? (
                                                    <div className="product-rating d-inline">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                ) : (
                                                    ""
                                                ) }
                                                <div className="product-desc d-inline">
                                                    { element.desc.length > 0
                                                        ? `${element.desc.slice(0, 45)}...`
                                                        : "" }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) }
                        </Slider>
                    </div>
                    {/* <!-- /row --> */ }
                </div>
                {/* <!-- /container --> */ }
            </div>
            {/* <!-- /Section --></div> */ }
        </>
    );
}

export default Product;
