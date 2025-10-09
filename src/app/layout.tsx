import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Techwix - Technology Solutions',
  description: 'Leading technology company providing innovative solutions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 flex flex-col min-h-screen debug-tailwind">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
