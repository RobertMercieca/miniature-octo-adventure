import { type Metadata, type Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Network delegation analysis',
  description:
    'This tool allows the user to select a network and see delegation information for the network.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
