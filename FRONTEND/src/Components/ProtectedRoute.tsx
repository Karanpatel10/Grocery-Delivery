import { Outlet ,Navigate} from "react-router-dom"
import {useAuth} from "../Context/AuthContext"


const ProtectedRoute = () => {
    const {user,loading}=useAuth()

    if(!user) return <Navigate to='/login' replace/>
  return (
    <Outlet/>
  )
}

export default ProtectedRoute