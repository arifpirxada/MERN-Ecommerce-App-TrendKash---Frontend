import { React, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EcomContext from "../context/e-com-context";

function Store(props) {

	// Show filters Here ->

	const showFilters = () => {
		const aside = document.querySelectorAll(".aside")
		aside.forEach(element => {
			element.classList.toggle("aside-none")
		});
	}

	// Fetching Starts Here ->

	const { category } = useParams()
	const [priceSort, setPriceSort] = useState()
	const { storeData, fetchStoreData, catData, filterStoreData, sortPriceStoreData } = useContext(EcomContext)

	useEffect(() => {
		if (!priceSort) {
			fetchStoreData(category)
		} else {
			sortPriceStoreData(filterCat, priceSort, category)
		}
	}, [category])

	// Script for making the category filter work ->

	const [filterCat, setFilterCat] = useState([])

	useEffect(() => {
		if (filterCat.length > 0 && !priceSort) {
			filterStoreData(filterCat)
		} else if (priceSort) {
			sortPriceStoreData(filterCat, priceSort, category)
		} else {
			fetchStoreData(category)
		}
	}, [filterCat])

	const updateFilterCat = (e) => {
		const cat = e.target.parentNode.children[0].id
		if (e.target.parentNode.children[0].checked) {
			const updatedFilter = filterCat.filter(item => item !== cat)
			setFilterCat(updatedFilter)
		} else {
			setFilterCat([...filterCat, cat])
		}
	}

	// Script for sorting products according to price ->

	useEffect(() => {
		priceSort && sortPriceStoreData(filterCat, priceSort, category)
	}, [priceSort])

	return (
		<>
			{/* <!-- SECTION --> */}
			<div className="section">
				{/* <!-- container --> */}
				<div className="container">
					{/* <!-- row --> */}
					<div className="row">
						{/* <!-- ASIDE --> */}
						<div id="aside" className="col-md-3">
							{/* <!-- aside Widget --> */}
							<div className="aside aside-none">
								<h3 className="aside-title">Categories</h3>
								<div className="checkbox-filter">

									{catData.map((element, i) => (
										<div key={i} className="input-checkbox">
											<input type="checkbox" id={element.catName} />
											<label onClick={updateFilterCat} htmlFor={element.catName}>
												<span></span>
												{element.catName}
											</label>
										</div>
									))}

								</div>
							</div>
							{/* <!-- /aside Widget --> */}

							{/* <!-- aside Widget --> */}
							<div className="aside aside-none">
								<h3 className="aside-title">Price</h3>
								<div className="price-filter">
									<div className="input-checkbox">
										<input type="radio" name="price-sort" id="high-price" />
										<label onClick={() => { setPriceSort(-1) }} htmlFor="high-price">
											<span></span>
											HIGH TO LOW
										</label>
									</div>
									<div className="input-checkbox">
										<input type="radio" name="price-sort" id="low-price" />
										<label onClick={() => { setPriceSort(1) }} htmlFor="low-price">
											LOW TO HIGH
										</label>
									</div>
								</div>
							</div>
							{/* <!-- /aside Widget --> */}

							{/* <!-- aside Widget --> */}
							{/* <div className="aside aside-none">
								<h3 className="aside-title">Brand</h3>
								<div className="checkbox-filter">
									<div className="input-checkbox">
										<input type="checkbox" id="brand-1" />
										<label htmlFor="brand-1">
											<span></span>
											SAMSUNG
											<small>(578)</small>
										</label>
									</div>
									<div className="input-checkbox">
										<input type="checkbox" id="brand-2" />
										<label htmlFor="brand-2">
											<span></span>
											LG
											<small>(125)</small>
										</label>
									</div>
									<div className="input-checkbox">
										<input type="checkbox" id="brand-3" />
										<label htmlFor="brand-3">
											<span></span>
											SONY
											<small>(755)</small>
										</label>
									</div>
									<div className="input-checkbox">
										<input type="checkbox" id="brand-4" />
										<label htmlFor="brand-4">
											<span></span>
											SAMSUNG
											<small>(578)</small>
										</label>
									</div>
									<div className="input-checkbox">
										<input type="checkbox" id="brand-5" />
										<label htmlFor="brand-5">
											<span></span>
											LG
											<small>(125)</small>
										</label>
									</div>
									<div className="input-checkbox">
										<input type="checkbox" id="brand-6" />
										<label htmlFor="brand-6">
											<span></span>
											SONY
											<small>(755)</small>
										</label>
									</div>
								</div>
							</div> */}
							{/* <div className="aside aside-none product-details">
								<div className="add-to-cart">
									<button className="add-to-cart-btn apply-filter-btn"><i className="fa fa-shopping-cart"></i> Apply Filters</button>
								</div>
							</div> */}

						</div>
						{/* <!-- /ASIDE --> */}

						{/* <!-- STORE --> */}
						<div id="store" className="col-md-9">
							{/* <!-- store top filter --> */}
							<div className="store-filter clearfix">
								<div className="store-sort">
									<label>
										<div className="product-details">
											<div className="add-to-cart">
												<button onClick={showFilters} className="add-to-cart-btn add-filter-btn"><i className="fa fa-shopping-cart"></i> Filters</button>
											</div>
										</div>
									</label>
									<label>
										Sort By:
										<select className="input-select">
											<option value="0">Popular</option>
											<option value="1">Position</option>
										</select>
									</label>
								</div>
								<ul className="store-grid">
									<li className="active"><i className="fa fa-th"></i></li>
									<li><Link href="#"><i className="fa fa-th-list"></i></Link></li>
								</ul>
							</div>
							{/* <!-- /store top filter --> */}

							{/* <!-- store products --> */}
							<div className="row d-flex" style={{ flexWrap: "wrap" }}>

								{/* Product */}
								{storeData.map((element, i) => (
									< div key={i} className="product store-product" >
										<div className="product-img">
											<img src={`/api/read-pro-img/${element.img[0]}`} alt="" />
											<div className="product-label">
												{element.disPercentage && <span className="sale">{`-${element.disPercentage}%`}</span>}
												<span className="new">NEW</span>
											</div>
										</div>
										<div className="product-body">
											<h3 className="product-name"><Link onClick={() => { window.scrollTo(0, 140) }} to={`/product/${element._id}`}>{element.name}</Link></h3>
											<h4 className="product-price d-inline">₹{element.price}
												<del className="product-old-price" style={{ marginLeft: "3px" }}>{element.oldPrice && `₹${element.oldPrice}`}</del>
											</h4>
											{(element.ratings.length > 0) ?
												<div className="product-rating d-inline">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div> : ""}
											<div className="product-desc d-inline">
												{element.desc.length > 0 ? `${element.desc.slice(0, 45)}...` : ""}
											</div>
										</div>
									</div>
								))}
								{/* Product */}
							</div>
							{/* <!-- /store products --> */}

							{/* <!-- store bottom filter --> */}
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
							{/* <!-- /store bottom filter --> */}
						</div>
						{/* <!-- /STORE --> */}
					</div>
					{/* <!-- /row --> */}
				</div>
				{/* <!-- /container --> */}
			</div >
			{/* <!-- /SECTION --> */}
		</>
	)
}




export default Store