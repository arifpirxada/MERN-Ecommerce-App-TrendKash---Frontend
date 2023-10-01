import { useContext } from 'react'
import '../../assets/signup/style.css'
import { Link } from 'react-router-dom'
import EcomContext from '../context/e-com-context'

function OrderedProducts({ openSignModal, userData }) {

    const closeModal = () => {
        document.querySelector(".orderedProductsModal").style.display = "none"
    }

    return (
        <>
            <div className="container app-modal orderedProductsModal" >
                <div className="modal-dialog">
                    {/* Form Here -> */ }
                    <section className="products-modal-content modal-content">


                            {/* cart Here -> */ }

                            <div className="card" style={ { boxShadow: "none" } }>
                                <div className="row-cart">
                                    <div className="col-md-12 cart ordered-container">
                                        <div className="title">
                                            <div className="row-cart">
                                                <p className="text-end" onClick={ closeModal }><i className="fa fa-close c-pointer f-36 m-2"></i></p>
                                                <div className="col">
                                                    <h4><b>Ordered Products</b></h4>
                                                </div>
                                                <div className="col align-self-center text-right text-muted"></div>
                                            </div>
                                            {/* { cartData && `${cartData.products.length} Product(s)` } */ }
                                        </div>

                                        <div className="d-flex f-wrap">
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>
                                            <div className="row-cart border-top border-bottom m-1">
                                                <div className="row-cart main align-items-center cart-item order-product">
                                                    <div className="col-2"><img className="cartImg img-fluid" src={ `/img/product01.png` } /></div>
                                                    <div className="col">
                                                        <Link to={ `/product/` }>
                                                            <div className="row-cart text-muted m-2 text-center">header</div>
                                                        </Link>
                                                    </div>

                                                    <div className="col text-center">&#8377;499</div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* end Here -> */ }
                    </section>

                </div>
            </div>        </>
    )
}

export default OrderedProducts