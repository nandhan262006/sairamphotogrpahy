import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sairam Photography",
  description:
    "Capturing moments, creating memories that last a lifetime. Premium portrait, wedding, event and commercial photography by Sairam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg font-sans text-text">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
