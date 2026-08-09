import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Heroes App",
  description: "Tu aplicación de hábitos y desafíos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} min-h-full bg-black text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
