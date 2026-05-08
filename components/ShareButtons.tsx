'use client';

import { useState, useCallback } from 'react';

const BASE = 'https://sumerrenovations.com';

/** Append UTM params so shared traffic is attributable in analytics. */
function withUtm(path: string, source: string, content: string): string {
  const full = path.startsWith('http') ? path : `${BASE}${path}`;
  const u = new URL(full);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', 'social');
  u.searchParams.set('utm_campaign', 'share');
  u.searchParams.set('utm_content', content);
  return u.toString();
}

type Props = {
  /** Absolute URL or root-relative path, e.g. `/blog/my-post` */
  url: string;
  title: string;
  description?: string;
  /** Full absolute image URL for Pinterest */
  imageUrl?: string;
  /** Used as utm_content — e.g. "blog", "project", "service" */
  context?: string;
};

const BTN_BASE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.55)',
};
const BTN_HOVER: React.CSSProperties = {
  background: 'rgba(201,168,76,0.15)',
  borderColor: 'rgba(201,168,76,0.4)',
  color: '#c9a84c',
};

export default function ShareButtons({
  url,
  title,
  description = '',
  imageUrl,
  context = 'site',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const link = withUtm(url, 'copy', context);
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Fallback for browsers without Clipboard API
      const ta = document.createElement('textarea');
      ta.value = link;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url, context]);

  const enc = encodeURIComponent;
  const t = enc(title);
  const d = enc(description);

  const buttons = [
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(withUtm(url, 'facebook', context))}`,
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(withUtm(url, 'linkedin', context))}`,
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${enc(withUtm(url, 'twitter', context))}&text=${t}`,
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Save on Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${enc(withUtm(url, 'pinterest', context))}&description=${t}${imageUrl ? `&media=${enc(imageUrl)}` : ''}`,
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
    {
      label: 'Share via Email',
      href: `mailto:?subject=${t}&body=${d}%0A%0A${enc(withUtm(url, 'email', context))}`,
      isEmail: true,
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ] satisfies { label: string; href: string; icon: React.ReactNode; isEmail?: boolean }[];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="text-[10px] font-semibold tracking-widest uppercase select-none"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        Share
      </span>

      {buttons.map(({ label, href, icon, isEmail }) => (
        <a
          key={label}
          href={href}
          target={isEmail ? undefined : '_blank'}
          rel={isEmail ? undefined : 'noopener noreferrer'}
          aria-label={label}
          title={label}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={BTN_BASE}
          onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, BTN_HOVER)}
          onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, BTN_BASE)}
        >
          {icon}
        </a>
      ))}

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={
          copied
            ? { background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }
            : BTN_BASE
        }
      >
        {copied ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}
