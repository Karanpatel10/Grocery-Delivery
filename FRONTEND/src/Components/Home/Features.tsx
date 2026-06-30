import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className=" bg-white border border-gray-300 shadow-lg rounded-xl mt-20 mb-10">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-12 rounded-lg p-10 ">    
        {
            heroSectionData.hero_features.map((feature, index) => (
                <div key={index} className="flex flex-row items-center md:justify-center gap-6">
                    <div>
                        <feature.icon/>
                     </div>    
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                </div>
            ))
        }             
        </div>
    </section>
  )
}   

export default Features