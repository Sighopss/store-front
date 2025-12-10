import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Algonquin Pet Store',
  description: 'Your one-stop shop for all pet supplies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

