import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Sections } from "@/components/Sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
