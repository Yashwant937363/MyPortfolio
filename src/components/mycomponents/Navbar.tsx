import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import React, { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import myimg from "@/assets/myimg.jpg";
import { useUIState } from "@/context/UiState";
import { Menu, X } from "lucide-react";
import { HashLink, NavHashLink } from "react-router-hash-link";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isHeroInView } = useUIState();
  const navItems = [
    { label: "Home", to: "/#hero" },
    { label: "About", to: "/#about" },
    { label: "Skills", to: "/#skills" },
    { label: "Projects", to: "/#projects" },
    { label: "Contact Me", to: "/#contact" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Profile Image (shows only if out of hero view) */}
        <div className="flex items-center">
          {!isHeroInView && (
            <motion.img
              layoutId="hero-image"
              src={myimg}
              className="w-10 h-10 rounded-full mr-4"
              alt="Profile"
            />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavigationMenuLink asChild>
                    <HashLink
                      smooth
                      to={item.to}
                      // className={({ isActive }) =>

                      //     ?
                      //     : "text-muted-foreground"
                      // }
                    >
                      {item.label}
                    </HashLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <div className=" backdrop-blur-2xl bg-black/80 absolute z-50 top-[41px] left-0 w-[96dvw] h-[99dvh]">
            <div className=" md:hidden mt-2 space-y-2 px-2 pb-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, transform: "translateX(-10px)" }}
                  animate={{ opacity: 1, transform: "translateX(0px)" }}
                  exit={{
                    opacity: 0,
                    transform: "translateX(-10px)",
                    transition: { duration: 0.1, delay: 0.05 * index },
                  }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                >
                  <NavHashLink
                    smooth
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-muted text-center"
                  >
                    {item.label}
                  </NavHashLink>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
