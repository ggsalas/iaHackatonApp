import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Techwix - Technology Solutions',
  description: 'Leading technology company providing innovative solutions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 flex flex-col min-h-screen debug-tailwind">
        <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-indigo-600 font-semibold">Techwix</Link>
            <Link href="/about" className="hover:text-indigo-600">About</Link>
            <Link href="/services" className="hover:text-indigo-600">Services</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
            <span className="ml-auto text-xs text-gray-400">v0.1</span>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="mt-16 border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8 text-xs text-gray-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} Techwix. All rights reserved.</p>
            <p>
              <Link href="/" className="hover:text-gray-700">Home</Link>{' '}
              · <Link href="/about" className="hover:text-gray-700">About</Link>{' '}
              · <Link href="/services" className="hover:text-gray-700">Services</Link>{' '}
              · <Link href="/contact" className="hover:text-gray-700">Contact</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
