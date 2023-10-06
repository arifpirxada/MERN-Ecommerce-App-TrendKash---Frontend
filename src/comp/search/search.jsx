import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EcomContext from '../context/e-com-context'

function Search() {

    // Search products Here ->

    const { calcAvgRating, topProgress } = useContext(EcomContext)
    const [searchData, setSearchData] = useState()
    const { query } = useParams()

    const search = async () => {
        try {
            topProgress(70)
            const res = await fetch(`/api/search-pro/${query}`)
            topProgress(90)
            const data = await res.json()
            topProgress(100)
            setSearchData(data)
        } catch {
            alert("An error occured while searching the product")
        }
    }

    useEffect(() => {
        search()
    }, [query])

    return (
        <>

            <div className="row d-flex f-wrap">

                {/* Product */ }
                { searchData && searchData.length > 0 ? searchData.map((element, i) => (
                    < div key={ i } className="product store-product" >
                        <div className="product-img">
                            <img src={ `/api/read-pro-img/${element.img[0]}` } alt="" />
                            <div className="product-label">
                                { element.disPercentage && <span className="sale">{ `-${element.disPercentage}%` }</span> }
                                <span className="new">NEW</span>
                            </div>
                        </div>
                        <div className="product-body">
                            <h3 className="product-name"><Link onClick={ () => { window.scrollTo(0, 140) } } to={ `/product/${element._id}` }>{ element.name }</Link></h3>
                            <h4 className="product-price d-inline">₹{ element.price }
                                <del className="product-old-price" style={ { marginLeft: "3px" } }>{ element.oldPrice && `₹${element.oldPrice}` }</del>
                            </h4>
                            { (element.ratings.length > 0) ?
                                <div className="product-rating">
                                    <p className="d-inline f-5 mr-1">{ calcAvgRating(element.ratings) }</p>
                                    <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 1 ? "" : "-o"}` }></i>
                                    <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 2 ? "" : "-o"}` }></i>
                                    <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 3 ? "" : "-o"}` }></i>
                                    <i className={ `fa fa-star${calcAvgRating(element.ratings) >= 4 ? "" : "-o"}` }></i>
                                    <i className={ `fa fa-star${calcAvgRating(element.ratings) == 5 ? "" : "-o"}` }></i>
                                </div> : "" }
                            <div className="product-desc d-inline">
                                { element.desc.length > 0 ? `${element.desc.slice(0, 45)}...` : "" }
                            </div>
                        </div>
                    </div>
                )) : <div id="noProduct">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                            <h2>We couldn't find the Product</h2>
                        </div>
                        <Link to="/">Go TO Homepage</Link>
                    </div>
                </div> }
                {/* Product */ }
            </div>

            {/* Pagination */ }
            <div className="container store-filter clearfix mt-2">
                <span className="store-qty">Showing 20-100 products</span>
                <ul className="store-pagination">
                    <li className="active">1</li>
                    <li><Link href="#">2</Link></li>
                    <li><Link href="#">3</Link></li>
                    <li><Link href="#">4</Link></li>
                    <li><Link href="#"><i className="fa fa-angle-right"></i></Link></li>
                </ul>
            </div>
        </>
    )
}

export default Search