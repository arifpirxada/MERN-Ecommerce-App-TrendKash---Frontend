import { useContext } from 'react'
import '../../assets/signup/style.css'
import EcomContext from '../context/e-com-context'

function Contact() {

    const closeModal = () => {
        document.querySelector(".contactModal").style.display = "none"
        document.getElementById("contact-message").value = ""
    }

    const { logged, uid } = useContext(EcomContext)

    // Submit message here ->

    const submitMessage = async () => {
        if (!logged || !uid) {
            closeModal()
            document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
            document.querySelector(".signupModal").style.display = "flex"
            document.querySelector(".signup-modal-content").style.marginTop = "-250px"
            setTimeout(() => {
                document.querySelector(".signup-modal-content").style.marginTop = "0px"
            }, 0);
            return
        }
        const messBox = document.getElementById("contact-messBox")
        const contact = document.getElementById("contact-message").value
        
        // Checking for empty input ->
        if (contact === "") {
            messBox.innerHTML = "Please fill the message box!"
            setTimeout(() => {
                messBox.innerHTML = ""
            }, 5000);
        } else {
            try {
                document.getElementById("contact-spin").classList.toggle("v-hidden")

                const contactData = {
                    uid: uid,
                    message: contact
                }

                const res = await fetch(`/api/create-contact`, {
                    method: "POST",
                    body: JSON.stringify(contactData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()
                messBox.innerHTML = data.message
                document.getElementById("contact-spin").classList.toggle("v-hidden")
                if (data.message === "Insertion successful") {
                    closeModal()
                }
            } catch {
                document.getElementById("contact-spin").classList.toggle("v-hidden")
                messBox.innerHTML = "An Error occured! please try later"
            }
        }

    }

    return (
        <>
            <div className="container app-modal contactModal" >
                <div className="modal-dialog">
                    {/* Form Here -> */ }
                    <section className="contact-modal-content modal-content">
                        {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */ }
                        <div className="sign-container">
                            <div className="signup-content">
                                <p className="text-end"><i onClick={ closeModal } className="fa fa-close c-pointer f-36"></i></p>

                                {/* <!-- /product tab nav --> */ }

                                {/* <!-- product tab content --> */ }
                                <div className="fade in ">
                                    <div className="signup-form">
                                        <div className="sign-form-group">
                                            <textarea className="sign-form-input sign-input" id="contact-message" placeholder="Describe" />
                                        </div>
                                        <p id="contact-messBox" className="label-agree-term text-center c-red"></p>
                                        <div id="contact-spin" className="d-flex v-hidden">
                                            <div className="container text-center w-200 m-2">
                                                <img src="../img/Spinner.gif" width={ 50 } alt="Loading..." />
                                            </div>
                                        </div>
                                        <div className="sign-form-group">
                                            <input onClick={ submitMessage } type="submit" name="submit" className="sign-form-submit sign-input" value="Submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>        </>
    )
}

export default Contact