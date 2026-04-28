const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured in Oregon and Washington. Every project is backed by proper permits and full liability coverage for your complete peace of mind.',
    proof: '✓ OR & WA Licensed',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Quality Craftsmanship',
    description: 'We never cut corners. Every surface, joint, and finish is executed with professional-grade materials and techniques — delivering results that look stunning and last decades.',
    proof: '✓ 500+ Projects Completed',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Transparent Pricing',
    description: 'What we quote is what you pay. Our detailed estimates break down every cost before work begins — no hidden fees, no surprise charges, ever.',
    proof: '✓ No Hidden Fees',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Clear Communication',
    description: 'You\'re kept informed from first call to final walkthrough. Expect prompt responses, progress updates, and a dedicated point of contact throughout your project.',
    proof: '✓ Responds Within 24 Hours',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-Time Delivery',
    description: 'We respect your schedule as much as your home. Timelines are set, tracked, and honored — so your life gets back to normal as quickly as possible.',
    proof: '✓ On-Schedule Track Record',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Customer-First Mindset',
    description: 'Your vision drives every decision. We actively listen, offer expert guidance, and don\'t consider a project complete until you\'re fully thrilled with the result.',
    proof: '✓ 5-Star Rated',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Attention to Detail',
    description: 'From perfectly square tile layouts to flawless paint lines — the small things make the biggest impact. We obsess over every detail so you don\'t have to.',
    proof: '✓ Meticulous Finish Every Time',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Modern Design Expertise',
    description: 'We stay current with the latest design trends and materials, helping you choose styles that are both timeless and tailored to your personal taste and lifestyle.',
    proof: '✓ Design Guidance Included',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-gold-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              <span className="text-gold-700 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="section-title mb-6">
              The Sumer Renovations{' '}
              <span className="text-gold-500">Difference</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              With years of experience transforming homes across the Portland metro area, we&apos;ve
              built our reputation on trust, quality, and an unwavering commitment to our clients.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every project is handled with the same level of professionalism and care, whether
              it&apos;s a quick bathroom refresh or a full home renovation.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['Licensed', 'Bonded', 'Insured', 'Local Business'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-charcoal text-white text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-gold-200 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold-50 text-gold-500 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{feature.description}</p>
                <span className="text-xs font-semibold text-gold-600">{feature.proof}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
