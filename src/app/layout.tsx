import './globals.css'

export const metadata = {
  title: 'Test task',
  description: 'Next js 13 app',
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
