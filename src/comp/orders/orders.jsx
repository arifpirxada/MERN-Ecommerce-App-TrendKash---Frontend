import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/search.css'
import OrderedProducts from './ordered-products';

function Orders() {

    const openOrderProModal = () => {
        document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
        document.querySelector(".orderedProductsModal").style.display = "flex"
        document.querySelector(".products-modal-content").style.marginTop = "-250px"
        setTimeout(() => {
            document.querySelector(".products-modal-content").style.marginTop = "0px"
        }, 0);
    }

    return (
        <>
        <OrderedProducts />
            <div className="mainCategories d-flex">
                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <div className="descContain">
                            <div className="mainCatType mtl-1">Order Id: <p className="dim d-inline c-red">idslkdid$kdslid</p></div>
                            <div className="mainCatType mtl-1">Status: <p className="dim d-inline c-red">Processing</p></div>
                            <div className="mainCatType mtl-1">Date: <p className="dim d-inline c-red">02/04/2023</p></div>
                            <div className="mainCatType mtl-1">Completion Date: <p className="dim d-inline c-red">02/04/2023</p></div>
                            <div className="mainCatCartDesc mtl-1" style={{marginBottom: "10px"}}>
                                <p className="mainCatType mtl-1 d-inline">Address: </p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</div>
                            <p className="mainCatPrice mtl-1 d-inline" >Total Products: 3</p>
                            <p className="mainCatPrice mtl-1 d-inline" >Total Price: ₹199</p>
                            <button className="btn btn-primary r-2 m-2" onClick={openOrderProModal}>View Products</button>
                        </div>
                    </div>
                </Link>

            </div>

        </>
    )
}

export default Orders