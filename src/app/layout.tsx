import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Drawer } from "@/components/Drawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "PurePlast | Plastic Manufacturing Solutions",
  description: "PurePlast is an industrial precision plastic manufacturing company providing engineered plastic products and mold manufacturing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <Drawer />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
