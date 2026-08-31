'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  PhoneCall,
  Globe,
  Building2,
  MessageSquare,
  ChevronDown,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t, languages } = useLanguage();
  const dropdownRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.news, href: '/news' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.gallery, href: '/gallery' },
    { name: t.nav.feedback, href: '/feedback' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">

      {/* Top Notification / Emergency Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium text-slate-200 tracking-tight">
              {t.nav.portalSubtitle}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:994"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.nav.hotlineLabel}: <strong className="text-white">994</strong></span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Interactive Desktop Language Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/60 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                aria-label={t.nav.selectLanguage}
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentLangObj.name}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                    {t.nav.selectLanguage}
                  </div>
                  <div className="py-1">
                    {languages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors text-left ${
                            isSelected
                              ? 'bg-blue-600/20 text-blue-300 font-bold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-700 text-white shadow-md group-hover:bg-blue-800 transition-colors shadow-blue-700/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                {t.nav.officeTitle}
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-blue-700 tracking-wider uppercase mt-1">
                {t.nav.officeSub}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/feedback"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-700/20 transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.nav.sendFeedbackCta}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label={t.nav.toggleMenu}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Language Switcher Bar */}
          <div className="bg-slate-100 p-2 rounded-2xl flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-slate-600 px-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.nav.selectLanguage}:</span>
            </span>
            <div className="flex items-center gap-1">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1 pt-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/feedback"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.nav.sendFeedbackFullCta}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}