import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Anta } from "next/font/google"

export const metadata: Metadata = {
  title: "3D Avatar Fitting App",
  description: "Upload and fit 3D avatars with clothing",
    generator: 'v0.dev'
}

// Load Anta font
const anta = Anta({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anta",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={anta.variable}>
      <body>{children}</body>
    </html>
  )
}
