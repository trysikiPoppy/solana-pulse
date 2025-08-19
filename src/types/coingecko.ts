export interface CoinGeckoTrendingResponse {
  coins: TrendingCoin[];
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

export interface CoinGeckoCoinData {
  id: string;
  symbol: string;
  name: string;
  image:
    | string
    | {
        thumb: string;
        small: string;
        large: string;
      };
  current_price?: number;
  market_cap?: number;
  price_change_percentage_24h?: number;
  total_volume?: number;
  circulating_supply?: number;
  market_data?: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
  };
}
