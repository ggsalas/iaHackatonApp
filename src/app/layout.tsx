import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Techwix - Technology Solutions",
  description: "Leading technology company providing innovative solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}