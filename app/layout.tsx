import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHubExplorer - Discover and Explore GitHub Repositories',
  description: 'Search, explore, and bookmark GitHub repositories with ease. Find trending projects and stay updated with the latest in open source.',
  keywords: 'GitHub, repository, search, explore, bookmark, trending, open source',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'GitHubExplorer - Discover and Explore GitHub Repositories',
    description: 'Search, explore, and bookmark GitHub repositories with ease. Find trending projects and stay updated with the latest in open source.',
    url: 'https://githubexplorer.com',
    siteName: 'GitHubExplorer',
    images: [
      {
        url: 'https://githubexplorer.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHubExplorer - Discover and Explore GitHub Repositories',
    description: 'Search, explore, and bookmark GitHub repositories with ease. Find trending projects and stay updated with the latest in open source.',
    images: ['https://githubexplorer.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

