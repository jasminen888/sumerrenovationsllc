import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sumer Renovations LLC — Home Renovation in Portland, OR';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoUrl = new URL('/sumerrenovations_logo.png', 'https://sumerrenovationsllc.vercel.app').toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2416 50%, #1a1a1a 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gold accent border top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #c9a84c, #e8c96d, #c9a84c)',
          }}
        />
        {/* Gold accent border bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #c9a84c, #e8c96d, #c9a84c)',
          }}
        />

        {/* Content row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '60px',
            padding: '60px 80px',
          }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            width={220}
            height={220}
            alt="Sumer Renovations LLC logo"
            style={{ borderRadius: '16px', flexShrink: 0 }}
          />

          {/* Divider */}
          <div
            style={{
              width: '3px',
              height: '220px',
              background: 'linear-gradient(180deg, transparent, #c9a84c, transparent)',
              flexShrink: 0,
            }}
          />

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                fontSize: '18px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#c9a84c',
                fontFamily: 'sans-serif',
                fontWeight: 600,
              }}
            >
              Portland, OR
            </div>
            <div
              style={{
                fontSize: '58px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              Sumer Renovations LLC
            </div>
            <div
              style={{
                fontSize: '26px',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'sans-serif',
                fontWeight: 300,
                lineHeight: 1.4,
              }}
            >
              Kitchen · Bathroom · Full Home Renovations
            </div>
            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  background: '#c9a84c',
                  color: '#1a1a1a',
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'sans-serif',
                  padding: '10px 24px',
                  borderRadius: '999px',
                }}
              >
                Free Quotes Available
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
