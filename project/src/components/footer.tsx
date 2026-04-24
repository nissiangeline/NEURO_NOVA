"use client";

import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-muted-foreground mb-4 md:mb-0">
          {t('footer.reach_out')}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label={t('footer.aria_email')}>
            <Mail className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" aria-label={t('footer.aria_call')}>
            <Phone className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" aria-label={t('footer.aria_chat')}>
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
