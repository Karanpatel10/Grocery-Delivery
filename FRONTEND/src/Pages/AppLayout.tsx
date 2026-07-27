import { Outlet } from 'react-router-dom'
import Banner from '../Components/Banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardSidebar from '../Components/CardSidebar'
import {useLoading} from '../Context/LoadingContext'
import Loading from '../Components/Loading'

const AppLayout = () => {
  const { loading ,variant} = useLoading();
  return (
    <>
      {loading && <Loading variant={variant}/>}
      {/* <Banner/> */}
      <Navbar/>
      <main className='min-h-screen'>
        <Outlet/>
      </main>
      <Footer/>
      <CardSidebar/>
    </>
  )
}

export default AppLayout