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

    // Fetch about data here ->

    const [aboutData, setAboutData] = useState([])
    const [aboutUs, setAboutUs] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [id, setId] = useState("")

    const handleAboutUS = (e) => {
        setAboutUs(e.target.value.slice(0, 100))
    }

    const fetchAbout = async () => {
        try {
            const res = await fetch(`/api/read-about`)
            const data = await res.json()
            setAboutData(data)
            if (data.length > 0) {
                setAboutUs(data[0].aboutUs)
                setEmail(data[0].email)
                setPhone(data[0].phone)
                setAddress(data[0].address)
                setId(data[0]._id)
            }
        } catch {
            console.error("Error while fetching about data")
        }
    }

    useEffect(() => {
        fetchAbout()
    }, [])

    // update about us here ->

    const updateAboutUs = async () => {
        const messBox = document.getElementById("admin-about-message")

        if (aboutData && aboutData.length === 0) {
            // If there is no about document, then create

            const abData = {
                email: email,
                phone: phone,
                address: address,
                aboutUs: aboutUs
            }
            try {
                const req = await fetch(`/api/create-about`, {
                    method: "POST",
                    body: JSON.stringify(abData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const res = await req.json()
                messBox.innerHTML = res.message
                setTimeout(() => {
                    messBox.innerHTML = ""
                }, 4000);
                if (res.message === "Insertion successful") {
                    fetchAbout()
                }
            } catch (e) {
                alert("Error while updating about us data")
            }
        } else {
            // If there is an about document, then update it

            const abData = {
                id: id,
                email: email,
                phone: phone,
                address: address,
                aboutUs: aboutUs
            }
            try {
                const req = await fetch(`/api/update-about`, {
                    method: "PATCH",
                    body: JSON.stringify(abData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const res = await req.json()
                messBox.innerHTML = res.message
                setTimeout(() => {
                    messBox.innerHTML = ""
                }, 4000);
                if (res.message === "Updation successful") {
                    fetchAbout()
                }
            } catch (e) {
                alert("An error occured while updating about us data")
            }
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

            <hr className="sidenav-hr mt-2" style={ { borderTop: "1px solid #f3eaea" } } />
            <div className="container text-start keep-aside" style={ { marginTop: "40px" } }>
                <p className="heading ml-2">About Us</p>
            </div>

            <div className="keep-aside">
                {/* Form Here -> */ }
                <section className="w-100 modal-content" style={ { boxShadow: "none" } }>
                    {/* <!-- <img src="images/signup-bg.jpg" alt=""> --> */ }
                    <div className="sign-container">
                        <div className="signup-content" style={ { paddingTop: "20px" } }>
                            {/* <!-- /product tab nav --> */ }

                            {/* <!-- product tab content --> */ }
                            <div className="tab-content">

                                {/* tab2 Login form */ }
                                <div className="signup-form">
                                    <div className="sign-form-group">
                                        <input type="email" className="sign-form-input sign-input" id="about-email" value={ email && email } onChange={ (e) => { setEmail(e.target.value) } } placeholder="Email" />
                                    </div>
                                    <div className="sign-form-group">
                                        <input type="number" className="sign-form-input sign-input" id="about-phone" value={ phone && phone } onChange={ (e) => { setPhone(e.target.value) } } placeholder="Phone" />
                                    </div>
                                    <div className="sign-form-group">
                                        <input type="text" className="sign-form-input sign-input" id="about-address" value={ address && address } onChange={ (e) => { setAddress(e.target.value) } } placeholder="Address" />
                                    </div>
                                    <div className="sign-form-group">
                                        <textarea rows={ 3 } type="text" className="sign-form-input sign-input" id="about-us" value={ aboutUs && aboutUs } onChange={ handleAboutUS } placeholder="About Us" />
                                        <p className="label-agree-term ml-1 d-inline">About Us should be less than 100 characters ({ aboutUs && aboutUs.length }/100)</p>
                                    </div>
                                    <p id="admin-about-message" className="label-agree-term text-center c-red"></p>
                                    <div className="sign-form-group" style={ { marginTop: "30px" } }>
                                        <input type="submit" onClick={ updateAboutUs } className="sign-form-submit sign-input" value="Update About Us" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AdminDashboard