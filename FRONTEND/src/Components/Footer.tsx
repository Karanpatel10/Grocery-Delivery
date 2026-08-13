import React from 'react'
import { footerData } from '../assets/assets'
import { BikeIcon } from 'lucide-react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className='bg-app-text text-white px-5 md:px-25 py-3'>
        
            {/* Top Section */}
            <div className='flex flex-row flex-wrap gap-15 py-10 justify-between'>
                <div className='flex flex-1 flex-col max-w-sm text-left gap-3'>
                    <h1 className='flex flex-row gap-3 text-3xl items-center'><BikeIcon className='size-10'/>{footerData.brand.name}</h1>
                    <p className='text-white/60'>{footerData.brand.description}</p>
                    <div className='flex flex-row gap-3'>
                        {[[FacebookRoundedIcon,"hover:text-blue-500","https://www.facebook.com/"],[InstagramIcon,"hover:text-pink-500","https://www.instagram.com/?hl=en"],[XIcon,"hover:text-black","https://x.com/"],[YouTubeIcon,"hover:text-red-500","https://www.youtube.com/"]].map(([Icons,colors,link],idx)=>(
                        <a href={link} target='_blank' key={idx}><span  className={`inline-flex p-2 bg-white/10 cursor-pointer hover:scale-110 hover:bg-white transition-all duration-200 ${colors}`}><Icons/></span></a>
                    ))}
                    </div>
                </div>

                <div className='inline-flex flex-1 md:flex-2 flex-row  gap-10 md:gap-0 md:justify-around'>
                    {
                        footerData.sections.map((section,idx)=>(
                            <div  className='flex flex-col gap-1 min-w-25'>
                                
                            <h1>{section.title}</h1>
                                {
                                    section.links.map((sdata)=>(
                                        <ul key={idx}>
                                            <Link to={sdata.to}><li className='text-white/60 hover:text-white cursor-pointer'>{sdata.label}</li></Link>
                                        </ul>    
                                    ))
                                }
                            </div>   
                        ))
                    }
                </div>

                <div className='flex flex-1 flex-col gap-3  justify-start text-left'>
                    <h1>Contact</h1>
                    {
                        footerData.contact.map((contacts,idx)=>(
                            <div key={idx} className='flex flex-col gap-3 text-lef text-white/60'>
                                                                
                                <ul key={idx}>
                                    <li className='flex flex-row gap-3'><contacts.icon/>{contacts.text}</li>
                                </ul>
                
                            </div>
                        ))
                    }
                </div>     
            </div>

            {/* horizontal line */}
            <hr className='border-white/20'/>

            {/* Bottom Section */}
            <div className='flex flex-col md:flex-row items-center md:justify-between p-2 text-white/60'>
                
                <p>{footerData.bottom.copyright}</p>
                <div>
                {
                    footerData.bottom.links.map((blink,idx)=>(                        
                        <a key={idx} href={blink.href} className='before:content-["|"] before:m-2 first:before:content-none hover:text-white'>{blink.label}</a>

                    ))
                }
                </div>
            </div>
        
    </footer>
  )
}

export default Footer