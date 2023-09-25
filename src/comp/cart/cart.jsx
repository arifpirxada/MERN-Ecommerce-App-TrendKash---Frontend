import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EcomContext from '../context/e-com-context';

function Cart() {

    // Get cart Data ->

    const { cartData, updateCartQty, delCartProduct, totalPrice, totalItems } = useContext(EcomContext)

    return (
        <>
            <div className="cart-body">
                <div className="card">
                    <div className="row-cart">
                        <div className="col-md-8 cart">
                            <div className="title">
                                <div className="row-cart">
                                    <div className="col">
                                        <h4><b>Shopping Cart</b></h4>
                                    </div>
                                    <div className="col align-self-center text-right text-muted">{cartData && `${cartData.products.length} Product(s)`}</div>
                                </div>
                            </div>

                            <div className="d-flex f-wrap">
                                {(cartData && cartData.products.length > 0) ? cartData.products.map((element, i) => (
                                    <div key={i} className="row-cart border-top border-bottom m-1">
                                        <div className="row-cart main align-items-center cart-item">
                                            <div className="col-2"><img className="cartImg img-fluid" src={`/api/read-pro-img/${element.img}`} /></div>
                                            <div className="col">
                                                <Link to={`/product/${element.pid}`}>
                                                    <div className="row-cart text-muted m-2">{element.name}</div>
                                                </Link>
                                            </div>
                                            <div className="col">

                                                <select defaultValue={element.qty} onChange={updateCartQty} data-pid={element.pid} className="input-select mb-1 h-2">
                                                    {Array.from({ length: element.stock - 1 }).map((_, index) => (
                                                        <option key={index + 1} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className="col">&#8377; {element.price} <span className="text-muted ml-2 c-pointer" onClick={delCartProduct} data-pid={element.pid}>&#10005;</span></div>
                                        </div>
                                    </div>
                                )) : "No Products Added"}

                            </div>

                            <div className="back-to-shop"><Link className="cartLink" onClick={() => { window.scrollTo(0, 0) }} to="/"><i className='fa fa-arrow-left'></i>&nbsp;Back to shop</Link></div>
                        </div>
                        <div className="col-md-4 summary">
                            <div>
                                <h5 className="cartH5"><b>Summary</b></h5>
                            </div>
                            <hr id="cartHr" />
                            <div className="row-cart">
                                <div className="col" style={{ paddingLeft: 0 }}>ITEMS {totalItems}</div>
                            </div>
                            <form className="cartForm">
                                <p>SHIPPING</p>
                                <select className="cartSelect">
                                    <option className="text-muted">Standard-Delivery- &euro;5.00</option>
                                </select>
                                <p>GIVE CODE</p>
                                <input className="cartInput" id="code" placeholder="Enter your code" />
                            </form>
                            <div className="row-cart d-flex" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                <div className="col">TOTAL PRICE</div>
                                <div className="col text-right">&#x20B9;{totalPrice}</div>
                            </div>
                            <button className="cartBtn primary-btn order-submit">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart