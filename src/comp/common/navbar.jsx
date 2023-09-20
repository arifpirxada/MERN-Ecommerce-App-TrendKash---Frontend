import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {

  // For Mobile side Nav
  const [isActive, setIsActive] = useState(false);
  const openNav = () => {
    setIsActive(!isActive)
  }

  // Fetch Categories
  const [catData, setCatData] = useState([])

  const fetchCats = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}cat-read-navi`)
    const data = await res.json()
    setCatData(data)
  }

  useEffect(() => {
    fetchCats()
  }, [])

  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TrendKash</title>

        <header>
          <div id="top-header">
            <div className="container">
              <ul className="header-links pull-left">
                <li>
                  <Link to="#">
                    <i className="fa fa-phone" /> +021-95-51-84
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-envelope-o" /> email@email.com
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-map-marker" /> 1734 Stonecoal Road
                  </Link>
                </li>
              </ul>
              <ul className="header-links pull-right">
                <li>
                  <Link to="#">
                    <i className="fa fa-dollar" /> USD
                  </Link>
                </li>
                <li>
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
                    <Link to="#" className="logo">
                      <img src="./img/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="header-search">
                    <form>
                      <select className="input-select">
                        <option value="0">All Categories</option>
                        <option value="1">Category 01</option>
                        <option value="1">Category 02</option>
                      </select>
                      <input className="input" placeholder="Search here" />
                      <button className="search-btn">Search</button>
                    </form>
                  </div>
                </div>
                <div className="col-md-3 clearfix">
                  <div className="header-ctn">
                    <div className="dropdown">
                      <Link
                        className="dropdown-toggle c-pointer"
                        data-toggle="dropdown"
                        aria-expanded="true"
                      >
                        <i className="fa fa-shopping-cart" />
                        <span>Your Cart</span>
                        <div className="qty">3</div>
                      </Link>
                      <div className="cart-dropdown">
                        <div className="cart-list">
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/product01.png" alt="" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <Link to="#">product name goes here</Link>
                              </h3>
                              <h4 className="product-price">
                                <span className="qty">1x</span>$980.00
                              </h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close" />
                            </button>
                          </div>
                          <div className="product-widget">
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
                          </div>
                        </div>
                        <div className="cart-summary">
                          <small>3 Item(s) selected</small>
                          <h5>SUBTOTAL: $2940.00</h5>
                        </div>
                        <div className="cart-btns">
                          <Link to="/cartrend">View Cart</Link>
                          <Link to="/checkoutrend">
                            Checkout <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div onClick={openNav} className="menu-toggle">
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
      {/* Navigation */}
      <nav id="navigation">
        {/* container */}
        <div className="container">
          {/* responsive-nav */}
          <div id="responsive-nav" className={isActive ? 'active' : ''}>
            {/* NAV */}
            <ul className="main-nav nav navbar-nav">
              <li className="active"><Link to="/">Home</Link></li>
              {catData.map((element, i) => (
                <li key={i}><Link to="#">{element.catName}</Link></li>
              ))}
            </ul>
            {/* /NAV */}
          </div>
          {/* /responsive-nav */}
        </div>
        {/* /container */}
      </nav>
    </>
  );
}




export default Navbar;
