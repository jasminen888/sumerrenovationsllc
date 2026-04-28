const testimonials = [
  {
    name: 'Sarah & Michael Thompson',
    location: 'Portland, OR',
    rating: 5,
    project: 'Kitchen Remodeling',
    quote:
      'Sumer Renovations completely transformed our outdated kitchen into a dream space. The attention to detail was incredible, and they stayed on schedule and on budget. We couldn\'t be happier!',
    initials: 'ST',
  },
  {
    name: 'Jennifer Rodriguez',
    location: 'Beaverton, OR',
    rating: 5,
    project: 'Bathroom Renovation',
    quote:
      'They turned our cramped bathroom into a luxurious spa retreat. The tile work is absolutely stunning and the quality is beyond what we expected. Highly recommend!',
    initials: 'JR',
  },
  {
    name: 'David & Lisa Chen',
    location: 'Lake Oswego, OR',
    rating: 5,
    project: 'Full Home Renovation',
    quote:
      'We hired Sumer for a full home renovation and they exceeded every expectation. Professional, clean, punctual, and the results are stunning. Our home looks brand new!',
    initials: 'DC',
  },
  {
    name: 'Mark Williams',
    location: 'Hillsboro, OR',
    rating: 5,
    project: 'Flooring Installation',
    quote:
      'Incredible hardwood floor installation throughout our entire home. The craftsmanship is top-notch and the team was professional and respectful of our space.',
    initials: 'MW',
  },
  {
    name: 'Amanda Foster',
    location: 'Vancouver, WA',
    rating: 5,
    project: 'Exterior Renovation',
    quote:
      'Our home\'s curb appeal is completely transformed. New siding, windows, and a beautiful front door. Neighbors are constantly commenting. Worth every penny!',
    initials: 'AF',
  },
  {
    name: 'Robert & Nancy Park',
    location: 'Wilsonville, OR',
    rating: 5,
    project: 'Custom Deck',
    quote:
      'They built us a gorgeous multi-level deck that has become our favorite room of the house. The quality of materials and craftsmanship is second to none.',
    initials: 'RP',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
            <span className="text-gold-700 text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="section-title mb-4">
            What Our Clients Say
          </h2>
          <p className="section-subtitle mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what homeowners across Portland and beyond have experienced.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {[
            { value: '5.0', label: 'Average Rating', icon: '⭐' },
            { value: '500+', label: 'Happy Clients', icon: '🏠' },
            { value: '100%', label: 'Recommended', icon: '👍' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-serif text-2xl font-bold text-gold-500">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-gold-100">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-5 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gold-100 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.location} &bull; {testimonial.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
