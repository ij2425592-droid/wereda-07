import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'የወረዳ ጽሕፈት ቤት ሚዲያና ኮሚዩኒኬሽን | Sub-City Media & Communications',
  description: 'የወረዳው ይፋዊ የዜና፣ መረጃ እና የህዝብ አገልግሎቶች ድረ-ገጽ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="am" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}