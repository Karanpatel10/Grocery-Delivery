import { useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets'
import { Check, MapPin, Pencil, PlusIcon, Trash2, X } from 'lucide-react'

const Addresses = () => {
  const [address,setAddress]=useState(dummyAddressData)
  const [showForm,setShowForm]=useState(false)
  const [editId,setEditId]=useState<string|null>(null)
  const [form,setForm]=useState({label:"",address:"",city:"",state:"",zip:"",isDefault:false})

  const resetForm=()=>{
    setForm({label:"",address:"",city:"",state:"",zip:"",isDefault:false})
    setShowForm(false)
  }

  const editForm=(add:Address)=>{
    setForm({label:add.label,address:add.address,city:add.city,state:add.state,zip:add.zip,isDefault:add.isDefault})
  }

  

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto py-20'>
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
           <form onClick={(e) => e.stopPropagation()} className='max-w-lg rounded-2xl bg-white w-full p-8 space-y-5'>
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
          
            <button className='bg-app-green text-white rounded-lg py-2 w-full' onClick={()=>{setShowForm(false);resetForm()}}>Submit</button>
          </form>
        </div>
        </>
         )}

        {/* Address list */}
        <div className='space-y-15'>
          {address.map((addr)=>(
            <div key={addr._id} className='flex flex-row gap-5 bg-white p-5 rounded-lg text-md outline-1 outline-gray-200'>
              <MapPin/>
              <div className='flex flex-col'>
                <p className='space-x-5 flex items-center'><span className='text-app-green font-bold text-lg'>{addr.label}</span>{(addr.isDefault) && <span className='bg-app-green text-white py-1 px-3 rounded-md inline-flex items-center gap-2 text-sm'><Check className='w-4 h-4'/> Default</span>}</p>
                <span>{addr.address}&nbsp;{addr.city}</span>
                <span>{addr.state}&nbsp;{addr.zip}</span>
                </div>
                <div className='ml-auto flex gap-10'>
                  <button className='text-app-green hover:text-app-green-dark' onClick={()=>{setEditId(addr._id); setShowForm(true); setForm(addr);}}>
                    <Pencil/>
                  </button>
                  <button className='text-app-red hover:text-app-red-dark'>
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