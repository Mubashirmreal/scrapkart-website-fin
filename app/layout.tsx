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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XKMLGMGLCV"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XKMLGMGLCV');
          `,
        }} />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
