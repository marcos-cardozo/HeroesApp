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
<<<<<<< HEAD
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
=======
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-mono",
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
});

export const metadata: Metadata = {
  title: "Heroes App",
  description: "Tu aplicación de hábitos y desafíos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="dark">
<<<<<<< HEAD
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} min-h-full bg-black text-white font-sans antialiased`}>
=======
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} min-h-full font-sans antialiased`}
      >
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
        {children}
      </body>
    </html>
  );
}
