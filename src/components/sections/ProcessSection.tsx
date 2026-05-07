'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProcessSection() {
  const t = useTranslations('process');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  // Orbital positions for 3 nodes around a circle
  const angles = [-90, 30, 150]; // top, bottom-right, bottom-left
  const radius = 130;
  const cx = 180;
  const cy = 180;

  return (
    <section className="bg-[#0A1628] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-16 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {locale === 'fa' ? 'فرآیند' : 'The Process'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Orbital diagram */}
          <div className="shrink-0 relative w-[360px] h-[360px]">
            <svg viewBox="0 0 360 360" className="w-full h-full">
              {/* Orbit ring */}
              <circle cx={cx} cy={cy} r={radius} fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />

              {/* Connector lines */}
              {steps.map((_, i) => {
                const rad = (angles[i] * Math.PI) / 180;
                const x = cx + radius * Math.cos(rad);
                const y = cy + radius * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={cx} y1={cy} x2={x} y2={y}
                    stroke="white"
                    strokeOpacity={active === i ? 0.2 : 0.06}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{ transition: 'stroke-opacity 0.4s' }}
                  />
                );
              })}

              {/* Orbital nodes */}
              {steps.map((step, i) => {
                const rad = (angles[i] * Math.PI) / 180;
                const x = cx + radius * Math.cos(rad);
                const y = cy + radius * Math.sin(rad);
                const isActive = active === i;
                return (
                  <g key={i} className="cursor-pointer" onClick={() => setActive(i)}>
                    {/* Outer glow ring when active */}
                    {isActive && (
                      <circle cx={x} cy={y} r={28} fill="#C9A84C" fillOpacity="0.12" />
                    )}
                    {/* Node circle */}
                    <circle
                      cx={x} cy={y} r={20}
                      fill={isActive ? '#C9A84C' : 'rgba(255,255,255,0.06)'}
                      stroke={isActive ? '#C9A84C' : 'rgba(255,255,255,0.15)'}
                      strokeWidth="1"
                      style={{ transition: 'fill 0.4s, stroke 0.4s' }}
                    />
                    {/* Step number */}
                    <text
                      x={x} y={y + 5}
                      textAnchor="middle"
                      fill={isActive ? '#0A1628' : 'rgba(255,255,255,0.5)'}
                      fontSize="13"
                      fontWeight="700"
                      style={{ transition: 'fill 0.4s' }}
                    >
                      {step.number}
                    </text>
                  </g>
                );
              })}

              {/* Center hub */}
              <circle cx={cx} cy={cy} r={36} fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeOpacity="0.25" strokeWidth="1" />
              <circle cx={cx} cy={cy} r={22} fill="rgba(201,168,76,0.15)" />
              <circle cx={cx} cy={cy} r={8} fill="#C9A84C" />
            </svg>

            {/* Rotating ring animation */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#C9A84C]/10 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Step details */}
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            {/* Step selector tabs */}
            <div className={`flex gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${isRTL ? 'flex-row-reverse font-persian' : ''} ${active === i ? 'bg-[#C9A84C] text-[#0A1628]' : 'bg-white/8 text-white/55 hover:bg-white/15 hover:text-white/80'}`}
                >
                  <span>{step.number}</span>
                  <span>{step.title}</span>
                </button>
              ))}
            </div>

            {/* Active step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 24 : -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
                    <span className={`text-[#C9A84C] font-bold text-sm ${isRTL ? 'font-persian' : ''}`}>
                      {steps[active].number}
                    </span>
                  </div>
                  <div className="w-12 h-px bg-[#C9A84C]/40" />
                </div>
                <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-4 ${isRTL ? 'font-persian' : ''}`}>
                  {steps[active].title}
                </h3>
                <p className={`text-white/50 text-lg leading-relaxed max-w-md ${isRTL ? 'font-persian' : ''}`}>
                  {steps[active].description}
                </p>

                {/* Progress dots */}
                <div className={`flex gap-2 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-[#C9A84C]' : 'w-3 bg-white/20'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
