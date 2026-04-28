import type { Metadata } from 'next';
import { Roboto_Serif } from 'next/font/google';
import './globals.css';

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
  display: 'swap',
});

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: 'Sumer Renovations LLC | Home Renovation & Remodeling in Portland, OR',
    description:
      'Professional home renovation, remodeling, and construction services in Portland and surrounding areas. Free quotes available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sumer Renovations LLC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
              telephone: '+15030000000',
              email: 'info@sumerrenovations.com',
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
      <body className={robotoSerif.variable}>{children}</body>
    </html>
  );
}
