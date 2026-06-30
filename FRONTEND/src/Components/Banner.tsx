import { Car, X, ZapIcon } from "lucide-react";
import { useState } from "react";

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  return (
    <>
    {showBanner && (
      <div className="w-full h-12  bg-app-green flex flex-row items-center justify-between text-white"> 
         <div className="flex items-center gap-5 mx-auto">
            <Car />

            <span className="text-sm font-light">
              Free Delivery on Orders Over $20
            </span>

            <span className="hidden md:block">|</span>

            <ZapIcon className="hidden md:block size-5 fill-yellow-500 text-yellow-500" />

            <span className="hidden md:block text-sm font-light">
              Farm-Fresh produce delivered daily
            </span>
         </div>
          <X className="mr-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowBanner(false)}/>
    </div>
    )}
  </>
  )}
export default Banner;