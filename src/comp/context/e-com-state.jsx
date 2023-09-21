import { useState, useEffect } from "react";
import EcomContext from "./e-com-context";

const EcomState = (props) => {

    function shortProductDesc() {
        let productDesc = document.querySelectorAll(".product-desc")
        productDesc.forEach((element) => {
            let shortDesc = `${element.innerHTML.slice(0, 45)}...`
            element.innerHTML = shortDesc
        })
    }

    // Context for first product slide of home page

    const [firstSlideData, setFirstSlideData] = useState([])

    const fetchFirstSlide = async (cat) => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro-cat/${cat}`)
        const data = await res.json()
        setFirstSlideData(data)
    }

    // Context for second product slide of home page

    const [secondSlideData, setSecondSlideData] = useState([])

    const fetchSecondSlide = async (cat) => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro-cat/${cat}`)
        const data = await res.json()
        setSecondSlideData(data)
    }

    useEffect(() => {
        fetchFirstSlide("FirstTop")
        fetchSecondSlide("SecondTop")
    }, [])

    return (
        <EcomContext.Provider value={{ firstSlideData, fetchFirstSlide, shortProductDesc, secondSlideData, fetchSecondSlide }}>
            {props.children}
        </EcomContext.Provider>
    )
}

export default EcomState