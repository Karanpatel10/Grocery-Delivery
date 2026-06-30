import { ArrowRight, BikeIcon, MapPin, Menu, Package, SearchIcon, Shield, ShoppingCartIcon, SquareArrowRightExit } from "lucide-react";
import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Navbar =()    => {
     const user:any={name:'Karan',email:'karan@example.com',isAdmin:true}
     const  {cartCount,isCartOpen,setIsCartOpen} = useCart();
     const [seachQuary,setSearchQuery] = useState('');
     const [userMenuOpen,setUserMenuOpen] = useState(false);

     
     const navigate =useNavigate();

     const handleSearch=(e:React.SubmitEvent)=>{
        e.preventDefault();
        if(seachQuary.trim() !== ''){
            navigate(`/search?q=${encodeURIComponent(seachQuary.trim())}`);
            setSearchQuery('');
        }
     }

     const handleLogout=()=>{
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
        {name:'Admin Panel',path:'/admin',icon:<Shield/>},
        {name:'Logout',path:'#',icon:<SquareArrowRightExit/>,onClick:handleLogout}
     ];

     

    return (
        <nav className="w-full h-16 bg-white flex items-center justify-between px-6 shadow-md sticky top-0 z-50 border-b border-app-border">

            {/* Logo */}
            <Link to="/">
                <div className="text-2xl font-bold text-green-600 inline-flex items-center gap-2 cursor-pointer">
                    <BikeIcon className="size-8"/> InstaCart
                </div>
            </Link>

            {/* Destop view - Menu */}
            <ul className="hidden md:flex space-x-10">
               {linkData.map((link) => (
                    <li key={link.name}>
                         <Link to={link.path} className="text-gray-600 hover:text-green-600 cursor-pointer outline-none">
                             {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            

            
            <div className="flex items-center space-x-5">
                {/* Search */}
                <form className="hidden md:flex gap-3 items-center" onSubmit={handleSearch}>
                    <SearchIcon className="text-gray-400 size-6"/>
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
                    <ShoppingCartIcon className="text-gray-600 size-7  relative" />
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
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Login</button>
                        </Link>
                    )}

                    {
                        user && userMenuOpen && (
                            <div className="absolute top-14 right-1 bg-white shadow-xl  py-2 rounded-md w-52" onClick={(e)=>{e.stopPropagation(); setUserMenuOpen(false)}}>
                                <div className="border border-app-border rounded-md p-4 mb-2 text-sm text-gray-600">
                                    <span className="font-bold">{user.name}</span> <br/> {user.email}
                                 </div>   
                                {subMenuData.map((item) => (
                                    item.onClick ? (
                                        <button key={item.name} className="gap-3 items-center flex flex-row py-2 px-4 hover:bg-gray-100 text-gray-600 hover:text-orange-600 cursor-pointer w-full" onClick={item.onClick}>
                                            {item.icon} {item.name}
                                        </button>
                                    ):(
                                        <Link to={item.path || '#'} key={item.name} className="gap-3 items-center flex flex-row py-2 px-4 hover:bg-gray-100 text-gray-600 hover:text-orange-600 cursor-pointer">
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