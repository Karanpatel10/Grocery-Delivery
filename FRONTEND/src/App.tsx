import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import AppLayout from "./Pages/AppLayout"
import Home from "./Pages/Home"
import Products from "./Pages/Products"
import ProductPage from "./Pages/ProductPage"
import SearchResults from "./Pages/SearchResults"
import FlashDeals from "./Pages/FlashDeals"
import Checkout from "./Pages/Checkout"
import MyOrder from "./Pages/MyOrder"
import OrderTracking from "./Pages/OrderTracking"
import Addresses from "./Pages/Addresses"
import ProtectedRoute from "./Components/ProtectedRoute"
import AdminLayout from "./Pages/Admin/AdminLayout"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import AdminProducts from "./Pages/Admin/AdminProducts"
import AdminProductForm from "./Pages/Admin/AdminProductForm"
import AdminOrders from "./Pages/Admin/AdminOrders"
import AdminDeliveryPartners from "./Pages/Admin/AdminDeliveryPartners"
import DeliveryLogin from "./Pages/Delivery/DeliveryLogin"
import DeliveryLayout from "./Pages/Delivery/DeliveryLayout"
import DeliveryDashboard from "./Pages/Delivery/DeliveryDashboard"
import FAQ from "./Pages/FAQ"
import ContactUs from "./Pages/ContactUs"
import About from "./Pages/About"

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{duration:3000,style:{background:'#1B3022',color:'#fff',borderRadius:'12px',fontSize:'16px'}}} />

      <Routes>
        {/* Auth Page - no Navbar/Footer*/}
        <Route path='/login' element={<Login />} />

        {/* Main page with Navbar/Footer */}
        <Route path="/" element={<AppLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="deals" element={<FlashDeals/>} />
            <Route path="FAQ" element={<FAQ/>}/>
            <Route path="Contact" element={<ContactUs/>}/>
            <Route path='About' element={<About/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path='checkout' element={<Checkout/>}/>
              <Route path='orders' element={<MyOrder/>}/>
              <Route path='orders/:id' element={<OrderTracking/>}/>
              <Route path='addresses' element={<Addresses/>}/>
            </Route>
        </Route>

        {/* For Admin */}
        <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path='products' element={<AdminProducts/>}/>
            <Route path='products/new' element={<AdminProductForm/>}/>
            <Route path='products/:id/edit' element={<AdminProductForm/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path='delivery-partners' element={<AdminDeliveryPartners/>}/>
        </Route>  

        {/* Delivery Pages */}
        <Route path='/delivery/login' element={<DeliveryLogin/>}/>
        <Route path='/delivery' element={<DeliveryLayout/>}>
            <Route index element={<DeliveryDashboard/>}/>
        </Route> 

      </Routes>
    </>
  )
}

export default App