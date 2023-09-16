import React from "react"
import { Link } from 'react-router-dom';

function Cart() {
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
                                    <div className="col align-self-center text-right text-muted">3 items</div>
                                </div>
                            </div>
                            <div className="d-flex">

                                <div className="row-cart border-top border-bottom m-1">
                                    <div className="row-cart main align-items-center">
                                        <div className="col-2"><img className="cartImg img-fluid" src="https://i.imgur.com/1GrakTl.jpg" /></div>
                                        <div className="col">
                                            <div className="row-cart text-muted">Shirt</div>
                                            <div className="row-cart">Cotton T-shirt</div>
                                        </div>
                                        <div className="col">
                                            <Link className="cartLink" to="#">-</Link><Link to="#" className="border cartLink">1</Link><Link className="cartLink" to="#">+</Link>
                                        </div>
                                        <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                                    </div>
                                </div>
                                <div className="row-cart">
                                    <div className="row-cart main align-items-center m-1">
                                        <div className="col-2"><img className="cartImg img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" /></div>
                                        <div className="col">
                                            <div className="row-cart text-muted">Shirt</div>
                                            <div className="row-cart">Cotton T-shirt</div>
                                        </div>
                                        <div className="col">
                                            <Link className="cartLink" to="#">-</Link><Link to="#" className="border cartLink">1</Link><Link className="cartLink" to="#">+</Link>
                                        </div>
                                        <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                                    </div>
                                </div>
                                <div className="row-cart border-top border-bottom m-1">
                                    <div className="row-cart main align-items-center">
                                        <div className="col-2"><img className="cartImg img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" /></div>
                                        <div className="col">
                                            <div className="row-cart text-muted">Shirt</div>
                                            <div className="row-cart">Cotton T-shirt</div>
                                        </div>
                                        <div className="col">
                                            <Link className="cartLink" to="#">-</Link><Link to="#" className="border cartLink">1</Link><Link className="cartLink" to="#">+</Link>
                                        </div>
                                        <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="back-to-shop"><Link className="cartLink" to="/">&nbsp;Back to shop</Link>
                            </div>
                        </div>
                        <div className="col-md-4 summary">
                            <div>
                                <h5 className="cartH5"><b>Summary</b></h5>
                            </div>
                            <hr id="cartHr" />
                            <div className="row-cart">
                                <div className="col" style={{ paddingLeft: 0 }}>ITEMS 3</div>
                                <div className="col text-right">&euro; 132.00</div>
                            </div>
                            <form className="cartForm">
                                <p>SHIPPING</p>
                                <select className="cartSelect">
                                    <option className="text-muted">Standard-Delivery- &euro;5.00</option>
                                </select>
                                <p>GIVE CODE</p>
                                <input className="cartInput" id="code" placeholder="Enter your code" />
                            </form>
                            <div className="row-cart" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                                <div className="col">TOTAL PRICE</div>
                                <div className="col text-right">&euro; 137.00</div>
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