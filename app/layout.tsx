import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { AppProviders } from '@/components/providers/AppProviders';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'NativeAds: Creative Swipe',
  description: 'Swipe to train your brand AI model',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/nativeAds-avatar.svg',
    apple: '/icons/nativeAds-avatar.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0F172A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: 'hsl(221.2 83.2% 53.3%)',
          colorBackground: 'hsl(var(--background))',
          colorText: 'hsl(var(--foreground))',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          card: 'shadow-xl',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background safe-area-inset font-sans antialiased">
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
