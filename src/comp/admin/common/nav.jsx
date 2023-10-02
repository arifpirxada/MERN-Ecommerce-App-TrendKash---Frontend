import { React, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import '../../../assets/admin.css'
import '../../../js/admin'
import ContactContext from "../../context/admin/contact-context"

function Nav(props) {

    function toggleNav() {
        var sideNav = document.getElementById("mySidenav");
        var mainContent = document.querySelectorAll(".keep-aside");
        const docHeight = document.documentElement.clientWidth

        if (docHeight <= 900) {
            const leftham = document.querySelector(".left-ham")
            const rightham = document.querySelector(".right-ham")
            const unreadShow = document.querySelector(".unread-qty")

            if (sideNav.style.width === "0px" || sideNav.style.width === "") {
                sideNav.style.width = "250px";
                leftham.style.marginLeft = "250px"
                rightham.style.display = "none"
                unreadShow.style.display = "block"
            } else {
                sideNav.style.width = "0px";
                leftham.style.marginLeft = "0px"
                rightham.style.display = "block"
                unreadShow.style.display = "none"
            }

        } else {
            if (sideNav.style.width === "70px" || sideNav.style.width === "") {
                sideNav.style.width = "250px";
                mainContent.forEach(element => {
                    element.style.marginLeft = "250px"
                });
            } else {
                sideNav.style.width = "70px";
                mainContent.forEach(element => {
                    element.style.marginLeft = "70px"
                });
            }
        }
    }

    function toggleRightNav() {
        const nav = document.querySelector(".right-nav-links")
        const hambur = document.querySelector(".right-ham")

        if (!nav.classList[2]) {
            nav.style.height = "0px"
            setTimeout(() => {
                hambur.style.marginBottom = "0px"
                nav.classList.toggle('right-none')
            }, 100);
        } else {
            hambur.style.marginLeft = "50px"
            nav.classList.toggle('right-none')
            setTimeout(() => {
                hambur.style.marginBottom = "15px"
                nav.style.height = "160px"
            }, 100);
        }
        const navItems = document.querySelectorAll(".riNav")
        setTimeout(() => {
            navItems.forEach(element => {
                element.classList.toggle("right-none")
            });
        }, 300);
    }

    function checknav() {
        const sideNav = document.getElementById("mySidenav");
        const mainContent = document.querySelectorAll(".keep-aside");

        if (sideNav.style.width === "250px") {
            mainContent.forEach(element => {
                element.style.marginLeft = "250px"
            });
        }
    }
    const location = useLocation()
    useEffect(() => {
        if (document.documentElement.clientWidth >= 900) {
            checknav()
        }
    }, [location])

    // Function to open Modal

    const openModal = () => {
        document.querySelector(props.modalClass).style.display = "block"
    }

    // Using context for showing unread messages

    const { unseen, pendingOrders } = useContext(ContactContext)

    return (
        <>
            {/* <!-- Side Navigation Bar --> */}
            <div className="sidenav" id="mySidenav">
                <Link to="/admin-dashboard"><img src="img\adminImg\home-icon.png" alt="" height="40px" />&nbsp;&nbsp;<p className="left-nav-item">Dashboard</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-cats"><img src="img\adminImg\cat-icon.png" alt="" height="40px" />&nbsp;&nbsp;<p className="left-nav-item">Categories</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-header-cats"><img src="img\adminImg\headcat-icon.png" alt="" height="40px" />&nbsp;&nbsp;<p className="left-nav-item">Head Categories</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-products"><img src="img\adminImg\product-icon.png" alt="" height="40px" />&nbsp;&nbsp;<p className="left-nav-item">Products</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-deal"><img src="img\adminImg\hotdeal-icon.png" alt="" height="40px" />&nbsp;&nbsp;<p className="left-nav-item">Hot Deals</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-orders"><img src="img\adminImg\order-icon.png" alt="" height="40px" />{(pendingOrders === 0)? "" : <div className="unread-qty">{pendingOrders}</div>}&nbsp;&nbsp;<p className="left-nav-item">Orders</p></Link><hr className="sidenav-hr" />
                <Link to="/admin-contacts"><img src="img\adminImg\contact-icon.png" alt="" height="40px" />{(unseen.unseen === 0)? "" : <div className="unread-qty">{unseen.unseen}</div>}&nbsp;&nbsp;<p className="left-nav-item">Contacts</p></Link><hr className="sidenav-hr" />
            </div>


            {/* <!-- Content Area --> */}

            {/* my navbar  */}
            <nav className="navbar keep-aside">
                <div className="ham-container left-ham" onClick={toggleNav}>
                    <div className="ham-line"></div>
                    <div className="ham-line"></div>
                    <div className="ham-line"></div>
                </div>
                <div className="right-nav-items">
                    <ul className="nav-links right-nav-links right-none">
                        <li><button className={`${props.fifthNavClass} riNav right-none fifthNav`} >{props.fifthNav}</button></li>
                        <li><button className={`${props.fourthNavClass} riNav right-none fourthNav`} >{props.fourthNav}</button></li>
                        <li><button className={`${props.thirdNavClass} riNav right-none thirdNav`} >{props.thirdNav}</button></li>
                        <li><button className={`${props.secondNavClass} riNav right-none secondNav`} >{props.secondNav}</button></li>
                        <li><button onClick={openModal} className={`${props.firstNavClass} riNav right-none firstNav`} >{props.firstNav}</button></li>
                    </ul>
                    <div className="ham-container right-ham" onClick={toggleRightNav}>
                        <div className="ham-line"></div>
                        <div className="ham-line"></div>
                        <div className="ham-line"></div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav