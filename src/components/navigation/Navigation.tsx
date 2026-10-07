"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "WORK", href: "#work" },
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
  const menuButton = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      const sections = links.map((link) => document.querySelector<HTMLElement>(link.href)).filter((section) => section !== null).sort((a, b) => a.offsetTop - b.offsetTop);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 150).at(-1);
      setActiveSection(current ? `#${current.id}` : "");
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) { closeMenu(); menuButton.current?.focus(); }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        closeMenu();
        window.location.hash = "ask";
        document.getElementById("ask-query")?.focus({ preventScroll: true });
      }
    };

    window.addEventListener("resize", closeMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

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

        <nav className="site-navigation-links" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} aria-current={activeSection === link.href ? "location" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-navigation-status">
          <a className="site-navigation-command" href="#ask" onClick={() => document.getElementById("ask-query")?.focus({ preventScroll: true })}>
            <span>⌘</span>
            ASK ABOUT MY WORK
            <span>⌘K</span>
          </a>

          <div className="site-navigation-online">
            <span />
            AI / ML ENGINEER
          </div>
        </div>

        <button
          ref={menuButton}
          className="site-navigation-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="site-navigation-mobile" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={activeSection === link.href ? "location" : undefined}
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
