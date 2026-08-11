import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Heroes App",
  description: "Tu aplicación de hábitos y desafíos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} min-h-full font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
