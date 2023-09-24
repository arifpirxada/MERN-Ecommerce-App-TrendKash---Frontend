import { useContext, useEffect, useState } from "react";
import ViewContact from "./view";
import ContactContext from "../../context/admin/contact-context";

function AdminContact() {

    const [contactData, setContactData] = useState([])

    // Fetching Contacts
    const fetchContacts = async () => {
        const res = await fetch(`/api/read-contact`)
        const data = await res.json()
        setContactData(data)
    }

    useEffect(() => {
        fetchContacts()
    }, [])


    // Open view message modal here ->

    const { fetchUnseen } = useContext(ContactContext) // Calling this will update unread number
    const [message, setMessage] = useState()
    const openViewModal = async (e) => {
        document.querySelector(".viewContactModal").style.display = "block"
        setMessage(e.target.parentNode.children[1].value)

        if (e.target.parentNode.children[4].children[0].innerHTML === "Unseen") {
            try {
                const res = await fetch(`/api/update-contact`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        id: e.target.parentNode.children[0].value,
                        view: 1
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()

                if (data.message === "Updation successful") {
                    fetchContacts()
                    fetchUnseen()
                } else {
                    console.log("Internal server error occured")
                }
            } catch (e) {
                console.log("view update error occured")
            }
        }
    }

    // Delete contacts ->

    const deleteContact = async (e) => {
        const delContactData = {
            id: e.target.parentNode.children[0].value
        }

        const req = await fetch(`/api/delete-contact`, {
            method: "DELETE",
            body: JSON.stringify(delContactData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        if (res.message === "Deletion successful") {
            fetchContacts()
        } else {
            alert(res.message)
        }
    }

    return (
        <>
            <ViewContact message={message} />
            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    {(contactData.length !== 0) ? "" : <div className="f-5">
                        No Contacts Found
                    </div>}
                    {contactData.map((element, index) => (
                        <div key={index} className="card cat-admin-card">
                            <div className="card-body">
                                <input type="hidden" value={element._id} />
                                <input type="hidden" value={element.message} />
                                <h5 className="card-title">{element.email}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Date: <p className="text-primary d-inline">{element.date}</p></h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Date: {element.view === 1 ? <p className='text-primary d-inline'>Seen</p> : <p className='text-danger d-inline'>Unseen</p>}</h6>
                                <button onClick={openViewModal} className="btn btn-primary card-link cat-admin-link m-2 r-2">View</button>
                                <button onClick={deleteContact} className="btn btn-danger card-link cat-admin-link m-2 r-2">Delete</button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default AdminContact