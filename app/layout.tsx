import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import WalletProvider from "@/hooks/wagmi-provider";
import Header from '@/components/header';
import ThemeProvider from '@/components/theme-provider';

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
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <WalletProvider>
          <>
            <Header />
            {children}
          </>
        </WalletProvider>
        </ThemeProvider>
       
      </body>
    </html>
  );
}
