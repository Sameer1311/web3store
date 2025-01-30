import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import Head from 'next/head'; // Import Head for favicon

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shopping-UX",
  description: "Shopping website created by -- Creator -- Sameer Negi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <link rel="icon" href="/logo.webp" />
      <Head>
        {/* Favicon */}
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Logo in the layout */}
        <header>
        </header>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
