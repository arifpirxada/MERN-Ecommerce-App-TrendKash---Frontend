import '../../assets/signup/style.css'
import { Link, useNavigate } from 'react-router-dom'

function AdminLogin() {

    function togglePasswordVisibility(id) {
        var passwordInput = document.getElementById(id);

        if (passwordInput.type === "text") {
            passwordInput.type = "password";
        } else {
            passwordInput.type = "text";
        }
    }

    // Admin Login ->
    const navigate = useNavigate()

    const adminLogin = async () => {
        const email = document.getElementById("admin-log-email").value
        const password = document.getElementById("admin-log-password").value
        const messBox = document.getElementById("admin-log-message")

        // Checking for empty input ->
        if (email === "" || password === "") {
            messBox.innerHTML = "Please fill all fields!"
            setTimeout(() => {
                messBox.innerHTML = ""
            }, 5000);
        } else {
            try {

                const loginData = {
                    email: email,
                    pass: password
                }

                const res = await fetch(`/api/admin-login`, {
                    method: "POST",
                    body: JSON.stringify(loginData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()
                messBox.innerHTML = data.message
                if (data.message === "Login success") {
                    navigate("/admin-dashboard")
                }
            } catch (e) {
                messBox.innerHTML = "Some error occured"
            }
        }

    }

    return (
        <>
            <div className="container ad-log-container d-flex">
                <div className="modal-dialog m-0">
                    {/* Form Here -> */ }
                    <section className="signup-modal-content modal-content">
                        {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */ }
                        <div className="sign-container">
                            <div className="signup-content">
                                <Link to="/">
                                    <p className="text-end"><i className="fa fa-close c-pointer f-36"></i></p>
                                </Link>

                                <div id="product-tab" style={ { margin: "0" } }>
                                    <ul className="tab-nav">
                                        <li className="active"><Link id="review-btn" data-toggle="tab" to="#admin-login-tab">Admin Login</Link></li>
                                    </ul>
                                    {/* <!-- /product tab nav --> */ }

                                    {/* <!-- product tab content --> */ }
                                    <div className="tab-content">

                                        {/* tab2 Login form */ }
                                        <div id="admin-login-tab" className="tab-pane fade in active">
                                            <div className="signup-form">
                                                <div className="sign-form-group">
                                                    <input type="email" className="sign-form-input sign-input" id="admin-log-email" placeholder="Your Email" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" id="admin-log-password" placeholder="Password" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="checkbox" id="show-log-pass" className="agree-term" />
                                                    <label onClick={ () => { togglePasswordVisibility("admin-log-password") } } htmlFor="show-log-pass" className="label-agree-term ml-1 d-inline">Show Password</label>
                                                </div>
                                                <p id="admin-log-message" className="label-agree-term text-center c-red"></p>
                                                <div className="sign-form-group">
                                                    <input onClick={ adminLogin } type="submit" name="submit" id="submit" className="sign-form-submit sign-input" value="Log in" />
                                                </div>
                                            </div>
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

export default AdminLogin