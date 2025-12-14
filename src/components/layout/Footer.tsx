import { Link } from "react-router-dom";
import { Scissors, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Browse Salons", to: "/search" },
    { label: "Top Services", to: "/services" },
    { label: "Become a Partner", to: "/list-business" },
  ];

  const supportLinks = [
    { label: "Help Center", to: "/help" },
    { label: "FAQ", to: "/faq" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Cancellation Policy", to: "/cancellation-policy" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Scissors className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-display text-lg text-foreground">CLIPR</span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              South Africa's premier marketplace for barbershops and hair salons.
            </p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-secondary hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-foreground" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-secondary hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-foreground" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-secondary hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm mb-3 text-accent">QUICK LINKS</h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-accent text-xs transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm mb-3 text-accent">SUPPORT</h4>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-accent text-xs transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm mb-3 text-accent">CONTACT</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground text-xs">
                <Mail className="w-3 h-3 text-accent" />
                hello@clipr.co.za
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-xs">
                <Phone className="w-3 h-3 text-accent" />
                +27 11 123 4567
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-xs">
                <MapPin className="w-3 h-3 text-accent mt-0.5" />
                <span>Johannesburg, SA</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-border my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2024 Clipr. All rights reserved.</p>
          <p>Made with precision in South Africa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
