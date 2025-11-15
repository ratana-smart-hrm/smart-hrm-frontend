"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon } from "./ui/HouseIcon";
import { ShoppingBagIcon } from "./ui/ShoppingBagIcon";
import { BlocksIcon } from "./ui/BlocksIcon";
import { InfoIcon } from "./ui/InfoIcon";
import { PhoneIcon } from "./ui/PhoneIcon";

const Header = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Home",
      icon: <HouseIcon size={20} duration={1} />,
    },
    {
      href: "/products",
      label: "Products",
      icon: <ShoppingBagIcon size={20} />,
    },
    { href: "/about", label: "About", icon: <InfoIcon size={20} /> },
    { href: "/blogs", label: "Blog", icon: <BlocksIcon size={20} /> },
    { href: "/contact", label: "Contact", icon: <PhoneIcon size={20} /> },
  ];

  return (
    <>
      {/* 🖥️ Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 h-20 w-full items-center justify-between px-10 bg-brand-secondary border-b border-white/10 z-50">
        <h3 className="text-2xl font-bold tracking-wide text-white">
          Wynnie<span className="text-brand-primary">Runner</span>
        </h3>

        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 border-b-2 transition-all duration-300
                ${
                  isActive
                    ? "text-brand-primary border-brand-primary"
                    : "text-gray-300 border-transparent hover:text-white hover:border-brand-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* 📱 Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 flex md:hidden justify-around items-center bg-brand-secondary border-t border-white/10 h-16 z-50">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition-all duration-300 ${
                isActive
                  ? "text-brand-primary"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Header;
