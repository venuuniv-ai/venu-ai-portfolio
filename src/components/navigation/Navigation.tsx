"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  {
    label: "SYSTEMS",
    href: "#systems",
  },
  {
    label: "EXPERIENCE",
    href: "#experience",
  },
  {
    label: "LAB",
    href: "#lab",
  },
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "CONTACT",
    href: "#contact",
  },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);

    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="site-navigation">
      <div className="site-navigation-inner">
        <a
          className="site-navigation-logo"
          href="#top"
          aria-label="VENU.OS home"
        >
          VENU.OS
        </a>

        <nav className="site-navigation-links">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-navigation-status">
          <a className="site-navigation-command" href="#ask">
            <span>⌘</span>
            COMMAND
            <span>⌘K</span>
          </a>

          <div className="site-navigation-online">
            <span />
            ONLINE
          </div>
        </div>

        <button
          className="site-navigation-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="site-navigation-mobile">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              {link.label}
            </a>
          ))}

          <a href="#ask" onClick={() => setMenuOpen(false)}>
            <span>06</span>
            ASK VENU
          </a>
        </nav>
      )}
    </header>
  );
}
