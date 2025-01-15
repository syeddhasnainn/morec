import { ViewProvider } from "@/components/ViewContext";
import type { Metadata } from "next";
import { Albert_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOREC",
  description: "Morec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewProvider>
      <html lang="en">
        <body className={`${albertSans.className} antialiased`}>
          {children}
        </body>
      </html>
    </ViewProvider>
  );
}
