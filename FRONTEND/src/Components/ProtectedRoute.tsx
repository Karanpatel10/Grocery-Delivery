import { Outlet ,Navigate} from "react-router-dom"
import {useAuth} from "../Context/AuthContext"


const ProtectedRoute = () => {
    const {user,loading}=useAuth()

    if (loading) {
    return <div>Loading...</div>;
}
 // or a loading spinner

    if(!user){
      console.log("User not logged in, redirecting to login page");
       return <Navigate to='/login' replace/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute