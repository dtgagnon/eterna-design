import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eterna Design",
  description: "Eterna Design Studio",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const fontClasses = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="en">
      <body className={`${fontClasses} antialiased bg-amber-50 text-gray-900 dark:bg-gray-900 dark:text-amber-50`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}