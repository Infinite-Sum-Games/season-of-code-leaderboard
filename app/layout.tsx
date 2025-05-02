import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ClientSessionWrapper from './components/ClientSessionWrapper';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'WoC | ACM Amrita',
  description: 'Leaderboard for Winter of Code',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="fallbackImage.jpg"
          type="image/jpeg"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionWrapper>{children}</ClientSessionWrapper>
      </body>
    </html>
  );
}
