import BeforeAfter from './BeforeAfter';
import SectionAccent from './SectionAccent';

const projects = [
  {
    title: 'Modern Kitchen Transformation',
    category: 'Kitchen Remodeling',
    image: '/kitchenremodel.jpg',
    description: 'Complete kitchen gut and remodel with custom white shaker cabinets, quartz countertops, and premium appliances.',
  },
  {
    title: 'Luxury Master Bathroom',
    category: 'Bathroom Remodeling',
    image: '/bathroom.jpg',
    description: 'Spa-inspired master bathroom with double vanity, walk-in rain shower, and heated tile floors.',
  },
  {
    title: 'Full Home Renovation',
    category: 'Home Renovation',
    image: '/modernhome1.jpg',
    description: 'Complete interior renovation of a 1960s home into a stunning modern living space.',
  },
  {
    title: 'Exterior Curb Appeal',
    category: 'Exterior Renovation',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    description: 'Full exterior renovation with new siding, windows, doors, and landscaping upgrades.',
  },
  {
    title: 'Hardwood Floor Installation',
    category: 'Flooring',
    image: '/floor.jpg',
    description: 'Premium white oak hardwood flooring installed throughout a 2,400 sq ft home.',
  },
  {
    title: 'Custom Deck & Outdoor Living',
    category: 'Custom Projects',
    image: '/deck.jpg',
    description: 'Multi-level composite deck with built-in seating, lighting, and outdoor kitchen area.',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: '#e0b535' }}
    >
      {/* Honeycomb SVG pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 2 L58 18 L58 50 L30 66 L2 50 L2 18 Z' fill='none' stroke='%23ffffff' stroke-width='2' opacity='0.35'/%3E%3Cpath d='M30 66 L58 50 L58 84 L30 100 L2 84 L2 50 Z' fill='none' stroke='%23ffffff' stroke-width='2' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 104px',
          opacity: 1,
        }}
      />
      {/* Subtle bottom vignette only */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-white text-sm font-medium">Our Portfolio</span>
          </div>
          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
            <SectionAccent />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">Featured Projects</h2>
          </div>
          <p className="text-white text-xl max-w-2xl mx-auto leading-relaxed font-light">
            See the quality and craftsmanship behind our work. Every project tells a story of transformation.
          </p>
        </div>

        {/* Before/After Slider */}
        <BeforeAfter />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                  role="img"
                  aria-label={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="inline-block bg-gold-500 text-white text-lg font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                  {project.category}
                </span>
                <h3 className="font-serif text-4xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white text-xl leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-28 overflow-hidden">
                  {project.description}
                </p>

              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white text-xl mb-4">Ready to start your own transformation?</p>
          <a href="#contact" className="btn-primary">
            Start Your Project Today
          </a>
        </div>
      </div>
    </section>
  );
}
