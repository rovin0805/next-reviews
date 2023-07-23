import type { ReactNode } from "react";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Next 13 Reviews",
  description: "learning Next 13 app router",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-blue-50 px-4 py-2">
        <header>
          <title>Next 13 Reviews</title>
          <NavBar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs">
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
