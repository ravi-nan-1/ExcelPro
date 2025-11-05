import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com';
const siteImageUrl = `${siteUrl}/images/excel-learning-preview.png`;

export const metadata: Metadata = {
  title: 'Learn Excel Formulas with Interactive Simulations & Animations | Excel Skill Trainer',
  description: 'Master Excel formulas with step-by-step interactive simulations and visual animations. Learn functions like VLOOKUP, IF, SUMIF, INDEX MATCH, and more — perfect for beginners to advanced Excel users.',
  keywords: [
    'learn excel formulas',
    'interactive excel tutorial',
    'excel simulation',
    'excel animation',
    'excel formula simulator',
    'excel practice tool',
    'excel learning app',
    'learn microsoft excel free',
    'excel online practice',
    'free excel course',
    'how to learn excel formulas fast',
    'best excel formula trainer',
    'excel for beginners',
    'advanced excel course online',
    'vlookup tutorial',
    'excel if formula explained',
    'excel sumif example',
    'excel index match practice',
    'excel exercises online',
    'excel function trainer',
    'excel learning website',
    'excel skill builder',
    'free excel learning platform'
  ],
  authors: [{ name: 'ExcelPro' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Learn Excel Formulas with Interactive Simulations & Animations',
    description: 'Practice Excel formulas through real-time simulations and animations. Learn faster with visual examples and interactive exercises.',
    images: [
      {
        url: siteImageUrl,
        width: 1200,
        height: 630,
        alt: 'ExcelPro Learning Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Excel Formulas with Interactive Simulations & Animations',
    description: 'Interactive Excel learning platform — learn VLOOKUP, IF, SUMIF, and more using animations and real examples.',
    images: [siteImageUrl],
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Excel Skill Trainer",
      "operatingSystem": "All",
      "applicationCategory": "EducationalApplication",
      "description": "Interactive Excel learning tool with animations and simulations to master Excel formulas easily.",
      "url": siteUrl,
      "image": siteImageUrl,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ExcelPro",
        "url": siteUrl
      },
      "keywords": [
        "learn excel formulas",
        "interactive excel learning",
        "excel simulation tool",
        "excel for beginners",
        "excel formulas animation",
        "how to learn excel fast",
        "excel course online free"
      ]
    };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', inter.variable)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
