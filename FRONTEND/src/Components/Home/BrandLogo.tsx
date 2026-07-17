import { brandLogo } from "../../assets/assets"


const BrandLogo=()=>{
    return(
        <section className="bg-white py-20">
        <div className="text-center pb-20">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                Trusted Brands
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900">
                Shop from Top Grocery Brands
            </h2>

            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                Bringing you premium quality products from the most trusted brands worldwide.
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-16 w-max mx-auto">
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 border-t-0 border-l-0">
                <img src={brandLogo.maggiLogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 border-t-0 border-x-0 md:border-r">
                <img src={brandLogo.indiaGatelogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden md:flex md:border-t-0 md:border-x-0 lg:border-r">
                <img src={brandLogo.laysLogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden lg:flex lg:border-x-0 lg:border-t-0">
                <img src={brandLogo.himalayalogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden xl:flex xl:border-t-0 xl:border-r-0">
                <img src={brandLogo.pepsilogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-30 border border-slate-300 border-y-0 border-x-0 border-r md:hidden lg:flex lg:border-b">
                <img src={brandLogo.amullogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-30 border border-slate-300 border-y-0 border-x-0 md:border-r md:border-b">
                <img src={brandLogo.Godrejlogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-30 border border-slate-300 border-x-0 border-r md:border-t-0">          
                <img src={brandLogo.balajilogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-30 border border-slate-300 border-x-0 md:border-t-0">
                <img src={brandLogo.britannialogo} alt="logo" className="w-35 h-20 p-3  "/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-30 w-44 sm:w-60 sm:h-30 border border-slate-300 hidden xl:flex xl:border-t-0 xl:border-r-0">
                <img src={brandLogo.nestlelogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden xl:flex xl:border-y-0 xl:border-l-0">
                <img src={brandLogo.parlelogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden lg:flex lg:border-y-0 lg:border-l-0">
                <img src={brandLogo.surfExcellogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 hidden md:flex md:border-l-0 md:border-y-0">
                <img src={brandLogo.bikajilogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 border-x-0 border-y-0 border-r xl:border-r-0">
                <img src={brandLogo.waghBakrilogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
            <div className="hover:bg-green-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-300 border-x-0 border-y-0 xl:border-l">
                <img src={brandLogo.chinglogo} alt="logo" className="w-35 h-20 p-3"/>
            </div>
        </div>
        </section>
    )
}

export default BrandLogo


