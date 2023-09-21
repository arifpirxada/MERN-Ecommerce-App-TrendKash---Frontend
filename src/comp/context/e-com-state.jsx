import { useState, useEffect } from "react";
import EcomContext from "./e-com-context";

const EcomState = (props) => {

    // Context for first product slide of home page

    const [firstSlideData, setFirstSlideData] = useState([
        // .not('.slick-initialized')
    ])

    const fetchFirstSlide = async (cat) => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro-cat/${cat}`)
        const data = await res.json()
        setFirstSlideData(data)
    }

    return (
        <EcomContext.Provider value={{ firstSlideData, fetchFirstSlide }}>
            {props.children}
        </EcomContext.Provider>
    )
}

export default EcomState