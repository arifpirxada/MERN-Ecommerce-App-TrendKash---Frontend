import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/search.css'

function Search() {

    function shortDesc() {

        let catDesc = document.querySelectorAll(".shortDesc")
        catDesc.forEach((element) => {
            let shortDesc = element.innerHTML.slice(0, 100) + "..."
            if (document.documentElement.clientWidth < 925 && document.documentElement.clientWidth > 825 || document.documentElement.clientWidth < 500) {
                shortDesc = element.innerHTML.slice(0, 60) + "..."
            }
            element.innerHTML = shortDesc
        })
    }

    useEffect(() => {
        shortDesc()
    }, [])

    return (
        <>
            <div className="mainCategories d-flex">

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">

                            <p className="mainCatType mtl-1">Fashion and clothing</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">
                            <p className="mainCatType mtl-1">Kitenchen</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">

                            <p className="mainCatType mtl-1">Fashion and clothing</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">

                            <p className="mainCatType mtl-1">Fashion and clothing</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">

                            <p className="mainCatType mtl-1">Fashion and clothing</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

                <Link to="#">
                    <div className="mainCat mobile-cart">
                        <img src="\img\product01.png" alt="" />
                        <div className="descContain">

                            <p className="mainCatType mtl-1">Fashion and clothing</p>
                            <p className="mainCatCartDesc shortDesc mtl-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
                                minima
                                nisi quisquam, odio quam eaque totam esse dignissimos obcaecati nam aliquid consectetur
                                dolore
                                tempora blanditiis corporis facilis tenetur vitae sequi alias? Alias, debitis.</p>
                            <p className="mainCatPrice mtl-1">Starting: ₹199</p>
                        </div>
                    </div>
                </Link>

            </div>

            <div className="mainCategories my-mainCategories">
                {/* Pagination */}
                <div className="store-filter clearfix">
                    <span className="store-qty">Showing 20-100 products</span>
                    <ul className="store-pagination">
                        <li className="active">1</li>
                        <li><Link href="#">2</Link></li>
                        <li><Link href="#">3</Link></li>
                        <li><Link href="#">4</Link></li>
                        <li><Link href="#"><i className="fa fa-angle-right"></i></Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Search