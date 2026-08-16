import { brandLogo } from "../../assets/assets"
import { motion } from "motion/react";


const BrandLogo=()=>{

    // Container animation
     const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, }, }, }; 
    // Individual logo animation 
     const logoVariants = { hidden: { opacity: 0, y: 25, scale: 0.9, }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], }, }, };

     const brands = [ { name: "Maggi", logo: brandLogo.maggiLogo }, 
                    { name: "India Gate", logo: brandLogo.indiaGatelogo }, 
                    { name: "Lays", logo: brandLogo.laysLogo }, 
                    { name: "Himalaya", logo: brandLogo.himalayalogo }, 
                    { name: "Pepsi", logo: brandLogo.pepsilogo }, 
                    { name: "Amul", logo: brandLogo.amullogo }, 
                    { name: "Godrej", logo: brandLogo.Godrejlogo }, 
                    { name: "Balaji", logo: brandLogo.balajilogo }, 
                    { name: "Britannia", logo: brandLogo.britannialogo }, 
                    { name: "Nestle", logo: brandLogo.nestlelogo }, 
                    { name: "Parle", logo: brandLogo.parlelogo }, 
                    { name: "Surf Excel", logo: brandLogo.surfExcellogo }, 
                    { name: "Bikaji", logo: brandLogo.bikajilogo }, 
                    { name: "Wagh Bakri", logo: brandLogo.waghBakrilogo }, 
                    { name: "Ching's", logo: brandLogo.chinglogo }, ];

    return(
        <section className="bg-white py-20">
        <motion.div className="text-center pb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], }}>
            <motion.span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600" whileHover={{ scale: 1.05, }}>
                Trusted Brands
            </motion.span>

            <h2 className="mt-5 text-2xl md:text-4xl font-bold text-gray-900">
                Shop from Top Grocery Brands
            </h2>

            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                Bringing you premium quality products from the most trusted brands worldwide.
            </p>
        </motion.div>
       <motion.div
  className="grid grid-cols-3 md:grid-cols-5 md:mt-16 w-max mx-auto"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {brands.map((brand, index) => (
    <motion.div
  key={brand.name}
  variants={logoVariants}
  className={`
    group flex h-28 items-center justify-center
    border-b border-r border-slate-200
    bg-white
    transition-colors duration-300
    hover:bg-green-50
    sm:h-32

    /* Mobile: 3 columns */
    max-md:[&:nth-child(3n)]:border-r-0
    max-md:[&:nth-child(n+7)]:border-b-0

    /* md: 5 columns */
    md:[&:nth-child(3n)]:border-r
    md:[&:nth-child(5n)]:border-r-0
    md:[&:nth-last-child(-n+5)]:border-b-0

    /* Hide 10+ on mobile, show all at md */
    ${index >= 9 ? "hidden md:flex" : ""}
  `}
  whileHover={{
    scale: 1.03,
    zIndex: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  }}
>
      <motion.img
        src={brand.logo}
        alt={`${brand.name} logo`}
        className="h-20 w-30 md:w-36 object-contain p-3 grayscale-[20%] transition-all duration-300 group-hover:grayscale-0"
        whileHover={{ scale: 1.08 }}
      />
    </motion.div>
  ))}
</motion.div>
        </section>
    )
}

export default BrandLogo


