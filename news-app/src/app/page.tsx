import type { Metadata } from "next";
import NewsList from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News Hub - Latest Updates",
  description: "Your source for the latest news and updates",
};

export default function Home() {
  return <NewsList />;
}
