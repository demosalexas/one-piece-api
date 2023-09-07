import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from './providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'One Piece API',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
