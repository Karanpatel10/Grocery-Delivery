import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
// import { dummyAddressData } from '../assets/assets'
import { Check, MapPin, Pencil, PlusIcon, Trash2, X ,Loader2Icon} from 'lucide-react'
import api from '../config/api'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'
import { useLoading } from "../Context/LoadingContext";

const Addresses = () => {
  
  const {setLoading}=useLoading();
  const [loading,setloading]=useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [showForm,setShowForm]=useState(false)
  const [editId,setEditId]=useState<string|null>(null)
  const [form,setForm]=useState({label:"",address:"",city:"",state:"",zip:"",isDefault:false})
  const {updateUser}=useAuth()

  const resetForm=()=>{
    setForm({label:"",address:"",city:"",state:"",zip:"",isDefault:false})
    setEditId(null);
    setShowForm(false)
  }

  const editForm=(add:Address)=>{
    setForm({label:add.label,address:add.address,city:add.city,state:add.state,zip:add.zip,isDefault:add.isDefault})
  }

  // Location latitude & longitude get
  const getLocation=(retries=3):Promise<{lat:number,lng:number}>=>{
    return new Promise((resolve,reject)=>{
        if(!navigator.geolocation){
          reject(new Error("Geolocation not supported"));
          return;
        }

        const attempt=()=>{
          navigator.geolocation.getCurrentPosition(
            (position)=>{
              resolve({
                lat:position.coords.latitude,
                lng:position.coords.longitude
              })
            },(error)=>{
              if(retries>0){
                retries--;
                setTimeout(attempt,1000)
              }else{
                reject(new Error(error.message ||"Failed to get location after retries"))
              }
            },{
              enableHighAccuracy:false,
              timeout:15000,
              maximumAge:60000,
            }
          )
        };
        attempt()
    })
  }


  // Edit and new Address added
  const handleSubmit=async(e:React.SubmitEvent)=>{
    e.preventDefault();
    
    if(!editId && address.length>=4){
            toast.error("Max limit 4 Address Reach.");
            return;
       }

    if(form.label === "Home"||form.label ==="Work"){
      const exists = address.some((item) => item.label === form.label && item.id !== editId);
        if(exists){
          toast.error(`${form.label} already address exits`)
          return;
        }
    }
    setloading(true);
    try{
       const coords=await getLocation()??null;
      const payload={...form,...coords};

      if(editId){
        const {data}=await api.put(`/addresses/${editId}`,payload);
        setAddress(data.addressess || []);
         updateUser({ addresses: data.addressess });
        toast.success("Address Updated")
      }else{     
         const {data}=await api.post(`/addresses`,payload);
        setAddress(prev=>[...prev,data.address]);
        updateUser({ addresses: [...address, data.address] });
        toast.success("Address added")
      }
      resetForm();
    }catch(error:any){
        toast.error(error.response?.data?.message||error.message||"Failed")
    }finally{
      setloading(false);
    }
  }

  const handleDelete=async(id:string)=>{
    try{
      console.log(id);
          const {data}=await api.delete(`/addresses/${id}`) 
          setAddress(data.addressess || []);
           updateUser({ addresses: data.addressess });
          toast.success("Deleted Address Successfully")
    }catch(error:any){
     toast.error(error.response?.data?.message||error.message||"Failed")
    }
  }

  useEffect(()=>{
    setLoading(true,"content")
    api.get("/addresses").then((res)=>{
      setAddress(res.data.addressess||[])
    }).catch((error)=>{
      toast.error(error.response?.data?.message||error.message||"Failed to fetch addresses")
    }).finally(()=>setLoading(false))     
  },[])


  return (
    <div className='min-h-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8'>
        {/* header */}
        <div className='flex justify-between py-10'>
          <h1 className='text-app-green text-2xl'>My Address</h1>
          <button onClick={()=>{resetForm();setShowForm(true);}} className='inline-flex gap-3 py-2 px-5 rounded-lg bg-app-green text-white transition-transform duration-150 active:scale-90 active:bg-app-green-light'><PlusIcon/>Add Address</button>
        </div> 

        {/* Form model */}
        {
          showForm && ( 
          <>
          <div className='fixed inset-0 bg-black/40 z-50 items-center justify-center' />
          <div className='fixed inset-0 flex items-center justify-center p-4 z-50 ' onClick={resetForm}>
           <form  onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className='max-w-lg rounded-2xl bg-white w-full p-8 space-y-5'>
            <div> 
              <X className='ml-auto cursor-pointer' onClick={()=>{setShowForm(false); resetForm()}}/>
              <h1 className='text-app-green text-xl font-medium'>{editId ? 'Edit Address' : 'Add New Address'}</h1>
           </div>
            <div className='grid gap-1'>
              <label>Label:</label> 
              <select className='border border-app-border focus:border-app-green p-2 rounded-sm' value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})} required>
                <option value="" disabled>Select Label</option>
                <option value='Home' >Home</option>
                <option value='Work'>Work</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='grid gap-1'>
                  <label>Street Address:</label>
                  <input type='text' className='border border-app-border focus:border-app-green p-2 rounded-sm' placeholder='street address' value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} required/>
            </div>
            <div className='grid grid-cols-2'> 
                <div className='flex flex-col gap-1'>
                  <label>City:</label>
                  <input type='text' className='border border-app-border focus:border-app-green p-2 rounded-sm' placeholder='city' value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} required/>
                </div>
                <div className='flex flex-col gap-1'>
                  <label>State:</label>
                  <input type='text' className='border border-app-border focus:border-app-green p-2 rounded-sm' placeholder='state' value={form.state} onChange={(e)=>setForm({...form,state:e.target.value})} required/>
                </div>
            </div>
            <div className='grid grid-cols-2'>
                
                <div className='flex flex-col gap-1'>
                  <label>Zip:</label>
                  <input type='number' className='border border-app-border focus:border-app-green p-2 rounded-sm' placeholder='zip' value={form.zip} onChange={(e)=>setForm({...form,zip:e.target.value})} required/>
                </div>
                <div className='flex gap-3 justify-center items-center'>
                    <input type='checkbox' checked={form.isDefault} onChange={(e)=>setForm({...form,isDefault:e.target.checked})}/>
                    <span className='text-sm'>Set as Default</span>
                 </div>
            </div>
          
            <button type='submit' className='bg-app-green text-white rounded-lg py-2 w-full transition-transform duration-150 active:scale-90 active:bg-app-green-light'>{loading?<Loader2Icon className='animate-spin mx-auto'/>:"Submit"}</button>
          </form>
        </div>
        </>
         )}

        {/* Address list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
  {address.map((addr) => (
    <div key={addr.id} className="group relative flex gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:border-app-green/40 hover:shadow-md transition-all duration-200">
      {/* Icon */}
      <div className="shrink-0 w-11 h-11 rounded-full bg-app-green/10 text-app-green flex items-center justify-center">
        <MapPin className="w-5 h-5" />
      </div>

      {/* Address Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {addr.label}
          </h3>

          {addr.isDefault && (
            <span className="bg-app-green/10 text-app-green px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              Default
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-6">
          {addr.address}
        </p>

        <p className="text-gray-500 text-sm">
          {addr.city}, {addr.state} {addr.zip}
        </p>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex items-start gap-1">
        <button
          type="button"
          aria-label="Edit address"
          className="p-2.5 rounded-full text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
          onClick={() => {setEditId(addr.id);setShowForm(true);setForm(addr);}}>
          <Pencil className="w-4 h-4" />
        </button>

        <button type="button" aria-label="Delete address" className="p-2.5 rounded-full text-app-error hover:bg-red-50 transition-colors" onClick={() => handleDelete(addr.id)}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  )
}

export default Addresses