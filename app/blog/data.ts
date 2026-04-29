export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  paragraphs: string[];
  cta: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'kitchen-renovation-trends-portland',
    title: 'Top Kitchen Renovation Trends Dominating Portland Homes in 2025',
    excerpt:
      'From waterfall quartz islands to hidden appliance panels, discover the design choices Portland homeowners are loving right now — and which ones offer the best resale value.',
    date: 'May 12, 2025',
    readTime: '5 min read',
    image: '/kitchen1.jpg',
    category: 'Kitchen',
    paragraphs: [
      "Homeowners in Portland are leaning into modern, clean, and functional kitchen designs in 2025. A kitchen is no longer just a place to cook—it's the heart of the home, where families gather and entertain.",
      'One of the biggest trends is the rise of large kitchen islands. These islands serve multiple purposes, from meal prep to casual dining and even working from home. Waterfall-edge countertops in quartz or marble create a seamless, high-end look.',
      'Another popular trend is hidden appliances. Integrated refrigerators and storage solutions keep the space uncluttered and visually clean.',
      'Lighting plays a major role as well. A mix of under-cabinet lighting, pendant lights, and recessed lighting creates a warm and inviting atmosphere.',
      'Natural materials and neutral tones continue to dominate. Soft whites, warm grays, and wood accents create a timeless design.',
    ],
    cta: 'Thinking about a kitchen remodel? Contact us today for a free consultation.',
  },
  {
    slug: 'bathroom-remodel-roi-portland',
    title: "What's the Real ROI of a Bathroom Remodel in Portland?",
    excerpt:
      'Thinking of remodeling your bathroom before selling? We break down which upgrades consistently return 70–85% of their cost — and which ones buyers in the PNW actually care about.',
    date: 'Apr 28, 2025',
    readTime: '6 min read',
    image: '/kitchen2.jpeg',
    category: 'Bathroom',
    paragraphs: [
      "A bathroom remodel is one of the most valuable home upgrades. It improves daily comfort and can significantly increase your home's value.",
      'In Portland, homeowners often see a return of 70–85%, depending on the project scope and materials.',
      'Simple updates like new fixtures, lighting, and flooring can make a noticeable difference. Larger upgrades such as walk-in showers, double vanities, and modern tile designs are highly desirable.',
      'Energy efficiency is also important. Water-saving fixtures and LED lighting reduce costs and appeal to buyers.',
      'Avoid over-customization. Choose designs that are modern but broadly appealing.',
    ],
    cta: 'Want to know what your bathroom remodel could look like? Get a free quote today.',
  },
  {
    slug: 'hiring-renovation-contractor-red-flags',
    title: '7 Red Flags to Watch for When Hiring a Home Renovation Contractor',
    excerpt:
      'Before you sign anything, read this. We share the honest warning signs that separate legitimate contractors from those who will leave your project unfinished.',
    date: 'Apr 5, 2025',
    readTime: '7 min read',
    image: '/kitchen3.jpg',
    category: 'Guides',
    paragraphs: [
      'Hiring the right contractor is critical to the success of your renovation project.',
      'Watch for lack of licensing and insurance. A professional contractor should always provide proof.',
      'Be cautious of unclear pricing. Extremely low quotes often lead to hidden costs later.',
      'Poor communication is another warning sign. Delays in responses can lead to bigger problems during the project.',
      'Avoid large upfront payments. A reasonable deposit is standard, but full payment before work begins is risky.',
      'Always require a written contract outlining scope, timeline, and cost.',
      'Check references and past work. A reliable contractor should have a strong portfolio.',
      'Trust your instincts. If something feels off, it\'s best to walk away.',
    ],
    cta: 'Looking for a trusted renovation team? Contact us today to get started.',
  },
  {
    slug: 'full-home-renovation-planning-portland',
    title: 'The Complete Guide to Planning a Full Home Renovation in Portland',
    excerpt:
      'Thinking about a whole-home transformation? This step-by-step guide covers budgeting, permits, timelines, and how to choose the right contractor from day one.',
    date: 'Mar 18, 2025',
    readTime: '8 min read',
    image: '/kitchen4.jpg',
    category: 'Renovation',
    paragraphs: [
      'A full home renovation is a major investment, and proper planning helps ensure a smooth process.',
      'Start by defining your goals. Whether you want better functionality or a modern look, clarity early on helps guide decisions.',
      'Set a realistic budget and include a contingency for unexpected costs.',
      'Understand the timeline. Full renovations can take weeks or months depending on the scope.',
      'In Portland, permits and regulations are important. Working with an experienced contractor helps avoid delays.',
      'Take time selecting materials and finishes. Cohesive design choices create a polished, long-lasting result.',
      'A well-planned renovation improves both comfort and long-term value.',
    ],
    cta: 'Planning a full home renovation? Contact us today to get started.',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
