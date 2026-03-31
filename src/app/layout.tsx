import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

import { Providers } from './providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", outfit.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <Flex direction="column" flex="1" justifyContent="space-between" h="100vh">
            <Header />
            {children}
            <Footer />
          </Flex>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
