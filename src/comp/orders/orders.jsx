import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/search.css'
import EcomContext from '../context/e-com-context';

function Orders() {

    const { uid } = useContext(EcomContext)

    // Fetch orders here ->

    const [orderData, setOrderData] = useState()

    const fetchOrders = async () => {
        if (uid) {
            const res = await fetch(`/api/read-order-half/${uid}`)
            const data = await res.json();
            setOrderData(data)
            if (data.message === "Internal server error") {
                alert(data.message);
            }
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [uid])

    return (
        <>
            <div className="mainCategories d-flex">

                { orderData && orderData.length > 0 ? orderData.map((element, i) => (
                    <div key={ i } className="mainCat">
                        <div className="descContain">
                            <div className="mainCatType mtl-1">Order Id: <p className="dim d-inline">{ element._id }</p></div>
                            <div className="mainCatType mtl-1">Status: <p className="dim d-inline">{ element.status }</p></div>
                            <div className="mainCatType mtl-1">Date: <p className="dim d-inline">{ element.date }</p></div>
                            <div className="mainCatType mtl-1">Payment Type: <p className="dim d-inline">{ element.paymentType }</p></div>
                            <div className="mainCatCartDesc mtl-1 d-flex f-wrap" style={ { marginBottom: "10px", justifyContent: "start" } }>
                                <p className="mainCatType mtl-1 d-inline">Street:&nbsp;{ element.address.street }</p>
                                <p className="mainCatType mtl-1 d-inline">Locality:&nbsp;{ element.address.locality }</p>
                                <p className="mainCatType mtl-1 d-inline">Region:&nbsp;{ element.address.region }</p>
                                <p className="mainCatType mtl-1 d-inline">PINCode:&nbsp;{ element.address.PINCode }</p>
                            </div>
                            { element.shipAddress && element.shipAddress.length > 0 ? <div className="mainCatType mtl-1">Shiping Address:</div> : "" }
                            { element.shipAddress && element.shipAddress.length > 0 ? <div className="mainCatCartDesc mtl-1 d-flex f-wrap" style={ { marginBottom: "10px", justifyContent: "start" } }>
                                <p className="mainCatType mtl-1">Street:&nbsp;{ element.shipAddress.street }</p>
                                <p className="mainCatType mtl-1">Locality:&nbsp;{ element.shipAddress.locality }</p>
                                <p className="mainCatType mtl-1">Region:&nbsp;{ element.shipAddress.region }</p>
                                <p className="mainCatType mtl-1">PINCode:&nbsp;{ element.shipAddress.PINCode }</p>
                            </div> : "" }
                            <p className="mainCatPrice mtl-1 d-inline" >Total Products: { element.products.length }</p>
                            <p className="mainCatPrice mtl-1 d-inline" >Total Price: ₹{ element.totalPrice }</p>
                            <div className="input-radio d-inline">
                                <input type="radio" name="viewProduct" id={ `pay-now${i}` } />
                                <div className="text-center">
                                    <label htmlFor={ `pay-now${i}` } className="btn btn-success r-2 mt-2" style={ { color: "#fff", width: "250px" } }>
                                        {/* <span></span> */ }
                                        View Products
                                    </label>
                                </div>
                                <div className="caption">
                                    {/* Caption */ }
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
                    You order list is empty
                </p> }

            </div>

        </>
    )
}

export default Orders