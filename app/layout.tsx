import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scrapkart',
  description: 'Scrapkart is a platform for buying and selling scrap materials.',
  generator: 'Mubashir',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
