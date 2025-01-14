import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Go back to home
      </Link>
    </div>
  )
}

