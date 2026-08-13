import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 md:my-20">
      <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-2xl p-8 md:p-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

          {heroSectionData.hero_features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group flex items-center gap-5 rounded-2xl bg-app-cream-dark p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center outline-4 outline-white justify-center rounded-full bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 leading-5">
                    {feature.desc}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;