import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: '',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}
