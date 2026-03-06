import type { Metadata } from 'next'
import { Albert_Sans, Comforter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const albertSans = Albert_Sans({ 
  subsets: ["latin"],
  variable: '--font-albert-sans'
});

const comforter = Comforter({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-comforter'
});

export const metadata: Metadata = {
  title: 'Bhavya Omar | Web Designer & Developer',
  description: 'Portfolio of Bhavya Omar - Web Designer and Developer specializing in MVPs and SaaS platforms',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${comforter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
