import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Dishes from "./_components/dishes";

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
