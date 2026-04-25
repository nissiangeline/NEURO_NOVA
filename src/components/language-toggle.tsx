"use client";

import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };
  
  // Set the HTML lang attribute whenever the language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);


  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          className={cn(
            'rounded-full',
            i18n.language.startsWith(lang.code)
              ? 'text-foreground bg-accent/50'
              : 'text-muted-foreground'
          )}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
