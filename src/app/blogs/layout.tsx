import type { Metadata } from 'next'

 export const metadata: Metadata = {
  title: 'Blog list',
  description: 'This is Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
    <>
        {children}
    </>
  )
}
