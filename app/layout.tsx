import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import WalletProvider from "@/hooks/wagmi-provider";
import Header from '@/components/header';
import "@/styles/globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "VeriDocx",
  description: "Verifiable documents and authentication",
  icons: "logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <WalletProvider>
          <>
            <Header />
            {children}
          </>
        </WalletProvider>
      </body>
    </html>
  );
}
