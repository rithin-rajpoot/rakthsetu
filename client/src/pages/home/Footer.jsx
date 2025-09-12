import React from "react";
import { Heart, Phone, Mail, MapPin, Users, Droplets } from "lucide-react";

const Footer = () => {
  // Simple link component for demonstration
  const Link = ({ to, children, className = "" }) => (
    <a href={to} className={className}>
      {children}
    </a>
  );

  return (
    <footer className="bg-gradient-to-r from-red-600 to-red-700 w-full text-white z-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Mission Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img className="w-12 h-12" src="/images/Logo.png" alt="RakthSetu Logo" />
              <div>
                <h6 className="text-xsm font-bold ">RakthSetu</h6>
                <h6 className="text-sm text-red-100">Save Lives Together</h6>
              </div>
            </div>
            <p className="text-red-100 text-sm leading-relaxed">
              Connecting blood donors with those in need. Every donation saves up to 3 lives.
            </p>
            <div className="flex items-center space-x-2 text-red-100">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Saving lives together</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/donate" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
                <Droplets className="w-4 h-4" />
                <span>Donate Blood</span>
              </Link>
              <Link to="/request" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
                <Users className="w-4 h-4" />
                <span>Request Blood</span>
              </Link>
              <Link to="/donors" className="hover:text-red-200 transition-colors">
                Find Donors
              </Link>
              <Link to="/blood-banks" className="hover:text-red-200 transition-colors">
                Blood Banks
              </Link>
              <Link to="/campaigns" className="hover:text-red-200 transition-colors">
                Campaigns
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Information</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="hover:text-red-200 transition-colors">
                About Us
              </Link>
              <Link to="/eligibility" className="hover:text-red-200 transition-colors">
                Donation Eligibility
              </Link>
              <Link to="/process" className="hover:text-red-200 transition-colors">
                Donation Process
              </Link>
              <Link to="/faq" className="hover:text-red-200 transition-colors">
                FAQ
              </Link>
              <Link to="/blog" className="hover:text-red-200 transition-colors">
                Health Blog
              </Link>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact & Support</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-red-100">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Emergency: 911</span>
              </div>
              <div className="flex items-center space-x-2 text-red-100">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Support: 1-800-BLOOD</span>
              </div>
              <div className="flex items-center space-x-2 text-red-100">
                <Mail className="w-4 h-4" />
                <span className="text-sm">help@ufb.org</span>
              </div>
              <Link to="/contact" className="hover:text-red-200 transition-colors">
                Contact Us
              </Link>
              <Link to="/help" className="hover:text-red-200 transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>

      
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-red-600 bg-red-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-red-100">
              <span>&copy; 2025 UFB - Uber for Blood. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-red-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Serving communities nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;