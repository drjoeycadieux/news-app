import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Hub",
  description: "Your source for the latest news and updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
