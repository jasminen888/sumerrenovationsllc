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
  title: 'Sumer Renovations LLC | Home Renovation & Remodeling Services in Portland, OR',
  description:
    'Sumer Renovations LLC provides professional home renovation, remodeling, construction, kitchen, bathroom, exterior, flooring, roofing, and custom home improvement services in Portland, Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, and Corvallis.',
  keywords: [
    'home renovation Portland OR',
    'remodeling contractor Beaverton OR',
    'Hillsboro home improvement',
    'Lake Oswego renovation services',
    'Wilsonville remodeling contractor',
    'Vancouver WA remodeling',
    'Eugene home renovation',
    'Corvallis remodeling services',
    'kitchen remodeling Portland',
    'bathroom remodeling Portland',
    'exterior renovation Portland',
    'flooring installation Portland',
    'full home renovation Oregon',
    'Sumer Renovations LLC',
    'general contractor Portland',
    'bathroom remodel Oregon',
    'kitchen remodel Oregon',
  ],
  alternates: {
    canonical: 'https://sumerrenovations.com',
  },
  openGraph: {
    title: 'Sumer Renovations LLC — Portland Home Renovation',
    description:
      'Professional home renovation, remodeling, and construction services in Portland and surrounding areas. Free quotes available.',
    type: 'website',
    url: 'https://sumerrenovations.com',
    locale: 'en_US',
    siteName: 'Sumer Renovations LLC',
    images: [
      {
        url: '/sumerrenovations_logo.png',
        width: 1200,
        height: 630,
        alt: 'Sumer Renovations LLC — Home Renovation in Portland, OR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumer Renovations LLC — Portland Home Renovation',
    description:
      'Expert kitchen, bathroom & full home renovations in Portland OR and surrounding areas. Free quotes.',
    images: ['/sumerrenovations_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Sumer Renovations LLC' }],
  creator: 'Sumer Renovations LLC',
  publisher: 'Sumer Renovations LLC',
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

        {/* Schema.org structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HomeAndConstructionBusiness',
              name: 'Sumer Renovations LLC',
              description:
                'Professional home renovation, remodeling, and construction services in Portland, OR and surrounding areas.',
              url: 'https://sumerrenovations.com',
              telephone: '+19717076604',
              email: 'sumerrenovations@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Portland',
                addressRegion: 'OR',
                addressCountry: 'US',
              },
              areaServed: [
                'Portland, OR',
                'Beaverton, OR',
                'Hillsboro, OR',
                'Lake Oswego, OR',
                'Wilsonville, OR',
                'Vancouver, WA',
                'Eugene, OR',
                'Corvallis, OR',
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  description: 'By Appointment',
                },
              ],
              priceRange: '$$',
              hasMap: 'https://www.google.com/maps?q=Portland,Oregon',
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${playfairDisplay.variable} ${robotoSerif.variable}`}>{children}</body>
    </html>
  );
}
