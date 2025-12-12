import { Link } from "react-router-dom";
import { Scissors, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Scissors className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-2xl tracking-wide">CLIPR</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              South Africa's premier marketplace for barbershops and hair salons. 
              Find your perfect cut, book with confidence.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {["Browse Salons", "Top Services", "Featured Areas", "Become a Partner", "Mobile Barbers"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Terms of Service", "Privacy Policy", "Cancellation Policy", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                hello@clipr.co.za
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                +27 11 123 4567
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-foreground/10 my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© 2024 Clipr. All rights reserved.</p>
          <p>Made with precision in South Africa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
