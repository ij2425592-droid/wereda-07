'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  PhoneCall,
  Globe,
  Search,
  Building2,
  FileText,
  Megaphone,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

const navLinks = [
  { name: 'ዋና ገጽ', href: '/' },
  { name: 'ስለ እኛ', href: '/about' },
  { name: 'ዜና እና መረጃ', href: '/news' },
  { name: 'አገልግሎቶች', href: '/services' },
  { name: 'የሚዲያ ጋለሪ', href: '/gallery' },
  { name: 'ቅሬታና ጥቆማ', href: '/feedback' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">

      {/* Top Notification / Emergency Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" >
              ቦሌ ክፍለ ከተማ አስተዳደር የኮሙኒኬሽን ጽሕፈት ቤት ይፋዊ ፖርታል</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:994" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>ነፃ የስልክ መስመር: <strong>994</strong></span>
            </a>
            <span>|</span>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-700 text-white shadow-md group-hover:bg-blue-800 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                ቦሌ ክፍለ ከተማ
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-blue-700 tracking-wider uppercase mt-1">
                የኮሙኒኬሽን ጽሕፈት ቤት
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive
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
              className="hidden lg:inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ጥቆማ ይላኩ</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/feedback"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white text-sm font-bold py-3 rounded-xl shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ጥቆማ / ቅሬታ ይላኩ</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}