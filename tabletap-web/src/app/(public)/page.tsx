import Footer from "@/app/(public)/_components/footer";
import Hero from "@/app/(public)/_components/hero";
import Navbar from "@/app/(public)/_components/navbar";
import Dishes from "@/app/(public)/_components/dishes";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Dishes />
      </main>
      <Footer />
    </div>
  );
}
