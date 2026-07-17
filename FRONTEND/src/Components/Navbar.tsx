import { ArrowRight, BikeIcon, MapPin, Menu, Package, SearchIcon, Shield, ShoppingCartIcon, SquareArrowRightExit } from "lucide-react";
import React, { useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import {useAuth} from "../Context/AuthContext"

const Navbar =()    => {
     const {user,logout}=useAuth();
     const  {cartCount,isCartOpen,setIsCartOpen} = useCart();
     const [seachQuary,setSearchQuery] = useState('');
     const [userMenuOpen,setUserMenuOpen] = useState(false);
     const [scrolled,setScrolled]=useState(false);
     const isHomePage = useLocation().pathname === '/';   
     
     const navigate =useNavigate();

     const handleSearch=(e:React.SubmitEvent)=>{
        e.preventDefault();
        if(seachQuary.trim() !== ''){
            navigate(`/search?q=${encodeURIComponent(seachQuary.trim())}`);
            setSearchQuery('');
        }
     }

     const handleLogout=()=>{
        logout();
        setUserMenuOpen(false);
        navigate('/');
     }

     const linkData = [
        {name:'Home',path:'/'},
        {name:'Products',path:'/products'},
        {name:'Deals',path:'/deals'},
        {name:'About',path:'/about'},
        {name:'Contact',path:'/contact'}
     ];

     const subMenuData = [
        {name:'My Orders',path:'/orders',icon:<Package/>},
        {name:'Addresses',path:'/addresses',icon:<MapPin/>},
        {name:'Products',path:'/products',icon:<Package/>},
        {name:'Deals',path:'/deals',icon:<ArrowRight/>},
        ...(user?.isAdmin?[{name:'Admin Panel',path:'/admin',icon:<Shield/>}]:[]),
        {name:'Logout',path:'#',icon:<SquareArrowRightExit/>,onClick:handleLogout}
     ];

     useEffect(()=>{
        const handlescroll=()=>{
            setScrolled(window.scrollY>50)
        };

        window.addEventListener("scroll",handlescroll);

        return()=>{
            window.removeEventListener("scroll",handlescroll);
        };
     },[])
     

    return (
        <nav className={`w-full h-16 flex items-center justify-between px-6  fixed top-0 z-50   ${isHomePage && !scrolled ?  "bg-transparent text-white":"bg-white text-gray-800 border-b border-app-border shadow-md"} transition-colors`}>

            {/* Logo */}
           <Link to="/">
                <div className="flex items-center gap-2 text-2xl font-bold">
                    <BikeIcon className="size-8 text-green-600"/>
                    <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                    InstaCart
                    </span>
                </div>
            </Link>

            {/* Destop view - Menu */}
            <ul className="hidden md:flex space-x-10">
               {linkData.map((link) => (
                    <li key={link.name}>
                         <Link to={link.path} className="cursor-pointer outline-none transition-colors hover:text-green-400 ">
                             {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
npm
            

            
            <div className="flex items-center space-x-5">
                {/* Search */}
                <form className="hidden md:flex gap-3 items-center" onSubmit={handleSearch}>
                    <SearchIcon className="size-6"/>
                    <input
                        type="text"
                        placeholder="Search for groceries..."
                        className="bg-gray-100 text-gray-600 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-3 py-2"
                        value={seachQuary}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Cart */}
                <button className="cursor-pointer" onClick={()=>setIsCartOpen(!isCartOpen)}>
                    <div>
                    <ShoppingCartIcon className="size-7  relative" />
                    {cartCount > 0 && (
                        <span className="absolute top-1 translate-x-3/4 bg-app-orange text-white p-1 w-5 h-5 text-sm flex justify-center items-center rounded-full">{cartCount}</span>
                    )}
                    </div>
                </button>

                {/* Mobile view - Menu */}
                 <div className="md:hidden">
                                <Menu className="size-6 text-gray-600 cursor-pointer" onClick={()=>setUserMenuOpen(!userMenuOpen)}/>
                            { userMenuOpen && (
                                    <div className="absolute top-16 left-0 right-0 bg-white shadow-lg py-4">
                                        {linkData.map((link) => (
                                            <Link to={link.path} key={link.name}>
                                                <li className="text-gray-600 hover:text-green-600 cursor-pointer py-4 px-6">{link.name}</li>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                
                    {/* User */}
                    <div className="relative">
                    {user ? (
                       <button className="flex items-center bg-app-green text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors shrink-0" onClick={()=>setUserMenuOpen(!userMenuOpen)}>
                            <div className="flex items-center font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                       </button>
                    ) : (
                        <Link to="/login">
                            <button className="bg-app-green text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Login</button>
                        </Link>
                    )}

                     {
                        user && userMenuOpen && (
                            <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e)=>{e.stopPropagation(); setUserMenuOpen(false)}}>
                                <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="overflow-hidden">
                                        <h3 className="truncate font-semibold text-gray-800">
                                        {user.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                                        </h3>

                                        <p className="truncate text-sm text-gray-500">
                                        {user.email}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                {subMenuData.map((item) => (
                                    item.onClick ? (
                                        <button key={item.name} className=" transition-all duration-200 gap-3 items-center flex flex-row py-3 px-5 hover:bg-gray-100 text-gray-600 hover:text-red-600 cursor-pointer w-full" onClick={item.onClick}>
                                            {item.icon} {item.name}
                                        </button>
                                    ):(
                                        <Link to={item.path || '#'} key={item.name} className="transition-all duration-200 gap-3 items-center flex flex-row py-3 px-5 hover:bg-gray-100 text-gray-600 hover:text-orange-600 cursor-pointer">
                                            {item.icon} {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )
                    } 


                    </div>
            </div>
        </nav>
    );
}
export default Navbar;