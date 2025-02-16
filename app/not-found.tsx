
import Custom404 from "@/features/theme/404";
import Footer from "@/features/theme/footer/footer";
import Header from "@/features/theme/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  );
}
