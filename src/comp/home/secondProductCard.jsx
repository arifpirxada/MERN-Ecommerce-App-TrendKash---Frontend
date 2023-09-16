import { React, useEffect} from 'react';

function SecondProductCard(props) {

    const styleSlide = () => {

        try {
            $('.products-slick').each(function () {
                var $this = $(this),
                    $nav = $this.attr('data-nav');

                $this.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    infinite: true,
                    speed: 300,
                    dots: false,
                    arrows: true,
                    appendArrows: $nav ? $nav : false,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    ]
                });
            });

        } catch (e) {
            console.error("Slick carousel error:");
        }
    }

    useEffect(() => {
        styleSlide()
    }, [])

    return (
        <>
            {/* SECTION */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">

                        {/* <!-- Products tab & slick --> */}
                        <div className="col-md-12">
                            <div className="row">
                                <div className="products-tabs">
                                    {/* <!-- tab --> */}
                                    <div id="tab2" className="tab-pane fade in active">
                                        <div className="products-slick slide-container" data-nav="#slick-nav-2">
                                            {/* <!-- product --> */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product06.png" alt="" />
                                                    <div className="product-label">
                                                        <span className="sale">-30%</span>
                                                        <span className="new">NEW</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del
                                                        className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span
                                                            className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange"></i><span
                                                            className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye"></i><span
                                                            className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to
                                                        cart</button>
                                                </div>
                                            </div>
                                            {/* <!-- /product --> */}

                                            {/* <!-- product --> */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product07.png" alt="" />
                                                    <div className="product-label">
                                                        <span className="new">NEW</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del
                                                        className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span
                                                            className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange"></i><span
                                                            className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye"></i><span
                                                            className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to
                                                        cart</button>
                                                </div>
                                            </div>
                                            {/* <!-- /product --> */}

                                            {/* <!-- product --> */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product08.png" alt="" />
                                                    <div className="product-label">
                                                        <span className="sale">-30%</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del
                                                        className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span
                                                            className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange"></i><span
                                                            className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye"></i><span
                                                            className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to
                                                        cart</button>
                                                </div>
                                            </div>
                                            {/* <!-- /product --> */}

                                            {/* <!-- product --> */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product09.png" alt="" />
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del
                                                        className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span
                                                            className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange"></i><span
                                                            className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye"></i><span
                                                            className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to
                                                        cart</button>
                                                </div>
                                            </div>
                                            {/* <!-- /product --> */}

                                            {/* <!-- product --> */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product01.png" alt="" />
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del
                                                        className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span
                                                            className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange"></i><span
                                                            className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye"></i><span
                                                            className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to
                                                        cart</button>
                                                </div>
                                            </div>
                                            {/* <!-- /product --> */}
                                        </div>
                                        <div id="slick-nav-2" className="products-slick-nav"></div>
                                    </div>
                                    {/* <!-- /tab --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Products tab & slick --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /SECTION --> */}
        </>
    );
};



export default SecondProductCard;
