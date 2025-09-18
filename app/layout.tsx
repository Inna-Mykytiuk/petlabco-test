import Header from "@/components/Header";
import StoreProvider from "@/components/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetLab Products - Quality Pet Care Products",
  description:
    "Discover premium quality products for your beloved pets. From nutritional supplements to grooming essentials - everything for your pet health.",
  keywords: [
    "pet products",
    "dog supplements",
    "cat care",
    "pet health",
    "nutritional supplements",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
