import { Link } from "react-router-dom"
import { heroSectionData } from "../assets/assets"
import { BikeIcon, Loader2Icon, LockIcon, LockKeyholeOpenIcon, MailIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { toast } from "react-hot-toast"


const Login = () => {

  
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginState, setIsLoginState] = useState(true)
  const [pwdvisible, setPwdVisible] = useState(false)
  const Icon = pwdvisible ? LockKeyholeOpenIcon : LockIcon;

  const {login,register}=useAuth();
  
  const handleSubmit=async(e:React.SubmitEvent)=>{
    e.preventDefault();
    setLoading(true);
    try{
      if(isLoginState){
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    }catch(error:any){
        toast.error(error.response?.data?.message || error.message );
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Left Side */}
        <div className='lg:w-1/2 bg-app-green relative flex flex-col justify-center items-center text-white'>
          <img src={heroSectionData.hero_image} alt='Login Image' className="absolute bg-center object-cover w-full h-full opacity-10" />
          <div className="lg:absolute text-center px-12 gap-4 flex flex-col">
            <h2 className="text-4xl font-semibold">Welcome back to InstraCart</h2>
            <p className="text-xl font-extralight mx-auto max-w-sm">Fresh groceries and organic products Delivered to your doorstep.</p>
          </div>
        </div>

      {/* Right Side */}
        <div className='mx-6 md:mx-12 lg:w-1/2 lg:flex flex-col justify-center items-center'>
         <div className="py-10 text-center">
          <Link to='/' className="inline-flex gap-5 items-center">
            <BikeIcon className="text-app-green size-10"/><span className='text-4xl font-bold text-app-green'>InstraCart</span>
          </Link>
         </div>

         {/* login form */}
          <div className="flex flex-col w-full max-w-lg  p-15 bg-white rounded-2xl shadow-xl ring-2 ring-app-green/10">
            <h1 className="text-2xl font-semibold text-app-green mb-1">{isLoginState ? "Sign in to your account" : "Create your account"}</h1>
            <p className="text-sm text-app-text-light mb-8">{isLoginState ? "Don't have an account?" : "Already have an account?"}<button onClick={()=>setIsLoginState(!isLoginState)} className='text-orange-500 font-semibold hover:text-orange-600 transition-colors px-2'>{isLoginState?'Create one':'Sign in'}</button></p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
             {!isLoginState && (
                <div>
                  <label htmlFor="name">Name:</label>
                  <div className="relative text-center">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text-light size-4"/>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border not-focus:border-app-border transition-all" required />
                  </div> 
                </div>
              )}
                <div>
                  <label htmlFor="email">Email:</label>
                  <div className="relative text-center">
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text-light size-4"/>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@example.com" className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border not-focus:border-app-border transition-all" required />
                  </div> 
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <div className="relative text-center">
                   <Icon onClick={() => setPwdVisible(!pwdvisible)} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text-light size-4 cursor-pointer"/>
                    <input type={pwdvisible ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border not-focus:border-app-border transition-all" required />
                  </div>         
                </div>
                <button type="submit" disabled={loading} className="bg-orange-500 text-white py-5 mt-4 rounded-xl active:scale-95 transition-transform duration-150 hover:bg-orange-600 transition-colors disabled:opacity-60">
                  {loading? <Loader2Icon className="animate-spin mx-auto" /> : isLoginState ? "Login" : "Create Account"}
                </button>
          </form>
          </div>
        </div>
    </div>
  )
}

export default Login