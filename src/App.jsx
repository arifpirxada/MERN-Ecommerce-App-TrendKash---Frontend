import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import ContactState from './comp/context/admin/contact-state'

import Navbar from './comp/common/navbar'
import Footer from './comp/common/footer'
import Topcats from './comp/home/topcats'
import HotDeal from './comp/home/hotDeal'
import NotFound from './comp/home/noFound'
import FirstProductCard from './comp/home/firstProductCard'
import SecondProductCard from './comp/home/secondProductCard'
import SlideHeader from './comp/home/slideHeader'
import FooterSlide from './comp/home/footerSlide'
import Cart from './comp/cart/cart'
import Checkout from './comp/checkout/checkout'
import Product from './comp/product/product'
import Store from './comp/store/store'

import Nav from './comp/admin/common/nav'
import Cats from './comp/admin/cats/cats'
import HeaderCat from './comp/admin/header-cat/header-cat'
import AdminProduct from './comp/admin/product/admin-product'
import AdminDeal from './comp/admin/deal/admin-deal'
import AdminContact from './comp/admin/contact/admin-contact'
import EcomState from "./comp/context/e-com-state"
import Search from "./comp/search/search"


function App() {

  // for admin modal cats

  return (
    <>
      <BrowserRouter>
        <EcomState>
          <ContactState>
            <Routes>
              <Route index element={<>
                <Navbar />
                <Topcats />
                <SlideHeader cardTitle="New Products" /><FirstProductCard />
                <HotDeal />
                <SlideHeader cardTitle="Top Selling" /><SecondProductCard />
                <FooterSlide />
                <Footer />
              </>} />
              <Route path="/cartrend" element={<><Navbar /><Cart /><Footer /></>} />
              <Route path="/checkoutrend" element={<><Navbar /><Checkout /><Footer /></>} />
              <Route path="/productrend" element={<><Navbar /><Product /><Footer /></>} />
              <Route path="/storetrend" element={<><Navbar /><Store /><Footer /></>} />
              <Route path="/searchrend" element={<><Navbar /><Search /><Footer /></>} />
              <Route path="/admin-dashboard" element={<Nav />} />
              <Route path="/admin-cats" element={<><Nav firstNav="Add Cat" firstNavClass="btn btn-primary" modalClass=".addCatModal" /><Cats /></>} />
              <Route path="/admin-header-cats" element={<><Nav firstNav="Add Head Cat" firstNavClass="btn btn-primary" modalClass=".addHeaderCatModal" /><HeaderCat /></>} />
              <Route path="/admin-products" element={<><Nav firstNav="Add Product" firstNavClass="btn btn-primary" modalClass=".addProductModal" /><AdminProduct /></>} />
              <Route path="/admin-deal" element={<><Nav firstNav="Add Deal" firstNavClass="btn btn-primary" modalClass=".addDealModal" /><AdminDeal /></>} />
              <Route path="/admin-contacts" element={<><Nav /><AdminContact /></>} />
              <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
            </Routes>
          </ContactState>
        </EcomState>
      </BrowserRouter>
    </>
  )
}



export default App
