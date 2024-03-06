import type { Metadata } from "next";
import "./global.scss"

export const metadata: Metadata = {
  title: "erdragh.dev",
  description: "I'm a Computer Science student and web developer. I also make Minecraft mods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
