import { useContext, useEffect, useState } from "react"
import EcomContext from "../context/e-com-context"
import { Link, useNavigate } from "react-router-dom"

function Checkout() {

    const { checkData, cartData, totalPrice, uid, fetchCartData } = useContext(EcomContext)
    const [payType, setPayType] = useState()
    const [PINCode, setPINCode] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        if (checkData) {
            setPayType(checkData[0])
            setPINCode(checkData[1])
        }
    }, [checkData])
    useEffect(() => {
        if (!cartData || cartData.products.length === 0) {
            navigate("/cart")
        }
    }, [cartData])

    // Place Order ->

    const placeOrder = async () => {
        if (cartData && totalPrice && uid) {

            const phone = document.getElementById("phone").value
            const street = document.getElementById("street").value
            const locality = document.getElementById("locality").value
            const region = document.getElementById("region").value
            // const pinCode = document.getElementById("pin-code").value
            const notes = document.getElementById("notes").value
            const messBox = document.getElementById("order-message")

            if (phone === "" || street === "" || locality === "" || region === "" || PINCode === "" || !payType) {
                messBox.innerHTML = "Please fill all required fields"
                setTimeout(() => {
                    messBox.innerHTML = ""
                }, 5000);
                return
            }

            const orderData = {
                products: cartData.products,
                totalPrice: totalPrice,
                user: uid,
                phone: phone,
                address: {
                    street: street,
                    locality: locality,
                    region: region,
                    PINCode: PINCode
                },
                paymentType: payType,
                notes: notes
            }

            if (document.getElementById("shiping-address").checked === true) {
                orderData.shipAddress = {
                    street: document.getElementById("ship-street").value,
                    locality: document.getElementById("ship-locality").value,
                    region: document.getElementById("ship-region").value,
                    PINCode: document.getElementById("ship-pin-code").value
                }
            }

            const res = await fetch("/api/create-order", {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.message === "order placed") {
                fetchCartData()
                navigate("/orders")
                document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
            } else if (data.message === "Redirecting to payment processing...") {
                window.location.href = data.url
            }
            messBox.innerHTML = data.message
        } else {
            console.error("Error occured while placing order")
        }
    }

    return (
        <>
            {/* <!-- SECTION --> */ }
            <div className="section">
                {/* <!-- container --> */ }
                <div className="container">
                    {/* <!-- row --> */ }
                    <div className="row">

                        <div className="col-md-7">
                            {/* <!-- Billing Details --> */ }
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Billing address</h3>
                                </div>
                                <h5 className="mb-2">Address</h5>
                                <div className="form-group">
                                    <input className="input" type="text" id="street" placeholder="Street" />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" id="locality" placeholder="Locality" />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" id="region" placeholder="Region" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pin-code" className="form-label">PIN Code:</label>
                                    <input value={ PINCode } onChange={ (e) => { setPINCode(e.target.value) } } className="input" type="text" id="pin-code" placeholder="PIN Code" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Moblie Number:</label>
                                    <input className="input" type="number" id="phone" placeholder="Phone" />
                                </div>
                            </div>
                            {/* <!-- /Billing Details --> */ }

                            {/* <!-- Shiping Details --> */ }
                            <div className="shiping-details">
                                <div className="section-title">
                                    <h3 className="title">Shiping address</h3>
                                </div>
                                <div className="input-checkbox">
                                    <input type="checkbox" id="shiping-address" />
                                    <label htmlFor="shiping-address">
                                        <span></span>
                                        Ship to a diffrent address?
                                    </label>
                                    <div className="caption">
                                        <h5 className="mb-2">Address</h5>
                                        <div className="form-group">
                                            <input className="input" type="text" id="ship-street" placeholder="Street" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="text" id="ship-locality" placeholder="Locality" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="text" id="ship-region" placeholder="Region" />
                                        </div>
                                        <div className="form-group">
                                            <h5 className="mb-2">PIN Code</h5>
                                            <input className="input" type="text" id="ship-pin-code" placeholder="PIN Code" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /Shiping Details --> */ }

                            {/* <!-- Order notes --> */ }
                            <div className="order-notes">
                                <textarea id="notes" className="input" placeholder="Order Notes"></textarea>
                            </div>
                            {/* <!-- /Order notes --> */ }
                        </div>

                        {/* <!-- Order Details --> */ }
                        <div className="col-md-5 order-details">
                            <div className="section-title text-center">
                                <h3 className="title">Your Order</h3>
                            </div>
                            <div className="order-summary">
                                <div className="order-col">
                                    <div><strong>PRODUCT</strong></div>
                                    <div><strong>TOTAL</strong></div>
                                </div>
                                <div className="order-products">
                                    { cartData && cartData.products.map((element, i) => (
                                        <div key={ i } className="order-col">
                                            <div>{ element.qty }x { element.name }</div>
                                            <div>&#x20B9;{ element.price * element.qty }</div>
                                        </div>
                                    )) }
                                </div>
                                <div className="order-col">
                                    <div>Shiping</div>
                                    <div><strong>FREE</strong></div>
                                </div>
                                <div className="order-col">
                                    <div><strong>TOTAL</strong></div>
                                    <div><strong className="order-total">&#x20B9;{ totalPrice && totalPrice }</strong></div>
                                </div>
                            </div>
                            <div className="payment-method">
                                <div className="input-radio">
                                    <input type="radio" name="payment" onChange={ (e) => { setPayType(e.target.id) } } checked={ payType === "pay-now" } id="pay-now" />
                                    <label htmlFor="pay-now">
                                        <span></span>
                                        Pay now
                                    </label>
                                    <div className="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                                <div className="input-radio">
                                    <input type="radio" name="payment" onChange={ (e) => { setPayType(e.target.id) } } checked={ payType === "cod" } id="cod" />
                                    <label htmlFor="cod">
                                        <span></span>
                                        Cash on Delivery
                                    </label>
                                    <div className="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <p id="order-message" className="c-red f-16 text-center"></p>
                            <Link to="#" onClick={ placeOrder } className="primary-btn order-submit">Place order</Link>
                        </div>
                        {/* <!-- /Order Details --> */ }
                    </div>
                    {/* <!-- /row --> */ }
                </div>
                {/* <!-- /container --> */ }
            </div>
            {/* <!-- /SECTION --> */ }
        </>
    )
}

export default Checkout