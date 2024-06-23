import Header from "@/components/Header"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "@/provider/ReactQueryProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SDM - NET",
  description: "SDM - NET",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
