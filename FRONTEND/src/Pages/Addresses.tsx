import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets'
import { Check, MapPin, Pencil, PlusIcon, Trash2, X } from 'lucide-react'
import api from '../config/api'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'

const Addresses = () => {
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
            },(error:any)=>{
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

  const handleSubmit=async(e:React.SubmitEvent)=>{
    e.preventDefault();

    try{
       const coords=await getLocation()||null;
      const payload={...form};

      if(editId){
        const {data}=await api.put(`/addresses/${editId}`,payload);
        console.log(data);
        setAddress(data.addressess || []);
         updateUser({ addresses: data.addressess });
        toast.success("Address Updated")
      }else{
         const {data}=await api.post(`/addresses`,payload);
         console.log(data)
        setAddress(data.addressess || []);
        updateUser({ addresses: data.addressess });
        toast.success("Address added")
      }
      resetForm();
    }catch(error:any){
        toast.error(error.response?.data?.message||error.message||"Failed")
    }
  }

  const handleDelete=async(id:string)=>{
    try{
      console.log(id);
          const {data}=await api.delete(`/addresses/${id}`) 
          setAddress(data.addressess || []);
           updateUser({ addresses: data.addressess });
          toast.success("Deleted Address Successfully")
    }catch(error){
     toast.error(error.response?.data?.message||error.message||"Failed")
    }
  }

  useEffect(()=>{
    api.get("/addresses").then((res)=>{
      console.log("res.data", res.data);
      setAddress(res.data.addressess||[])
    }).catch((error)=>{
      toast.error(error.response?.data?.message||error.message||"Failed to fetch addresses")
    })     
  },[])

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8'>
        {/* header */}
        <div className='flex justify-between py-10'>
          <h1 className='text-app-green text-2xl'>My Address</h1>
          <button onClick={()=>setShowForm(true)} className='inline-flex gap-3 py-2 px-5 rounded-lg bg-app-green text-white'><PlusIcon/>Add Address</button>
        </div> 

        {/* Form model */}
        {
          showForm && ( 
          <>
          <div className='fixed inset-0 bg-black/40 z-50 items-center justify-center' />
          <div className='fixed inset-0 flex items-center justify-center p-4 z-50 ' onClick={()=>setShowForm(false)}>
           <form  onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className='max-w-lg rounded-2xl bg-white w-full p-8 space-y-5'>
            <div> 
              <X className='ml-auto cursor-pointer' onClick={()=>setShowForm(false)}/>
              <h1 className='text-app-green text-xl font-medium'>{editId ? 'Edit Address' : 'Add New Address'}</h1>
           </div>
            <div className='grid gap-1'>
              <label>Label:</label>
              <input type='text' className='border border-app-border focus:border-app-green p-2 rounded-sm' placeholder='Homw, work,etc..' value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})} required/>
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
          
            <button type='submit' className='bg-app-green text-white rounded-lg py-2 w-full'>Submit</button>
          </form>
        </div>
        </>
         )}

        {/* Address list */}
        <div className='space-y-15'>
          {address.map((addr)=>(
            <div key={addr.id} className='flex flex-row gap-5 bg-white p-5 rounded-lg text-md outline-1 outline-gray-200'>
              <MapPin/>
              <div className='flex flex-col'>
                  <p className='space-x-5 flex items-center'><span className='text-app-green font-bold text-lg'>{addr.label}</span>{(addr.isDefault) && <span className='bg-app-green text-white py-1 px-3 rounded-md inline-flex items-center gap-2 text-sm'><Check className='w-4 h-4'/> Default</span>}</p>
                  <span>{addr.address}&nbsp;{addr.city}</span>
                  <span>{addr.state}&nbsp;{addr.zip}</span>
              </div>
                <div className='ml-auto flex items-center justify-center gap-10'>
                  <button className='rounded-full hover:bg-yellow-600 hover:text-white transition-color p-2' onClick={()=>{setEditId(addr.id); setShowForm(true); setForm(addr);}}>
                    <Pencil/>
                  </button>
                  <button className='text-app-error rounded-full hover:bg-app-error hover:text-white transition-color p-2' onClick={()=>handleDelete(addr.id)}>
                    <Trash2/>
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