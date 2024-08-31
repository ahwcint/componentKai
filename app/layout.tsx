import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';
import { AuthenContextProvider } from '@/lib/context/AuthenContextProvider';
import QueryProvider from '@/lib/providers/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['thai', 'latin'],
});

export const metadata: Metadata = {
  title: 'CK?',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <QueryProvider>
          <AuthenContextProvider>
            {children}
            <Toaster />
          </AuthenContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
