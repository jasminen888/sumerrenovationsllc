import type { Metadata, Viewport } from 'next';
import { Roboto_Serif, Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a84c',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sumerrenovations.com'),
  title: {
    default: 'Sumer Renovations LLC | Home Renovation & Remodeling Contractor in Portland, OR',
    template: '%s | Sumer Renovations LLC',
  },
  description:
    'Sumer Renovations LLC is a licensed general contractor offering kitchen remodeling, bathroom renovation, roofing installation, deck installation, landscaping, and full home renovation services in Portland, Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, and Corvallis.',
  keywords: [
    'Sumer Renovations LLC',
    'home renovation near me',
    'home remodeling near me',
    'kitchen remodeling',
    'kitchen renovation',
    'bathroom remodeling',
    'bathroom renovation',
    'kitchen repair',
    'deck installation',
    'roofing installation',
    'landscaping company',
    'landscaping design',
    'luxury home renovation',
    'renovation contractor',
    'remodeling contractor',
    'general contractor',
    'Portland home renovation',
    'Beaverton kitchen remodeling',
    'Hillsboro bathroom renovation',
    'Lake Oswego luxury remodeling',
    'Vancouver WA remodeling contractor',
    'Eugene home renovation',
    'Corvallis remodeling services',
    'Wilsonville roofing installation',
    'home renovation Portland OR',
    'remodeling contractor Beaverton OR',
    'kitchen remodeling Portland',
    'bathroom remodeling Portland',
    'full home renovation Oregon',
    'general contractor Portland OR',
  ],
  alternates: {
    canonical: 'https://sumerrenovations.com',
  },
  openGraph: {
    title: 'Sumer Renovations LLC — Portland Home Renovation & Remodeling',
    description:
      'Licensed general contractor offering kitchen remodeling, bathroom renovation, roofing, decks & luxury home renovations across Portland, Beaverton, Hillsboro, and the greater Oregon/SW Washington area. Free quotes.',
    type: 'website',
    url: 'https://sumerrenovations.com',
    locale: 'en_US',
    siteName: 'Sumer Renovations LLC',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sumer Renovations LLC — Luxury Home Renovation in Portland, OR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumer Renovations LLC — Portland Home Renovation',
    description:
      'Expert kitchen, bathroom & full home renovations in Portland OR and surrounding areas. Free quotes.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  authors: [{ name: 'Sumer Renovations LLC', url: 'https://sumerrenovations.com' }],
  creator: 'Sumer Renovations LLC',
  publisher: 'Sumer Renovations LLC',
  category: 'Home Renovation & Remodeling',
  verification: {
    google: 'google-site-verification-placeholder',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Resource hints for third-party origins */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Schema.org structured data — @graph with multiple entity types */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'GeneralContractor', 'HomeAndConstructionBusiness'],
                  '@id': 'https://sumerrenovations.com/#business',
                  name: 'Sumer Renovations LLC',
                  alternateName: 'Sumer Renovations',
                  description:
                    'Sumer Renovations LLC is a licensed general contractor specializing in kitchen remodeling, bathroom renovation, roofing installation, deck installation, landscaping, and full home renovation across Portland, Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, and Corvallis.',
                  url: 'https://sumerrenovations.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://sumerrenovations.com/logo.png',
                    width: 300,
                    height: 100,
                  },
                  image: 'https://sumerrenovations.com/og-image.jpg',
                  telephone: '+19717076604',
                  email: 'sumerrenovations@gmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Portland Metro Area',
                    addressLocality: 'Portland',
                    addressRegion: 'OR',
                    postalCode: '97201',
                    addressCountry: 'US',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 45.5231,
                    longitude: -122.6765,
                  },
                  areaServed: [
                    { '@type': 'City', name: 'Portland', sameAs: 'https://en.wikipedia.org/wiki/Portland,_Oregon' },
                    { '@type': 'City', name: 'Beaverton', sameAs: 'https://en.wikipedia.org/wiki/Beaverton,_Oregon' },
                    { '@type': 'City', name: 'Hillsboro', sameAs: 'https://en.wikipedia.org/wiki/Hillsboro,_Oregon' },
                    { '@type': 'City', name: 'Lake Oswego', sameAs: 'https://en.wikipedia.org/wiki/Lake_Oswego,_Oregon' },
                    { '@type': 'City', name: 'Wilsonville', sameAs: 'https://en.wikipedia.org/wiki/Wilsonville,_Oregon' },
                    { '@type': 'City', name: 'Vancouver', sameAs: 'https://en.wikipedia.org/wiki/Vancouver,_Washington' },
                    { '@type': 'City', name: 'Eugene', sameAs: 'https://en.wikipedia.org/wiki/Eugene,_Oregon' },
                    { '@type': 'City', name: 'Corvallis', sameAs: 'https://en.wikipedia.org/wiki/Corvallis,_Oregon' },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Home Renovation Services',
                    itemListElement: [
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Remodeling', description: 'Custom kitchen remodeling and renovation services in Portland, OR and surrounding areas.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Remodeling', description: 'Luxury bathroom renovation including walk-in showers, custom tile, and vanity installation.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Home Renovation', description: 'Complete whole-home renovation and remodeling services for Portland area homeowners.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roofing Installation', description: 'Professional roofing installation, repair, and replacement in Oregon and SW Washington.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deck Installation', description: 'Custom deck design and installation for outdoor living spaces.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscaping Design', description: 'Professional landscaping and exterior renovation services.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Installation', description: 'Hardwood, tile, luxury vinyl, and carpet installation throughout Oregon and Washington.' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Renovation', description: 'Siding, window, and door upgrades to boost curb appeal.' } },
                    ],
                  },
                  openingHoursSpecification: [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                      opens: '08:00',
                      closes: '20:00',
                    },
                  ],
                  priceRange: '$$–$$$',
                  currenciesAccepted: 'USD',
                  paymentAccepted: 'Cash, Check, Credit Card, Financing',
                  hasMap: 'https://www.google.com/maps/search/Sumer+Renovations+LLC+Portland+OR',
                  sameAs: [
                    'https://www.facebook.com/sumerrenovations',
                    'https://www.instagram.com/sumerrenovations',
                    'https://www.linkedin.com/company/sumer-renovations',
                    'https://x.com/sumerrenovations',
                    'https://www.houzz.com/professionals/sumer-renovations',
                    'https://www.yelp.com/biz/sumer-renovations-portland',
                    'https://www.google.com/maps/search/Sumer+Renovations+LLC+Portland+OR',
                  ],
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5.0',
                    reviewCount: '47',
                    bestRating: '5',
                    worstRating: '1',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://sumerrenovations.com/#website',
                  url: 'https://sumerrenovations.com',
                  name: 'Sumer Renovations LLC',
                  description: 'Portland home renovation, kitchen remodeling, and bathroom renovation contractor.',
                  publisher: { '@id': 'https://sumerrenovations.com/#business' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://sumerrenovations.com/?s={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://sumerrenovations.com/#webpage',
                  url: 'https://sumerrenovations.com',
                  name: 'Sumer Renovations LLC | Home Renovation & Remodeling Contractor in Portland, OR',
                  isPartOf: { '@id': 'https://sumerrenovations.com/#website' },
                  about: { '@id': 'https://sumerrenovations.com/#business' },
                  description:
                    'Sumer Renovations LLC offers licensed kitchen remodeling, bathroom renovation, roofing installation, deck building, and full home renovation services across Portland, Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, and Corvallis.',
                  inLanguage: 'en-US',
                  breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sumerrenovations.com' },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${playfairDisplay.variable} ${robotoSerif.variable}`}>{children}</body>
    </html>
  );
}
