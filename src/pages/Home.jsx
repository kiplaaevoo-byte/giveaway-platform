import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedGiveaways from "../components/FeaturedGiveaways";
import RecentWinners from "../components/RecentWinners";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedGiveaways />
      <RecentWinners />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}