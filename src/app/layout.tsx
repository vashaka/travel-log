import { ThemeContextProvider } from "@/context/store";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const spectral = Spectral({
  subsets: ["latin"],
  weight: "200",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeContextProvider>
        <body className={inter.className}>{children}</body>
      </ThemeContextProvider>
    </html>
  );
}
