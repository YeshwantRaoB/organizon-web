import PlaceholderImage from '../components/PlaceholderImage';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-organicCream py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">About Organizon Organics</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to purity, people, and the planet
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Organizon Organics was born from a simple belief: everyone deserves access to pure, natural, and nutritious food. We started our journey by partnering with trusted Indian farmers who share our vision of sustainable, chemical-free farming.
                </p>
                <p>
                  Today, we work with over 100 farmers across India, bringing you the finest organic products straight from the farm to your family. Every product we offer is a testament to our commitment to quality, sustainability, and the well-being of our customers.
                </p>
                <p>
                  We believe in transparency, traceability, and trust. That&apos;s why we personally visit our partner farms, ensure organic certification, and maintain the highest standards of quality control.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <PlaceholderImage width="100%" height="100%" text="Our Story Image" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-organicCream py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3">Purity</h3>
              <p className="text-gray-600 leading-relaxed">
                We ensure every product is 100% organic, free from chemicals, pesticides, and GMOs. Purity is not just a promise—it&apos;s our guarantee.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3">People</h3>
              <p className="text-gray-600 leading-relaxed">
                We support local farmers and their families, ensuring fair prices and sustainable livelihoods. Your purchase directly impacts their lives.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3">Planet</h3>
              <p className="text-gray-600 leading-relaxed">
                Sustainable farming practices protect our environment. We&apos;re committed to reducing our carbon footprint and preserving nature for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 text-center mb-12">From Farm to Your Family</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-organicGreen to-organicGreenLight text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Partner Farms</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We work with certified organic farms that follow natural farming practices
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-organicGreen to-organicGreenLight text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Quality Check</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Every batch is tested for purity, quality, and organic certification
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-organicGreen to-organicGreenLight text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Careful Packaging</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Products are packaged in eco-friendly materials to preserve freshness
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-organicGreen to-organicGreenLight text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Delivered Fresh</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Fast delivery ensures you receive the freshest organic products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-organicCream py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Certified & Trusted</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We hold all necessary certifications and licenses to ensure you receive authentic organic products
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm md:text-base font-bold text-gray-900 mb-2">FSSAI Licensed</p>
              <p className="text-xs md:text-sm text-gray-500">License No: XXXXXXXXXXXXXX</p>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm md:text-base font-bold text-gray-900 mb-2">Organic Certified</p>
              <p className="text-xs md:text-sm text-gray-500">India Organic</p>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm md:text-base font-bold text-gray-900 mb-2">ISO Certified</p>
              <p className="text-xs md:text-sm text-gray-500">Quality Management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Join the Organic Movement</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the difference of truly organic food. Start your journey to better health today.
          </p>
          <a
            href="/catalog"
            className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}
