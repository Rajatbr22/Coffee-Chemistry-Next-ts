import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-coffee-dark text-white relative font-playfair">
      {/* Background Image - Fixed for responsive design */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/footer_image.webp"
          alt="footer background"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          priority={false}
        />
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10 mt-12 md:mt-24 lg:mt-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              Coffee Chemistry
            </h3>
            <p className="mb-4 text-sm md:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  News & Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  How we work
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  Terms of services
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-sm md:text-base">
                <span>
                  Near Rachana Metro Station,Tata Capitol Heights, RSVP
                  Nagpur-440016
                </span>
              </li>
              <li className="flex items-center">
                <span>+91 8900750066</span>
              </li>
              <li className="flex items-center">
                <span>coffeechemistry@mail.com</span>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-150"
                >
                  www.coffeechemistry.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
