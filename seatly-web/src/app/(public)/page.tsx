import Comparison from "@/app/(public)/_components/comparison";
import CtaBand from "@/app/(public)/_components/cta-band";
import FAQ from "@/app/(public)/_components/faq";
import Features from "@/app/(public)/_components/features";
import Footer from "@/app/(public)/_components/footer";
import Header from "@/app/(public)/_components/header";
import Hero from "@/app/(public)/_components/hero";
import HowItWorks from "@/app/(public)/_components/how-it-works";
import PainPoints from "@/app/(public)/_components/pain-points";
import ProductShowcase from "@/app/(public)/_components/product-showcase";
import TrustBar from "@/app/(public)/_components/trust-bar";
import UseCases from "@/app/(public)/_components/use-cases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seatly — Gọi món tại bàn bằng QR cho quán ăn & quán nước",
  description:
    "Số hóa phục vụ tại bàn: QR menu, order gần realtime, quản lý bàn & món, thanh toán QR. Giải pháp web app gọn cho quán nhỏ đến vừa.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="noi-dung-chinh">
        <Hero />
        <TrustBar />
        <PainPoints />
        <HowItWorks />
        <Features />
        <ProductShowcase />
        <Comparison />
        <UseCases />
        <FAQ />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
