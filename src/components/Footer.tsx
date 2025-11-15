import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-white/10 text-gray-300 py-10 px-6 md:px-16 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-white">
            Wynnie<span className="text-brand-primary">Runner</span>
          </h3>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
            Celebrating the joy of running, friendship, and unforgettable
            memories. A space made for runners, by runners.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-white font-semibold mb-3 uppercase">
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/home" className="hover:text-brand-primary transition">
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-primary transition"
            >
              Products
            </Link>
            <Link href="/about" className="hover:text-brand-primary transition">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-brand-primary transition"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-brand-primary transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Socials */}
        <div className="flex flex-col md:items-end space-y-3">
          <h4 className="text-white font-semibold mb-3 uppercase">
            Connect With Us
          </h4>
          <div className="flex gap-4">
            <a
              href="https://telegram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition"
            >
              <Image
                src={"/socials/telegram-color.svg"}
                width={50}
                height={50}
                alt="telegram"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition"
            >
              <Image
                src={"/socials/facebook-color.svg"}
                width={50}
                height={50}
                alt="facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition"
            >
              <Image
                src={"/socials/instagram-color.svg"}
                width={50}
                height={50}
                alt="instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Wynnie Runner Team. All rights reserved.
      </div>
    </footer>
  );
}
