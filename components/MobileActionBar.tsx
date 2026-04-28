'use client';

export default function MobileActionBar() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  const openChatbot = () => {
    // Trigger chatbot — dispatch a custom event the Chatbot component can listen to
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-3xl"
      role="navigation"
      aria-label="Mobile quick actions"
    >
      <div className="flex justify-around items-center px-4 py-3 pb-safe">
        {/* Call */}
        <a
          href="tel:+19717076604"
          className="flex flex-col items-center gap-1 group"
          aria-label="Call Sumer Renovations LLC"
        >
          <div className="w-11 h-11 bg-charcoal group-hover:bg-gold-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-charcoal group-hover:text-gold-600 transition-colors">
            Call Us
          </span>
        </a>

        {/* Contact */}
        <button
          onClick={() => scrollTo('#contact')}
          className="flex flex-col items-center gap-1 group"
          aria-label="Go to contact form"
        >
          <div className="w-11 h-11 bg-charcoal group-hover:bg-gold-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-charcoal group-hover:text-gold-600 transition-colors">
            Contact Us
          </span>
        </button>

        {/* Message / Chatbot */}
        <button
          onClick={openChatbot}
          className="flex flex-col items-center gap-1 group"
          aria-label="Open AI chat assistant"
        >
          <div className="w-11 h-11 bg-charcoal group-hover:bg-gold-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-charcoal group-hover:text-gold-600 transition-colors">
            Message Us
          </span>
        </button>
      </div>
    </div>
  );
}
