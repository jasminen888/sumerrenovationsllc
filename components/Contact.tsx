'use client';

import { useState } from 'react';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  contactMethod: string;
  message: string;
};

const initialForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  contactMethod: '',
  message: '',
};

const services = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Full Home Renovation',
  'Exterior Renovation',
  'Flooring Installation',
  'Roofing',
  'Painting',
  'Decks & Outdoor Living',
  'Custom Project',
  'Other',
];

const budgets = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const contactMethods = ['Phone Call', 'Text Message', 'Email', 'No Preference'];

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '(971) 707-6604',
    href: 'tel:+19717076604',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'sumerrenovations@gmail.com',
    href: 'mailto:sumerrenovations@gmail.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Service Area',
    value: 'Portland, Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, Corvallis & surrounding areas',
    href: '#service-areas',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Business Hours',
    value: 'Mon–Sun: 8:00 AM – 8:00 PM',
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.service) newErrors.service = 'Please select a service';
    if (!form.message.trim()) newErrors.message = 'Please tell us about your project';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    // Simulate form submission — replace with Resend / EmailJS / Formspree integration
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
    setForm(initialForm);
  };

  const inputClass = (field: keyof FormData, withIcon = false) =>
    `w-full ${withIcon ? 'pl-11' : 'px-4'} pr-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 font-medium bg-gray-50 placeholder:text-gray-400 ${
      errors[field]
        ? 'border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-200 text-red-800'
        : 'border-gray-200 text-charcoal focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white'
    }`;

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2136 55%, #0a1628 100%)' }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', transform: 'translate(50%,50%)' }} />

      {/* Subtle hex pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpolygon points='30,62 58,77 58,107 30,122 2,107 2,77' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 104px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)' }}>
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            <span className="text-gold-300 text-sm font-medium tracking-wide">Get In Touch</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Start Your{' '}
            <span className="text-gold-400">Renovation?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate. We&apos;d love to bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 group"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)' }}
                >
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-widest uppercase text-gold-400 mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-white text-sm leading-relaxed hover:text-gold-300 transition-colors break-words"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Trust block */}
            <div
              className="mt-2 p-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 100%)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-semibold text-white text-sm">Free, No-Obligation Quotes</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Detailed, transparent estimates. No pressure, no hidden fees &mdash; just honest pricing and exceptional craftsmanship.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Gold gradient accent bar */}
              <div style={{ height: 5, background: 'linear-gradient(90deg, #a0742a 0%, #c9a84c 40%, #f5d06f 65%, #c9a84c 100%)' }} />

              <div className="p-7 sm:p-9">
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'linear-gradient(135deg, #c9a84c22, #c9a84c44)' }}
                    >
                      <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Thank you for reaching out! We&apos;ll get back to you within 24 hours to discuss your project.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-6">
                      <h3 className="font-serif text-xl font-bold text-charcoal">Send Us a Message</h3>
                      <p className="text-gray-400 text-base mt-1">Fill out the form below and we&apos;ll be in touch shortly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="fullName">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </span>
                          <input
                            id="fullName" name="fullName" type="text"
                            value={form.fullName} onChange={handleChange}
                            placeholder="John & Jane Smith"
                            className={inputClass('fullName', true)}
                            autoComplete="name"
                          />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="email">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <input
                            id="email" name="email" type="email"
                            value={form.email} onChange={handleChange}
                            placeholder="you@example.com"
                            className={inputClass('email', true)}
                            autoComplete="email"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="phone">
                          Phone <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </span>
                          <input
                            id="phone" name="phone" type="tel"
                            value={form.phone} onChange={handleChange}
                            placeholder="(503) 555-0100"
                            className={inputClass('phone', true)}
                            autoComplete="tel"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="service">
                          Service Needed <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="service" name="service"
                          value={form.service} onChange={handleChange}
                          className={inputClass('service')}
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="budget">
                          Project Budget
                        </label>
                        <select
                          id="budget" name="budget"
                          value={form.budget} onChange={handleChange}
                          className={inputClass('budget')}
                        >
                          <option value="">Select a budget range...</option>
                          {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>

                      {/* Contact Method — pill buttons */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-2">
                          Preferred Contact Method
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {contactMethods.map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, contactMethod: m }))}
                              className={`px-4 py-2 rounded-full text-base font-medium border transition-all duration-200 ${
                                form.contactMethod === m
                                  ? 'text-white border-transparent shadow-md'
                                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50'
                              }`}
                              style={form.contactMethod === m ? { background: 'linear-gradient(135deg, #c9a84c, #a0742a)', borderColor: 'transparent' } : {}}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold tracking-widest uppercase text-gray-500 mb-1.5" htmlFor="message">
                          Project Details <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="message" name="message" rows={5}
                          value={form.message} onChange={handleChange}
                          placeholder="Tell us about your project, timeline, specific requirements..."
                          className={`${inputClass('message')} resize-none`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #a0742a 100%)', boxShadow: '0 6px 0 #7a5c18, 0 8px 24px rgba(201,168,76,0.3)' }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send My Free Quote Request
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-5 pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Your info is private
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        5-Star Rated Service
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Response within 24 hrs
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
