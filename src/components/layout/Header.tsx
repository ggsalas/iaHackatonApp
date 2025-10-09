import Link from 'next/link';
import Image from 'next/image';

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  navigation?: NavigationItem[];
  ctaText?: string;
  ctaHref?: string;
}

export function Header({ 
  logoSrc = '/assets/images/logo.png',
  logoAlt = 'Techwix',
  navigation = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaText = 'Get In Touch',
  ctaHref = '/contact'
}: HeaderProps) {
  return (
    <div className="section header-section bg-white">
      <div className="container mx-auto px-4">
        <div className="header-wrap flex items-center justify-between py-6">
          <div className="header-logo">
            <Link href="/">
              <Image src={logoSrc} alt={logoAlt} width={150} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <div className="header-menu hidden lg:block">
            <ul className="main-menu flex items-center gap-8">
              {navigation.map((item, index) => (
                <li key={item.href} className={index === 0 ? 'active-menu' : ''}>
                  <Link href={item.href as '/' | `/about` | `/services` | `/contact`} className="text-gray-700 hover:text-blue-600 font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="header-meta flex items-center gap-4">
            <div className="header-btn hidden xl:block">
              <Link href={ctaHref as `/contact`} className="btn inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium">
                {ctaText}
              </Link>
            </div>
            
            <div className="header-toggle lg:hidden">
              <button className="flex flex-col gap-1.5 p-2">
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
