'use client';

import Link from 'next/link';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Send 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About Woreda */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">{t.footer.officeName}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors border border-slate-800"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Telegram Icon */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-sky-500 text-white transition-colors border border-slate-800"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              {/* YouTube Icon */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-red-600 text-white transition-colors border border-slate-800"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.quickLinksTitle}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors text-blue-400 font-semibold">{t.footer.aboutLink}</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">{t.footer.newsLink}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.footer.servicesLink}</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">{t.footer.galleryLink}</Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">{t.footer.feedbackLink}</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.servicesHeader}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.footer.serviceId}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.footer.serviceVital}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.footer.serviceTrade}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.footer.serviceConst}</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.footer.contactHeader}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{t.footer.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{t.footer.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400">{t.footer.privacyPolicy}</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400">{t.footer.termsOfUse}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}