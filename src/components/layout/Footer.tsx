import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  description?: string;
  companyName?: string;
}

export function Footer({
  logoSrc = '/assets/images/logo-white.png',
  logoAlt = 'Techwix',
  description = "Accelerate innovation with world-class tech teams We'll match you to an entire remote team of incredible freelance talent.",
  companyName = 'techwix'
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const usefulLinks: FooterLink[] = [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'About Company', href: '/about' },
    { label: 'Payment Gatway', href: '#' },
    { label: 'Policy', href: '#' },
  ];

  const services: FooterLink[] = [
    { label: 'Data Security', href: '/services' },
    { label: 'IT Managment', href: '/services' },
    { label: 'Outsourcing', href: '/services' },
    { label: 'Networking', href: '/services' },
  ];

  return (
    <div className="section footer-section footer-section-03 bg-[#0B1320] text-white">
      <div className="container mx-auto px-4">
        <div className="footer-widget-wrap py-16">
          <div className="row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget-about">
                <Link href="/" className="footer-logo inline-block mb-4">
                  <Image src={logoSrc} alt={logoAlt} width={171} height={42} className="h-10 w-auto" />
                </Link>
                <p className="text-gray-400 mb-6">{description}</p>
                <div className="footer-social">
                  <ul className="social flex gap-3">
                    <li>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded hover:bg-blue-600 transition-colors">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded hover:bg-blue-600 transition-colors">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded hover:bg-blue-600 transition-colors">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title text-xl font-semibold mb-6">Useful Links</h4>
                <div className="widget-link">
                  <ul className="link space-y-3">
                    {usefulLinks.map((link) => (
                      <li key={link.href}>
                        {link.href === '#' ? (
                          <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href as '/about'} className="text-gray-400 hover:text-blue-500 transition-colors">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title text-xl font-semibold mb-6">Our Services</h4>
                <div className="widget-link">
                  <ul className="link space-y-3">
                    {services.map((service) => (
                      <li key={service.href + service.label}>
                        <Link href={service.href as '/services'} className="text-gray-400 hover:text-blue-500 transition-colors">
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title text-xl font-semibold mb-6">Contact Information</h4>
                <div className="widget-info">
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="info-icon text-blue-500">
                        <i className="flaticon-phone-call"></i>
                      </div>
                      <div className="info-text">
                        <span>
                          <a href="tel:+91458654528" className="text-gray-400 hover:text-blue-500 transition-colors">
                            +91 458 654 528
                          </a>
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="info-icon text-blue-500">
                        <i className="far fa-envelope-open"></i>
                      </div>
                      <div className="info-text">
                        <span>
                          <a href="mailto:info@example.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                            info@example.com
                          </a>
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="info-icon text-blue-500">
                        <i className="flaticon-pin"></i>
                      </div>
                      <div className="info-text">
                        <span className="text-gray-400">60 East 65th Street, NY</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright-area border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="footer-copyright-wrap py-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-text text-center">
                  <p className="text-gray-400">© Copyrights {currentYear} {companyName} All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
