import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/search.css'
import ContactContext from '../../context/admin/contact-context'

function AdminOrders() {

    // Fetch orders here ->

    const [orderData, setOrderData] = useState()

    const fetchOrders = async () => {
        const res = await fetch(`/api/read-order`)
        const data = await res.json();
        setOrderData(data)
        if (data.message === "Internal server error") {
            alert(data.message);
        }
    }

    const filterOrders = async (e) => {
        const status = e.target.id
        console.log(status)
        const res = await fetch(`/api/read-order-filter/${status}`)
        const data = await res.json();
        setOrderData(data)
        console.log(data)
        if (data.message === "Internal server error") {
            alert(data.message);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const { fetchPendingOrders } = useContext(ContactContext)

    // Update Order status Here ->

    const updateOrderStatus = async (e) => {
        try {
            const res = await fetch("/api/update-order", {
                method: "PATCH",
                body: JSON.stringify(
                    {
                        id: e.target.getAttribute("data-oid"),
                        status: e.target.value
                    }
                ),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.message === "Updation successful") {
                fetchOrders()
                fetchPendingOrders()
            } else {
                alert("Internal server error occured")
            }
        } catch {
            alert("An error occured while updating order status")
        }
    }

    return (
        <>
            <div className="container keep-aside d-flex f-wrap" style={ { justifyContent: "end" } }>
                <div className="input-radio m-2 ml-2">
                    <input onChange={ filterOrders } type="radio" name="orderFilter" id="Pending" />
                    <label htmlFor="Pending">
                        <span></span>
                        Pending
                    </label>
                </div>
                <div className="input-radio m-2 ml-2">
                    <input onChange={ filterOrders } type="radio" name="orderFilter" id="Processing" />
                    <label htmlFor="Processing">
                        <span></span>
                        Processing
                    </label>
                </div>
                <div className="input-radio m-2 ml-2">
                    <input onChange={ filterOrders } type="radio" name="orderFilter" id="Shipped" />
                    <label htmlFor="Shipped">
                        <span></span>
                        Shipped
                    </label>
                </div>
                <div className="input-radio m-2 ml-2">
                    <input onChange={ filterOrders } type="radio" name="orderFilter" id="Delivered" />
                    <label htmlFor="Delivered">
                        <span></span>
                        Delivered
                    </label>
                </div>
            </div>
            <div className="mainCategories d-flex">
                { orderData && orderData.length > 0 ? orderData.map((element, i) => (
                    <div key={ i } className="mainCat keep-aside adminMainCat">
                        <div className="descContain">
                            <div className="col text-end m-2">
                                <select defaultValue={ element.status } onChange={ updateOrderStatus } data-oid={ element._id } className="input-select mb-1 h-2 c-black">
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                            <div className="mainCatType mtl-1">Order Id: <p className="dim d-inline">{ element._id }</p></div>
                            <div className="mainCatType mtl-1">Status: <p className="dim d-inline">{ element.status }</p></div>
                            <div className="mainCatType mtl-1">Phone: <p className="dim d-inline">{ element.phone }</p></div>
                            <div className="mainCatType mtl-1">Date: <p className="dim d-inline">{ element.date }</p></div>
                            <div className="mainCatType mtl-1">Payment Type: <p className="dim d-inline">{ element.paymentType }</p></div>
                            <div className="mainCatCartDesc mtl-1 d-flex f-wrap" style={ { marginBottom: "10px", justifyContent: "start" } }>
                                <p className="mainCatType mtl-1 d-inline">Street:&nbsp;{ element.address.street }</p>
                                <p className="mainCatType mtl-1 d-inline">Locality:&nbsp;{ element.address.locality }</p>
                                <p className="mainCatType mtl-1 d-inline">Region:&nbsp;{ element.address.region }</p>
                                <p className="mainCatType mtl-1 d-inline">PINCode:&nbsp;{ element.address.PINCode }</p>
                            </div>
                            <p className="mainCatPrice mtl-1 d-inline" >Total Products: { element.products.length }</p>
                            <p className="mainCatPrice mtl-1 d-inline" >Total Price: ₹{ element.totalPrice }</p>
                            <div className="input-radio d-inline">
                                <input type="radio" name="viewProduct" id={ `pay-now${i}` } />
                                <div className="text-center">
                                    <label htmlFor={ `pay-now${i}` } className="btn btn-success r-2 mt-2" style={ { color: "#fff", width: "250px" } }>
                                        View More
                                    </label>
                                </div>
                                <div className="caption">
                                    {/* Caption */ }
                                    <div className="mainCatType mtl-1">Completion Date: <p className="dim d-inline">{ element.completionDate }</p></div>
                                    <div className="mainCatType mtl-1">Notes: <p className="dim d-inline">{ element.notes }</p></div>
                                    <div className="mainCatType mtl-1">Payment Status: <p className="dim d-inline">{ element.paymentStatus }</p></div>
                                    <div className="mainCatType mtl-1">User: <p className="dim d-inline">{ element.user }</p></div>
                                    { element.shipAddress && element.shipAddress.length > 0 ? <div className="mainCatType mtl-1">Shiping Address:</div> : "" }
                                    { element.shipAddress && element.shipAddress.length > 0 ? <div className="mainCatCartDesc mtl-1 d-flex f-wrap" style={ { marginBottom: "10px", justifyContent: "start" } }>
                                        <p className="mainCatType mtl-1">Street:&nbsp;{ element.shipAddress.street }</p>
                                        <p className="mainCatType mtl-1">Locality:&nbsp;{ element.shipAddress.locality }</p>
                                        <p className="mainCatType mtl-1">Region:&nbsp;{ element.shipAddress.region }</p>
                                        <p className="mainCatType mtl-1">PINCode:&nbsp;{ element.shipAddress.PINCode }</p>
                                    </div> : "" }
                                    <div className="mainCatType mtl-1">History:</div>
                                    <div className="mainCatCartDesc mtl-1 d-flex f-wrap" style={ { marginBottom: "10px", justifyContent: "start" } }>
                                        { element.history.map((item, i) => (
                                            <div key={ i } className="d-flex">
                                                <p className="mainCatType mtl-1">Status:&nbsp;{ item.status }</p>
                                                <p className="mainCatType mtl-1">Date:&nbsp;{ item.date }</p>
                                            </div>
                                        )) }
                                    </div>
                                    <div className="row d-flex" style={ { flexWrap: "wrap" } }>

                                        {/* Product */ }
                                        { orderData && orderData[i].products.map((element, i) => (
                                            < div key={ i } className="product store-product" >
                                                <div className="product-img">
                                                    <img src={ `/api/read-pro-img/${element.img}` } alt="" />
                                                </div>
                                                <div className="product-body">
                                                    <h3 className="product-name"><Link onClick={ () => { window.scrollTo(0, 140) } } to={ `/product/${element.pid}` }>{ element.name }</Link></h3>
                                                    <h4 className="product-price d-inline">₹{ element.price }</h4>
                                                    <h4 className="d-inline">Qty: { element.qty }</h4>
                                                </div>
                                            </div>
                                        )) }
                                        {/* Product */ }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center no-review-container c-red">
                    No Orders Yet
                </p> }

            </div>

        </>
    )
}

export default AdminOrders