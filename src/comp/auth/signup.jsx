import { useContext, useState } from 'react'
import '../../assets/signup/style.css'
import { Link } from 'react-router-dom'
import EcomContext from '../context/e-com-context'

function SignUp() {

    const closeModal = () => {
        document.querySelector(".signupModal").style.display = "none"
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("log-email").value = ""
        document.getElementById("password").value = ""
        document.getElementById("log-password").value = ""
        document.getElementById("re_password").value = ""
        document.getElementById("sign-message").innerHTML = ""
        document.getElementById("log-message").innerHTML = ""
    }

    function togglePasswordVisibility(id) {
        var passwordInput = document.getElementById(id);

        if (passwordInput.type === "text") {
            passwordInput.type = "password";
        } else {
            passwordInput.type = "text";
        }
    }

    // for spinner ->

    const [spin, setSpin] = useState(false)

    // Authorize after signup or login ->

    const { authorize } = useContext(EcomContext)

    // Create user ->

    const userSignup = async () => {
        document.getElementById("sign-spin").style.visibility = ""
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const rePassword = document.getElementById("re_password").value
        const messBox = document.getElementById("sign-message")

        // Checking for empty input ->
        if (name === "" || email === "" || password === "" || rePassword === "") {
            messBox.innerHTML = "Please fill all fields!"
            setTimeout(() => {
                messBox.innerHTML = ""
            }, 5000);
        } else {
            // Email validation ->
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (emailPattern.test(email)) {

                // Password validation ->
                if (password === rePassword) {
                    try {

                        const userData = {
                            name: name,
                            email: email,
                            pass: password
                        }

                        const res = await fetch(`/api/signup`, {
                            method: "POST",
                            body: JSON.stringify(userData),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        const data = await res.json()

                        if (data.message === "Insertion successful") {
                            messBox.innerHTML = "Sign up successful!"
                            authorize()
                            closeModal()
                            document.getElementById("sign-spin").style.visibility = "hidden"
                        } else {
                            messBox.innerHTML = data.message
                        }
                    } catch (e) {
                        messBox.innerHTML = "Some error occured"
                    }

                } else {
                    messBox.innerHTML = "Passwords do not match!"
                    setTimeout(() => {
                        messBox.innerHTML = ""
                    }, 5000);
                }
            } else {
                messBox.innerHTML = "Please enter a valid email!"
                setTimeout(() => {
                    messBox.innerHTML = ""
                }, 5000);
            }
        }

    }

    // Login user ->

    const userLogin = async () => {
        document.getElementById("log-spin").style.visibility = ""
        const email = document.getElementById("log-email").value
        const password = document.getElementById("log-password").value
        const messBox = document.getElementById("log-message")

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

                const res = await fetch(`/api/login`, {
                    method: "POST",
                    body: JSON.stringify(loginData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()

                messBox.innerHTML = data.message
                if (data.message === "Login success") {
                    authorize()
                    closeModal()
                    document.getElementById("log-spin").style.visibility = "hidden"
                }
            } catch {
                messBox.innerHTML = "Some error occured"
            }
        }

    }

    return (
        <>
            <div className="container app-modal signupModal" >
                <div className="modal-dialog">
                    {/* Form Here -> */ }
                    <section className="signup-modal-content modal-content">
                        {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */ }
                        <div className="sign-container">
                            <div className="signup-content">
                                <p className="text-end" onClick={ closeModal }><i className="fa fa-close c-pointer f-36"></i></p>

                                <div id="product-tab" style={ { margin: "0" } }>
                                    <ul className="tab-nav">
                                        <li className="active"><Link data-toggle="tab" to="#signup-tab">Sign up</Link></li>
                                        <li><Link id="review-btn" data-toggle="tab" to="#login-tab">Login</Link></li>
                                    </ul>
                                    {/* <!-- /product tab nav --> */ }

                                    {/* <!-- product tab content --> */ }
                                    <div className="tab-content">

                                        {/* <!-- tab1 signup form --> */ }
                                        <div id="signup-tab" className="tab-pane fade in active">
                                            <div id="signup-form" className="signup-form">
                                                <h2 className="form-title sign-h2">Create account</h2>
                                                <div className="sign-form-group">
                                                    <input type="text" className="sign-form-input sign-input" id="name" placeholder="Your Name" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="email" className="sign-form-input sign-input" id="email" placeholder="Your Email" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" name="password" id="password" placeholder="Password" />
                                                    <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" id="re_password" placeholder="Repeat your password" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="checkbox" id="show-pass" className="agree-term" />
                                                    <label onClick={ () => { togglePasswordVisibility("password") } } htmlFor="show-pass" className="label-agree-term ml-1 d-inline">Show Password</label>
                                                </div>
                                                <p id="sign-message" className="label-agree-term text-center c-red"></p>
                                                <div id="sign-spin" className="d-flex" style={ { visibility: "hidden" } }>
                                                    <div className="container text-center m-2 w-200">
                                                        <img src="../img/Spinner.gif" width={ 50 } alt="Loading..." />
                                                    </div>
                                                </div>
                                                <div onClick={ userSignup } className="sign-form-group">
                                                    <input type="submit" id="submit" className="sign-form-submit sign-input" value="Sign up" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* tab2 Login form */ }
                                        <div id="login-tab" className="tab-pane fade in">
                                            <div className="signup-form">
                                                <div className="sign-form-group">
                                                    <input type="email" className="sign-form-input sign-input" id="log-email" placeholder="Your Email" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" id="log-password" placeholder="Password" />
                                                    <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="checkbox" id="show-log-pass" className="agree-term" />
                                                    <label onClick={ () => { togglePasswordVisibility("log-password") } } htmlFor="show-log-pass" className="label-agree-term ml-1 d-inline">Show Password</label>
                                                </div>
                                                <p id="log-message" className="label-agree-term text-center c-red"></p>
                                                <div id="log-spin" className="d-flex" style={ { visibility: "hidden" } }>
                                                    <div className="container text-center w-200 m-2">
                                                        <img src="../img/Spinner.gif" width={ 50 } alt="Loading..." />
                                                    </div>
                                                </div>
                                                <div className="sign-form-group">
                                                    <input onClick={ userLogin } type="submit" name="submit" id="submit" className="sign-form-submit sign-input" value="Log in" />
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

export default SignUp