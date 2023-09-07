import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: '',
}

export default function DocumentationLayout({
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
