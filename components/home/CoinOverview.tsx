import { fetcher } from "@/lib/coingecko.action";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CandlestickChart from "../CandlestickChart";

const CoinOverview = async () => {
  let coin;
  let coinOHLCData;
  try {
    coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    });
    coinOHLCData = await fetcher<OHLCData[]>(`coins/bitcoin/ohlc`, {
      id: "bitcoin",
      vs_currency: "usd",
      days: 1,
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div id="coin-overview">
      <CandlestickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
};

export default CoinOverview;
