import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';

const kanit = Kanit({ weight: '300', subsets: ['thai'] });

export const metadata: Metadata = {
  title: 'CK?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
