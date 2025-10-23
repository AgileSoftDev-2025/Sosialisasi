import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button, ButtonGroup } from "@heroui/button";
import PageHead from "@/components/commons/PageHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <PageHead />
      <Button color="primary">Button</Button>
    </main>
  );
}
