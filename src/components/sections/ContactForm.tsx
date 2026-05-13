'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Calendar } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full bg-[#F4F2EE] border border-[#E5E1DA] rounded-xl px-4 py-3 text-[#0A1628] placeholder:text-[#0A1628]/30 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/10 focus:border-[#0A1628]/20 transition-all duration-200 ${isRTL ? 'text-right font-persian' : ''}`;

  return (
    <>
      {/* Header */}
      <section className="bg-[#0A1628] py-20">
        <div className={`max-w-4xl mx-auto px-6 lg:px-10 ${isRTL ? 'text-right' : 'text-center'}`}>
          <div className={`inline-flex items-center gap-2 border border-[#F5C518]/30 bg-[#F5C518]/5 text-[#F5C518] text-xs font-semibold px-4 py-2 rounded-full mb-6 ${isRTL ? 'font-persian' : 'uppercase tracking-widest'}`}>
            {t('badge')}
          </div>
          <h1 className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${isRTL ? 'font-persian' : ''}`}>
            {t('title')}
          </h1>
          <p className={`text-white/50 text-lg ${isRTL ? 'font-persian' : ''}`}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className={`grid lg:grid-cols-5 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Form */}
            <div className={`lg:col-span-3 ${isRTL ? 'lg:col-start-3' : ''}`}>
              {status === 'success' ? (
                <div className={`bg-green-50 border border-green-200 rounded-2xl p-8 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <p className={`text-green-800 font-semibold ${isRTL ? 'font-persian' : ''}`}>
                    {t('form.success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRTL ? 'sm:grid-flow-col-dense' : ''}`}>
                    <div>
                      <label className={`block text-sm font-medium text-[#0A1628] mb-1.5 ${isRTL ? 'text-right font-persian' : ''}`}>
                        {t('form.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        placeholder={t('form.name')}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-[#0A1628] mb-1.5 ${isRTL ? 'text-right font-persian' : ''}`}>
                        {t('form.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        placeholder={t('form.email')}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-[#0A1628] mb-1.5 ${isRTL ? 'text-right font-persian' : ''}`}>
                        {t('form.phone')}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        placeholder={t('form.phone')}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-[#0A1628] mb-1.5 ${isRTL ? 'text-right font-persian' : ''}`}>
                        {t('form.subject')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputClass}
                        placeholder={t('form.subject')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#0A1628] mb-1.5 ${isRTL ? 'text-right font-persian' : ''}`}>
                      {t('form.message')} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder={t('form.message')}
                    />
                  </div>

                  {status === 'error' && (
                    <p className={`text-red-500 text-sm ${isRTL ? 'text-right font-persian' : ''}`}>
                      {t('form.error')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full bg-[#0A1628] text-white font-semibold py-4 rounded-xl hover:bg-[#132040] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${isRTL ? 'font-persian' : ''}`}
                  >
                    {status === 'sending' ? t('form.sending') : t('form.send')}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className={`lg:col-span-2 space-y-5 ${isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              {/* Book a Call */}
              <div className={`bg-[#0A1628] rounded-2xl p-6 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-[#F5C518]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#F5C518]" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-white ${isRTL ? 'font-persian' : ''}`}>
                      {t('booking.title')}
                    </h3>
                    <p className={`text-sm text-white/50 mt-0.5 ${isRTL ? 'font-persian' : ''}`}>
                      {t('booking.subtitle')}
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className={`block text-center bg-[#F5C518] text-[#0A1628] text-sm font-bold py-3 rounded-xl hover:bg-[#FAE060] transition-colors duration-200 mt-4 ${isRTL ? 'font-persian' : ''}`}
                >
                  {t('booking.cta')}
                </a>
              </div>

              {/* WhatsApp */}
              <div className={`bg-[#F4F2EE] rounded-2xl p-6 border border-[#E5E1DA] ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                      {t('whatsapp.title')}
                    </h3>
                    <p className={`text-sm text-[#0A1628]/50 mt-0.5 ${isRTL ? 'font-persian' : ''}`}>
                      {t('whatsapp.subtitle')}
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/14379717732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center bg-[#25D366] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#22c55e] transition-colors duration-200 mt-4 ${isRTL ? 'font-persian' : ''}`}
                >
                  {t('whatsapp.cta')}
                </a>
              </div>

              {/* Instagram */}
              <div className={`bg-[#F4F2EE] rounded-2xl p-6 border border-[#E5E1DA] ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-pink-500">
                    <InstagramIcon size={18} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                      {t('instagram.title')}
                    </h3>
                    <p className={`text-sm text-[#0A1628]/50 mt-0.5 ${isRTL ? 'font-persian' : ''}`}>
                      {t('instagram.subtitle')}
                    </p>
                  </div>
                </div>
                <a
                  href="https://instagram.com/noshan_hosseini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 mt-4 ${isRTL ? 'font-persian' : ''}`}
                >
                  {t('instagram.cta')}
                </a>
              </div>

              {/* Phone */}
              <div className={`bg-[#F4F2EE] rounded-2xl p-6 border border-[#E5E1DA] ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-[#0A1628]/5 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                      {t('phone.title')}
                    </h3>
                    <p className={`text-sm text-[#0A1628]/50 mt-0.5 ${isRTL ? 'font-persian' : ''}`}>
                      {t('phone.subtitle')}
                    </p>
                    <a href="tel:4379717732" className="text-[#0A1628] font-bold text-lg mt-1 block" dir="ltr">
                      437-971-7732
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
