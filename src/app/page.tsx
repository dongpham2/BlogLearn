
import Image from 'next/image'
import { QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Metadata } from 'next'

// const queryClient = new QueryClient()
export const metadata: Metadata = {
  title: "HomePage",
  description: "This is homepage"
}

export default function Home() {
  
  return (
    <div>
    </div>
  )
}
