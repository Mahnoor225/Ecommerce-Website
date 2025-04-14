import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFA] text-gray-700">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">
              Contact us
            </h3>
            <h4 className="font-medium text-gray-600 mb-3">
              Classyshop - Mega Super Store
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span>507-Union Trade Centre France</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                <a
                  href="mailto:sales@yourcompany.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  sales@yourcompany.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-500" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-blue-600 transition-colors"
                >
                  (+91) 9876-543-210
                </a>
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Online Chat
                </a>
              </li>
              <li className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-gray-500" />
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Get Expert Help
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {[
                "Prices drop",
                "New products",
                "Best sales",
                "Contact us",
                "Sitemap",
                "Stores",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">
              Our company
            </h3>
            <ul className="space-y-2">
              {[
                "Our company",
                "Delivery",
                "Legal Notice",
                "Terms and conditions of use",
                "About us",
                "Secure payment",
                "Login",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">
              Subscribe to newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <form className="space-y-3">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF5252] text-white font-medium rounded-md hover:bg-black transition-colors"
                >
                  SUBSCRIBE
                </button>
              </div>
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and conditions and the privacy policy
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Social and Payment */}
        <div className="border-t border-gray-300 pt-2  bg-[#FFFFFF]">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center space-y-4 md:space-y-0 px-4">
            {/* Social Icons */}
            <div className="flex space-x-4 justify-center">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Youtube</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-black text-sm">©2024 - Ecommerce Template</div>

            {/* Payment Icons */}
            <div className="flex space-x-4 justify-center">
              <img
                src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png"
                alt="Carte Bleue"
                className="h-8"
              />
              <img
                src="https://ecommerce-frontend-view.netlify.app/visa.png"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://ecommerce-frontend-view.netlify.app/master_card.png"
                alt="MasterCard"
                className="h-8"
              />
              <img
                src="https://ecommerce-frontend-view.netlify.app/paypal.png"
                alt="PayPal"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
