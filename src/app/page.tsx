import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Downloader from "./components/Downloader";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Downloader />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  )
}