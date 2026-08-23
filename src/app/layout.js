import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'የወረዳ ጽሕፈት ቤት ሚዲያና ኮሚዩኒኬሽን',
  description: 'የወረዳው ይፋዊ የዜና፣ መረጃ እና የህዝብ አገልግሎቶች ድረ-ገጽ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="am">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}