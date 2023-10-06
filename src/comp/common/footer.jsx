import { useContext } from "react";
import EcomContext from "../context/e-com-context";
import Contact from "../contact/contact";

function Footer() {

    const { aboutData, logged, uid } = useContext(EcomContext)

    const openContactModal = () => {
        if (logged && uid) {
            document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
            document.querySelector(".contactModal").style.display = "flex"
            document.querySelector(".contact-modal-content").style.marginTop = "-250px"
            setTimeout(() => {
                document.querySelector(".contact-modal-content").style.marginTop = "0px"
            }, 0);
        } else {
            document.getElementById("top-header").scrollIntoView({ behavior: 'smooth' });
            document.querySelector(".signupModal").style.display = "flex"
            document.querySelector(".signup-modal-content").style.marginTop = "-250px"
            setTimeout(() => {
                document.querySelector(".signup-modal-content").style.marginTop = "0px"
            }, 0);
        }
    }

    return (
        <>
            <Contact />
            {/* News Letter */ }
            {/* <div id="newsletter" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="newsletter">
                                <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                                <form>
                                    <input className="input" type="email" placeholder="Enter Your Email" />
                                    <button className="newsletter-btn"><i className="fa fa-envelope"></i> Subscribe</button>
                                </form>
                                <ul className="newsletter-follow">
                                    <li>
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* News Letter End */ }
            <footer id="footer">
                {/* top footer */ }
                <div className="section">
                    {/* container */ }
                    <div className="container">
                        {/* row */ }
                        <div className="row">
                            <div className="col-md-3 col-xs-6">
                                { aboutData && <div className="footer">
                                    <h3 className="footer-title">About Us</h3>
                                    <p>
                                        { aboutData[0].aboutUs }
                                    </p>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-map-marker"></i>{ aboutData[0].address }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-phone"></i>{ aboutData[0].phone }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-envelope-o"></i>{ aboutData[0].email }
                                            </a>
                                        </li>
                                    </ul>
                                </div> }
                            </div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Categories</h3>
                                    <ul className="footer-links">
                                        <li><a href="#">Hot deals</a></li>
                                        <li><a href="#">Laptops</a></li>
                                        <li><a href="#">Smartphones</a></li>
                                        <li><a href="#">Cameras</a></li>
                                        <li><a href="#">Accessories</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="clearfix visible-xs"></div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Information</h3>
                                    <ul className="footer-links">
                                        <li><a href="#">About Us</a></li>
                                        <li><a onClick={ openContactModal } href="#">Contact Us</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Orders and Returns</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Service</h3>
                                    <ul className="footer-links">
                                        <li><a href="#">My Account</a></li>
                                        <li><a href="#">View Cart</a></li>
                                        <li><a href="#">Wishlist</a></li>
                                        <li><a href="#">Track My Order</a></li>
                                        <li><a href="#">Help</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /row */ }
                    </div>
                    {/* /container */ }
                </div>
                {/* /top footer */ }

                {/* bottom footer */ }
                <div id="bottom-footer" className="section">
                    <div className="container">
                        {/* row */ }
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <ul className="footer-payments">
                                    <li><a href="#"><i className="fa fa-cc-visa"></i></a></li>
                                    <li><a href="#"><i className="fa fa-credit-card"></i></a></li>
                                    <li><a href="#"><i className="fa fa-cc-paypal"></i></a></li>
                                    <li><a href="#"><i className="fa fa-cc-mastercard"></i></a></li>
                                    <li><a href="#"><i className="fa fa-cc-discover"></i></a></li>
                                    <li><a href="#"><i className="fa fa-cc-amex"></i></a></li>
                                </ul>
                                <span className="copyright">
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */ }
                                    Copyright &copy;{ new Date().getFullYear() } All rights reserved |&nbsp;
                                    <i className="fa fa-heart-o" aria-hidden="true"></i> &nbsp;{ " " }
                                    <a href="https://colorlib.com" target="_blank">
                                        Colorlib
                                    </a>
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */ }
                                </span>
                            </div>
                        </div>
                        {/* /row */ }
                    </div>
                    {/* /container */ }
                </div>
                {/* /bottom footer */ }
            </footer>

        </>
    );
}


export default Footer;
