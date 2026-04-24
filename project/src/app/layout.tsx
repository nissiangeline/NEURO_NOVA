
'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nextProvider i18n={i18n}>
      <html lang={i18n.language} style={{ scrollBehavior: 'smooth' }}>
        <head>
          <title>Neuro Nova</title>
          <meta name="description" content="Your gentle cognitive companion — simple, calm, and supportive." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={cn('font-body antialiased', 'bg-background')}>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </body>
      </html>
    </I18nextProvider>
  );
}
