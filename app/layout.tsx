import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Job-Hjælpen.dk - Land dit drømmejob i Danmark med AI',
  description: 'AI-drevet CV builder, smart job matching og ansøgningssporing. Find dit næste job i Danmark med intelligente værktøjer og automation.',
  keywords: 'job søgning Danmark, CV builder, karriere Danmark, job matching AI, danske jobs',
  authors: [{ name: 'Job-Hjælpen.dk' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Job-Hjælpen.dk - Land dit drømmejob i Danmark med AI',
    description: 'AI-drevet job platform for danske jobsøgere',
    url: 'https://job-hjalpen.dk',
    siteName: 'Job-Hjælpen.dk',
    locale: 'da_DK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job-Hjælpen.dk - Land dit drømmejob i Danmark med AI',
    description: 'AI-drevet job platform for danske jobsøgere',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}