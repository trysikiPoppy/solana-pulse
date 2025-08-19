export const API_ENDPOINTS = {
  COINGECKO_TRENDING: "https://api.coingecko.com/api/v3/search/trending",
  COINGECKO_COINS: "https://api.coingecko.com/api/v3/coins",
  SOLANA_RPC:
    "https://polished-warmhearted-mountain.solana-mainnet.quiknode.pro/f58bfa35e31204c02a8e2ea2c3977ec2e6cdaab3/",
  RAYDIUM_API: "https://api.raydium.io/v2",
} as const;

export const REFRESH_INTERVAL = 10000;

export const SOLANA_PROGRAM_IDS = {
  TOKEN_PROGRAM: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  ASSOCIATED_TOKEN_PROGRAM: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
} as const;
