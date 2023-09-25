import { useContext } from 'react'
import '../../assets/signup/style.css'
import { Link } from 'react-router-dom'
import EcomContext from '../context/e-com-context'

function UserProfile({ openSignModal, userData }) {

    const closeModal = () => {
        document.querySelector(".userProfileModal").style.display = "none"
    }

    const { logged, authorize, setCartData } = useContext(EcomContext)

    // Logout User ->

    const logoutUser = async () => {
        const res = await fetch("/api/logout")
        const data = await res.json()
        if (data.message === "Logout successful") {
            setCartData()
            closeModal()
            authorize()
        } else {
            document.getElementById("profile-message").innerHTML = data.message
        }
    }

    return (
        <>
            <div className="container app-modal userProfileModal" >
                <div className="modal-dialog">
                    {/* Form Here -> */}
                    <section className="profile-modal-content modal-content">
                        {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */}
                        <div className="sign-container">
                            <div className="signup-content profile-signup-content">
                                <p className="text-end" onClick={closeModal}><i className="fa fa-close c-pointer f-36"></i></p>

                                <div id="product-tab" style={{ margin: "0" }}>
                                    <ul className="tab-nav" style={{ marginBottom: "5px" }}>
                                        <li className="active"><Link data-toggle="tab" to="#profile-tab">Profile</Link></li>
                                    </ul>
                                    {/* <!-- /product tab nav --> */}

                                    {/* <!-- product tab content --> */}
                                    <div className="tab-content text-center">

                                        {/* <!-- tab1 signup form --> */}
                                        {logged ? <div id="profile-tab" className="tab-pane fade in active">
                                            {userData && <div className="profile-container">
                                                <h2 className="form-title">{userData.name}</h2>
                                                <p className="profile-label d-inline">Email: </p>
                                                <p className="profile-item d-inline">{userData.email}</p>
                                                <div>
                                                    <p className="profile-label d-inline">phone: </p>
                                                    <p className="profile-item d-inline">{userData.phone ? userData.phone : "Not Provided"}</p>
                                                </div>
                                                <Link onClick={logoutUser} to="#">
                                                    <i className="fa fa-user-o mt-2" /> Logout
                                                </Link>
                                                <p id="profile-message" className="profile-label c-red"></p>
                                            </div>}
                                        </div> :
                                            <Link onClick={() => { openSignModal(); closeModal() }} to="#">
                                                <i className="fa fa-user-o" /> Login / Sign up
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>        </>
    )
}

export default UserProfile