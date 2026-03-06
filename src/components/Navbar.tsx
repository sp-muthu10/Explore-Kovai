import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/places", label: "Tourist Places" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <MapPin className="w-6 h-6" />
          Coimbatore Guide
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button
                variant={isActive(l.to) ? "default" : "ghost"}
                size="sm"
                className="font-sans text-sm"
              >
                {l.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card p-4 animate-fade-in">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              <Button
                variant={isActive(l.to) ? "default" : "ghost"}
                className="w-full justify-start mb-1 font-sans"
              >
                {l.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
