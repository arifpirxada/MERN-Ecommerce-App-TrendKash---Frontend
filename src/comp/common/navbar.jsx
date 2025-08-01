import { React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../auth/signup'
import EcomContext from '../context/e-com-context';
import UserProfile from '../profile/user-profile';
import LoadingBar from "react-top-loading-bar"

function Navbar(props) {

    // For Mobile side Nav
    const [isActive, setIsActive] = useState(false);
    const openNav = () => {
        setIsActive(!isActive)
    }

    // Fetch Categories
    const [catData, setCatData] = useState([])

    const fetchCats = async () => {
        const res = await fetch(`/api/cat-read-navi`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    // Open Modals ->

    const openSignModal = () => {
        document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
        document.querySelector(".signupModal").style.display = "flex"
        document.querySelector(".signup-modal-content").style.marginTop = "-250px"
        setTimeout(() => {
            document.querySelector(".signup-modal-content").style.marginTop = "0px"
        }, 0);
    }

    const openUserProfileModal = () => {
        document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
        document.querySelector(".userProfileModal").style.display = "flex"
        document.querySelector(".profile-modal-content").style.marginTop = "-250px"
        setTimeout(() => {
            document.querySelector(".profile-modal-content").style.marginTop = "0px"
        }, 0);
    }

    // Authorization ->
    const { logged, uid, cartData, delCartProduct, totalPrice, aboutData, progress } = useContext(EcomContext)

    // Fetch user Here ->

    const [userData, setUserData] = useState()

    const fetchUser = async () => {
        if (uid) {
            const res = await fetch(`/api/read-user/${uid}`)
            const data = await res.json()
            setUserData(data)
        }
    }

    // For searching ->

    const [query, setQuery] = useState("")
    const [suggest, setSuggest] = useState()

    const fetchSuggestions = async (e) => {
        setQuery(e.target.value)
        if (e.target.value.trim() !== "") {
            try {
                const res = await fetch(`/api/search-suggest/${e.target.value}`)
                const data = await res.json()
                setSuggest(data)
            } catch (e) {
                setSuggest()
                console.error("An error occured while searching the product")
            }
        } else {
            setSuggest()
        }
    }

    return (
        <>
            <LoadingBar
                height={ 3 }
                color='linear-gradient(45deg, rgb(54 116 244), rgb(255, 87, 34))'
                progress={ progress }
                shadow={ true }
            />
            <SignUp />
            <UserProfile openSignModal={ openSignModal } userData={ userData } setUserData={ setUserData } />
            <div>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>TrendKash</title>

                <header>
                    <div id="top-header">
                        <div className="container">
                            { aboutData && <ul className="header-links pull-left">
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-phone" /> { aboutData[0].phone }
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-envelope-o" /> { aboutData[0].email }
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-map-marker" /> { aboutData[0].address }
                                    </Link>
                                </li>
                            </ul> }
                            <ul className="header-links pull-right">
                                { logged && <li>
                                    <Link to="/orders">
                                        <i className="fa fa-dollar" /> My Orders
                                    </Link>
                                </li> }
                                <li onClick={ () => { fetchUser(); openUserProfileModal() } }>
                                    <Link to="#">
                                        <i className="fa fa-user-o" /> My Account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="header-logo">
                                        <Link to="/" className="logo d-flex f-wrap">
                                            <img className="w-7" src="\img\nobg-mylogo.png" alt="" />
                                            <img className="w-17" src="\img\banner.png" alt="" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="header-search">
                                        <form className='search-form'>
                                            <input className="input my-search-input" value={ query } onChange={ fetchSuggestions } placeholder="Search here" />
                                            <Link to={ query.trim() === "" ? "#" : `/search/${query}` } className="search-btn my-search-btn">Search</Link>
                                        </form>
                                    </div>
                                    { suggest && suggest.length > 0 ? <div className="search-form">
                                        <div className="col-md-6 search-dropdown">
                                            { suggest.map((element, i) => (
                                                <Link key={ i } to={ `/search/${element.name}` } onClick={ () => { setSuggest(); setQuery(element.name) } } className="result-item">{ element.name }</Link>
                                            )) }
                                        </div>
                                    </div> : "" }
                                </div>
                                <div className="col-md-3 clearfix">
                                    <div className="header-ctn">

                                        { !logged && <div>
                                            <Link onClick={ openSignModal } to="#">
                                                <i className="fa fa-user-o"></i>
                                                <span>Login / signup</span>
                                            </Link>
                                        </div> }

                                        <div className="dropdown">
                                            <Link
                                                className="dropdown-toggle c-pointer"
                                                data-toggle="dropdown"
                                                aria-expanded="true"
                                            >
                                                <i className="fa fa-shopping-cart" />
                                                <span>Your Cart</span>
                                                <div className="qty">{ (cartData && cartData.products.length > 0) ? cartData.products.length : 0 }</div>
                                            </Link>
                                            <div className="cart-dropdown">
                                                <div className="cart-list">
                                                    { (cartData && cartData.products.length > 0) ? cartData.products.map((element, i) => (
                                                        <div key={ i } className="product-widget">
                                                            <div className="product-img">
                                                                <img src={ `/api/read-pro-img/${element.img}` } alt="" />
                                                            </div>
                                                            <div className="product-body">
                                                                <h3 className="product-name">
                                                                    <Link to={ `/product/${element.pid}` }>{ element.name }</Link>
                                                                </h3>
                                                                <h4 className="product-price">
                                                                    <span className="qty">{ element.qty }x</span>&#x20B9;{ element.price }
                                                                </h4>
                                                            </div>
                                                            <button onClick={ delCartProduct } data-pid={ element.pid } className="delete">
                                                                <i className="fa fa-close" />
                                                            </button>
                                                        </div>
                                                    )) : <h4 className="product-price">
                                                        No Products Added
                                                    </h4> }

                                                    {/* <div className="product-widget">
                                                        <div className="product-img">
                                                            <img src="./img/product02.png" alt="" />
                                                        </div>
                                                        <div className="product-body">
                                                            <h3 className="product-name">
                                                                <Link to="#">product name goes here</Link>
                                                            </h3>
                                                            <h4 className="product-price">
                                                                <span className="qty">3x</span>$980.00
                                                            </h4>
                                                        </div>
                                                        <button className="delete">
                                                            <i className="fa fa-close" />
                                                        </button>
                                                    </div> */}
                                                </div>
                                                { (cartData && cartData.products.length > 0) ? <div className="cart-summary">
                                                    <small>{ cartData.products.length } Product(s) selected</small>
                                                    <h5>SUBTOTAL: &#x20B9;{ totalPrice && totalPrice }</h5>
                                                </div> : "" }
                                                <div className="cart-btns">
                                                    <Link to="/cart">View Cart</Link>
                                                    { (cartData && cartData.products.length > 0) ? <Link to="/checkout">
                                                        Checkout <i className="fa fa-arrow-circle-right" />
                                                    </Link> : "" }
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={ openNav } className="menu-toggle">
                                            <Link to="#">
                                                <i className="fa fa-bars" />
                                                <span>Menu</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            {/* Navigation */ }
            <nav id="navigation">
                {/* container */ }
                <div className="container">
                    {/* responsive-nav */ }
                    <div id="responsive-nav" className={ isActive ? 'active' : '' }>
                        {/* NAV */ }
                        <ul className="main-nav nav navbar-nav">
                            { isActive && <div className="text-end close-contain">
                                <i onClick={ openNav } className="fa fa-close nav-close"></i>
                            </div> }
                            <li className="active" onClick={ openNav } ><Link to="/">Home</Link></li>
                            { catData.map((element, i) => (
                                <li key={ i }><Link onClick={ openNav } to={ `/store/${element.catName}` }>{ element.catName }</Link></li>
                            )) }
                        </ul>
                        {/* /NAV */ }
                    </div>
                    {/* /responsive-nav */ }
                </div>
                {/* /container */ }
            </nav>
        </>
    );
}




export default Navbar;
