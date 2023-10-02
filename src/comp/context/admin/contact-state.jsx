import { useEffect, useState } from "react";
import ContactContext from "./contact-context";

function ContactState(props) {

    const [unseen, setUnseen] = useState({})

    const fetchUnseen = async () => {
        try {
            const res = await fetch(`/api/read-contact-view`)
            const data = await res.json()
            setUnseen(data)
        } catch (e) {
            console.log("Error fetching unseen")
        }
    }

    const [pendingOrders, setPendingOrders] = useState()

    const fetchPendingOrders = async () => {
        try {
            const res = await fetch(`/api/read-order-count`)
            const data = await res.json()
            setPendingOrders(data.count)
        } catch {
            console.log("Error fetching unseen")
        }
    }

    useEffect(() => {
        fetchPendingOrders()
        fetchUnseen()
    }, [])

    return (
        <ContactContext.Provider value={{unseen, fetchUnseen, pendingOrders, fetchPendingOrders}} >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState