import './globals.css'

export const metadata = {
  title: 'Cloudinary File Management',
  description: 'Upload and manage files using Cloudinary',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}