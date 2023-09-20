import { useEffect, useState } from "react";
import ContactContext from "./contact-context";

function ContactState(props) {

    const [unseen, setUnseen] = useState({})

    const fetchUnseen = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}read-contact-view`)
            const data = await res.json()
            setUnseen(data)
        } catch (e) {
            console.log("Error fetching unseen")
        }
    }

    useEffect(() => {
        fetchUnseen()
    }, [])

    return (
        <ContactContext.Provider value={{unseen, fetchUnseen}} >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState