import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

    const [adminUsers, setAdminUsers] = useState()

    // Fetching admin users
    const fetchUsers = async () => {
        const res = await fetch(`/api/read-admin-users`)
        const data = await res.json()
        setAdminUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    function togglePasswordVisibility(id) {
        var passwordInput = document.getElementById(id);

        if (passwordInput.type === "text") {
            passwordInput.type = "password";
        } else {
            passwordInput.type = "text";
        }
    }



    // Delete admin user->

    const deleteUser = async (e) => {
        const delUserData = {
            id: e.target.parentNode.parentNode.children[0].value
        }

        const req = await fetch(`/api/admin-user-delete`, {
            method: "DELETE",
            body: JSON.stringify(delUserData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()
        if (res.message === "Deletion successful") {
            fetchUsers()
        } else {
            alert(res.message)
        }
    }

    // open add user modal ->

    const openAddUser = () => {
        document.querySelector(".add-admin-user").style.display = "flex"
        document.querySelector(".admin-user-modal-content").style.marginTop = "-250px"
        setTimeout(() => {
            document.querySelector(".admin-user-modal-content").style.marginTop = "0px"
        }, 0);
    }

    const closeAddUser = () => {
        document.querySelector(".add-admin-user").style.display = "none"
    }

    // Create admin user ->

    const createAdminUser = async () => {
        const email = document.getElementById("admin-email").value
        const password = document.getElementById("admin-password").value
        const rePassword = document.getElementById("admin-re_password").value
        const messBox = document.getElementById("admin-user-message")

        // Checking for empty input ->
        if (email === "" || password === "" || rePassword === "") {
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
                            email: email,
                            pass: password
                        }

                        const res = await fetch(`/api/admin-signup`, {
                            method: "POST",
                            body: JSON.stringify(userData),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        const data = await res.json()

                        if (data.message === "Insertion successful") {
                            messBox.innerHTML = "User added successful!"
                            // authorize()
                            fetchUsers()
                            closeAddUser()
                        } else {
                            messBox.innerHTML = data.message
                        }
                    } catch (e) {
                        messBox.innerHTML = "An error occured"
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

    // Logout admin here ->


    const navigate = useNavigate()
    const logoutAdmin = async () => {
        try {
            const res = await fetch("/api/admin-logout")
            const data = await res.json()
            if (data.message === "Logout successful") {
                navigate("/")
            } else {
                alert(data.message)
            }
        } catch {
            alert("An error occured while logging out")
        }
    }

    return (
        <>
            <div className="container text-start keep-aside" style={ { marginTop: "40px" } }>
                <p className="heading ml-2">Admin Users</p>
            </div>
            <hr className="sidenav-hr" style={ { borderTop: "1px solid #f3eaea" } } />
            <div className="container text-end keep-aside">
                <Link onClick={ logoutAdmin } className="m-2" to="#">
                    <i className="fa fa-user-o mt-2" /> Logout
                </Link>
                <button onClick={ openAddUser } className="btn btn-success r-2 ml-2 m-2">New User</button>
            </div>
            <div className="container add-admin-user add-user-container">
                <div className="modal-dialog">
                    {/* Form Here -> */ }
                    <section className="admin-user-modal-content modal-content">
                        {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */ }
                        <div className="sign-container">
                            <div className="signup-content">
                                <p className="text-end"><i onClick={ closeAddUser } className="fa fa-close c-pointer f-36"></i></p>

                                <div id="product-tab" style={ { margin: "0" } }>
                                    <ul className="tab-nav">
                                        <li className="active"><Link id="review-btn" data-toggle="tab" to="#admin-login-tab">New Admin User</Link></li>
                                    </ul>
                                    {/* <!-- /product tab nav --> */ }

                                    {/* <!-- product tab content --> */ }
                                    <div className="tab-content">

                                        {/* tab2 Login form */ }
                                        <div id="admin-login-tab" className="tab-pane fade in active">
                                            <div className="signup-form">
                                                <div className="sign-form-group">
                                                    <input type="email" className="sign-form-input sign-input" id="admin-email" placeholder="Email" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" id="admin-password" placeholder="Password" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="password" className="sign-form-input sign-input" id="admin-re_password" placeholder="Repeat Password" />
                                                </div>
                                                <div className="sign-form-group">
                                                    <input type="checkbox" id="show-log-pass" className="agree-term" />
                                                    <label onClick={ () => { togglePasswordVisibility("admin-password") } } htmlFor="show-log-pass" className="label-agree-term ml-1 d-inline">Show Password</label>
                                                </div>
                                                <p id="admin-user-message" className="label-agree-term text-center c-red"></p>
                                                <div className="sign-form-group">
                                                    <input type="submit" onClick={ createAdminUser } className="sign-form-submit sign-input" value="Add User" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


            {/* List Users -> */ }

            <div className="container keep-aside cat-contain">
                <div className="admin-cats-container">
                    { adminUsers && adminUsers.map((element, i) => (
                        <div key={ i } className="card cat-admin-card">
                            <div className="card-body">
                                <input type="hidden" value={ element._id } />
                                <div className="text-end">
                                    <i onClick={ deleteUser } className="fa fa-trash-o c-pointer c-red"></i>
                                </div>
                                <h5 className="card-title">Email: { element.email }</h5>
                            </div>
                        </div>
                    )) }

                </div>
            </div>

            {/* About us information  */ }

            <div className="container text-start keep-aside" style={ { marginTop: "40px" } }>
                <p className="heading ml-2">About Us</p>
            </div>
            <hr className="sidenav-hr" style={ { borderTop: "1px solid #f3eaea" } } />
        </>
    )
}

export default AdminDashboard