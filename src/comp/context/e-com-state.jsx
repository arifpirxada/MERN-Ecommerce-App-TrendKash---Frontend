import { useState, useEffect } from "react";
import EcomContext from "./e-com-context";

const EcomState = (props) => {

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

    // Context for store Here ->

    const [storeData, setStoreData] = useState([])

    const fetchStoreData = async (cat) => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-pro-cat/${cat}`)
        const data = await res.json()
        setStoreData(data)
    }

    // Context for fetching categories

    const [catData, setCatData] = useState([])

    // Fetching Header Cats
    const fetchCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}cat-read-admin`)
        const data = await res.json()
        setCatData(data)
    }

    useEffect(() => {
        fetchFirstSlide("FirstTop")
        fetchSecondSlide("SecondTop")
        fetchCats()
    }, [])

    return (
        <EcomContext.Provider value={{ firstSlideData, fetchFirstSlide, secondSlideData, fetchSecondSlide, storeData, fetchStoreData, catData }}>
            {props.children}
        </EcomContext.Provider>
    )
}

export default EcomState