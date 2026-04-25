
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BrainCircuit, LogOut, Loader2 } from "lucide-react";
import LanguageToggle from "./language-toggle";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export default function Header() {
  const { t } = useTranslation();
  const { user, signOut, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUserName(snapshot.val().name);
        }
      });
    }
  }, [user]);

  const navItems = [
    { label: t("nav.home"), href: "#home", id: 'home' },
    { label: t("nav.myths"), href: "#myths", id: 'myths' },
    { label: t("nav.screening"), href: "#screening", id: 'screening' },
    { label: t("nav.expert"), href: "#expert", id: 'expert' },
  ];

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);

    let currentSection = '';
    
    for (const item of navItems) {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = item.id;
          break;
        }
      }
    }
    
    // Default to 'home' if at the top of the page
    if (window.scrollY < 200) {
      currentSection = 'home';
    }

    setActiveSection(currentSection);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2 bg-background/80 backdrop-blur-lg shadow-md" : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#home" className="flex items-center gap-2 text-xl font-bold font-headline text-foreground/90">
          <BrainCircuit className="h-7 w-7 text-primary" />
          Neuro Nova
        </Link>
        <nav className="hidden md:flex items-center gap-2 rounded-full bg-white/50 p-1 border">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {userName && (
            <div className="text-sm text-muted-foreground hidden md:block">
              Welcome {userName}, good to see you
            </div>
          )}
          <LanguageToggle />
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <Button onClick={signOut} variant="ghost" size="icon" aria-label="Sign out">
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
