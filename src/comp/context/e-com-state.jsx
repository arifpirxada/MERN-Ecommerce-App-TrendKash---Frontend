import { useState, useEffect } from "react";
import EcomContext from "./e-com-context";
import Product from "../product/product";

const EcomState = (props) => {

    // Context for first product slide of home page

    const [firstSlideData, setFirstSlideData] = useState([])

    const fetchFirstSlide = async (cat) => {
        const res = await fetch(`/api/read-pro-cat/${cat}`)
        const data = await res.json()
        setFirstSlideData(data)
    }

    // Context for second product slide of home page

    const [secondSlideData, setSecondSlideData] = useState([])

    const fetchSecondSlide = async (cat) => {
        const res = await fetch(`/api/read-pro-cat/${cat}`)
        const data = await res.json()
        setSecondSlideData(data)
    }

    // Context for store Here ->

    const [storeData, setStoreData] = useState([])

    const fetchStoreData = async (cat) => {
        const res = await fetch(`/api/read-pro-cat/${cat}`)
        const data = await res.json()
        setStoreData(data)
    }

    const filterStoreData = async (cat) => {
        const res = await fetch(`/api/read-pro-filter-cat`, {
            method: "POST",
            body: JSON.stringify({ categories: cat }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setStoreData(data)
    }

    const sortPriceStoreData = async (cat, priceSort, defaultCategory) => {
        const res = await fetch(`/api/read-pro-sort-price`, {
            method: "POST",
            body: JSON.stringify({ categories: cat, priceSort: priceSort, defaultCat: defaultCategory }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setStoreData(data)
    }

    // Context for fetching categories

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`/api/cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchFirstSlide("FirstTop")
        fetchSecondSlide("SecondTop")
        fetchCats()
    }, [])

    // Fetch Related Products

    const [relatedProducts, setRelatedProducts] = useState()

    const fetchRelatedProducts = async (cats, id) => {
        const res = await fetch(`/api/read-pro-related`, {
            method: "POST",
            body: JSON.stringify({ categories: cats, id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setRelatedProducts(data)
    }

    // Function to authorize a user ->

    const [logged, setLogged] = useState(false)
    const [uid, setUid] = useState()

    const authorize = async () => {
        const res = await fetch("/api/authorization")
        const data = await res.json()
        if (data.message === "logged") {
            setLogged(true)
            setUid(data.uid)
        } else {
            setLogged(false)
            setUid()
        }
    }

    useEffect(() => {
        authorize()
    }, [])

    // Fetch Cart Products Here ->

    const [cartData, setCartData] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalItems, setTotalItems] = useState()

    const fetchCartData = async () => {
        if (uid && logged) {
            try {
                const res = await fetch(`/api/read-cart-data/${uid}`)
                const data = await res.json()
                if (data.message !== "No data") {
                    setCartData(data)
                    var updatePrice = 0
                    var updateItems = 0
                    data.products.forEach(element => {
                        updatePrice += element.price * element.qty
                        updateItems += parseInt(element.qty)
                    })
                    setTotalPrice(updatePrice)
                    setTotalItems(updateItems)
                } else if (data.message === "No data") {
                    setCartData()
                }
            } catch (e) {
                console.error("cart err", e)
            }
        }
    }

    const updateCartQty = async (e) => {
        if (uid && logged) {
            try {
                const updateData = {
                    uid: uid,
                    pid: e.target.getAttribute("data-pid"),
                    qty: e.target.value
                }
                const res = await fetch(`/api/update-cart-qty`, {
                    method: "PATCH",
                    body: JSON.stringify(updateData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                if (data.message === "Updation successful") {
                    fetchCartData()
                } else {
                    alert(data.message)
                }
            } catch (e) {
                console.error("update qty err")
            }
        }
    }

    const delCartProduct = async (e) => {
        if (uid && logged) {
            try {
                const delData = {
                    uid: uid,
                    pid: e.currentTarget.getAttribute("data-pid")
                }
                const res = await fetch(`/api/delete-cart-product`, {
                    method: "DELETE",
                    body: JSON.stringify(delData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                if (data.message === "Deletion successful") {
                    fetchCartData()
                } else {
                    alert(data.message)
                }
            } catch (e) {
                console.error("delete cart product err", e)
            }
        }
    }

    useEffect(() => {
        fetchCartData()
    }, [uid])

    return (
        <EcomContext.Provider value={{ firstSlideData, fetchFirstSlide, secondSlideData, fetchSecondSlide, storeData, fetchStoreData, catData, relatedProducts, fetchRelatedProducts, filterStoreData, sortPriceStoreData, logged, uid, authorize, cartData, fetchCartData, updateCartQty, delCartProduct, totalPrice, totalItems, setCartData }}>
            {props.children}
        </EcomContext.Provider>
    )
}

export default EcomState