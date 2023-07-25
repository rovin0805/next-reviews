import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Exo_2, Orbitron } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Next 13 Reviews",
    template: "%s | Next 13 Reviews",
  },
  description: "learning Next 13 app router",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="flex min-h-screen flex-col bg-blue-50 px-4 py-2">
        <header>
          <title>Next 13 Reviews</title>
          <NavBar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs text-slate-500">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-blue-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
