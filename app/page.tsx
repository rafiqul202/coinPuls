import CoinOverview from "@/components/home/CoinOverview";
import { TrendingCoinsFallback } from "@/components/home/fallback";
import TrandingCoins from "@/components/home/TrandingCoins";
import { Suspense } from "react";
const HomePage = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<div>Loading Overview...</div>}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrandingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-7">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default HomePage;
