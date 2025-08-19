export interface SolanaTokenMetadata {
  mint: string;
  name: string;
  symbol: string;
  image?: string;
  description?: string;
  decimals: number;
  supply: string;
}

export interface SolanaAccountInfo {
  executable: boolean;
  owner: string;
  lamports: number;
  data: string[];
  rentEpoch: number;
}

export interface TokenAccount {
  mint: string;
  owner: string;
  amount: string;
  decimals: number;
}
