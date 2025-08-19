import { Connection, PublicKey } from "@solana/web3.js";
import { API_ENDPOINTS } from "../constants";
import { SolanaTokenMetadata, SolanaAccountInfo } from "@/types/solana";

const RPC_ENDPOINTS = [API_ENDPOINTS.SOLANA_RPC];

type CacheEntry<T> = { data: T; timestamp: number };
const metadataCache = new Map<string, CacheEntry<SolanaTokenMetadata | null>>();
const CACHE_TTL_MS = 60_000;
let lastRequestMs = 0;
const MIN_INTERVAL_MS = 1100;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return await Promise.race<T>([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);
}

function getLocal(key: string): CacheEntry<unknown> | null {
  try {
    const raw =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setLocal(key: string, value: CacheEntry<unknown>): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const delta = now - lastRequestMs;
  if (delta < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - delta));
  }
  lastRequestMs = Date.now();
}

export const solanaService = {
  async getTokenMetadata(
    mintAddress: string
  ): Promise<SolanaTokenMetadata | null> {
    const key = `solana_metadata:${mintAddress}`;
    const now = Date.now();
    const mem = metadataCache.get(mintAddress);
    if (mem && now - mem.timestamp < CACHE_TTL_MS) {
      return mem.data as SolanaTokenMetadata | null;
    }
    const stored = getLocal(
      key
    ) as CacheEntry<SolanaTokenMetadata | null> | null;
    if (stored && now - stored.timestamp < CACHE_TTL_MS) {
      metadataCache.set(mintAddress, stored);
      return stored.data;
    }
    await rateLimit();
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const conn = new Connection(endpoint, "confirmed");
        const pub = new PublicKey(mintAddress);
        const accountInfo = await withTimeout(conn.getAccountInfo(pub), 1500);
        if (!accountInfo) {
          continue;
        }
        const supply = await withTimeout(conn.getTokenSupply(pub), 1500);
        const result: SolanaTokenMetadata = {
          mint: mintAddress,
          name: `Token ${mintAddress.slice(0, 8)}...`,
          symbol: "UNKNOWN",
          decimals: supply.value.decimals,
          supply: supply.value.amount,
          description: `Solana token with mint address ${mintAddress}`,
        };
        const entry: CacheEntry<SolanaTokenMetadata> = {
          data: result,
          timestamp: Date.now(),
        };
        metadataCache.set(mintAddress, entry);
        setLocal(key, entry);
        return result;
      } catch {}
    }
    const fallback = metadataCache.get(mintAddress) || stored;
    if (fallback) {
      return fallback.data as SolanaTokenMetadata | null;
    }
    return null;
  },

  async getAccountInfo(address: string): Promise<SolanaAccountInfo | null> {
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const conn = new Connection(endpoint, "confirmed");
        const publicKey = new PublicKey(address);
        const accountInfo = await withTimeout(
          conn.getAccountInfo(publicKey),
          1500
        );
        if (!accountInfo) {
          continue;
        }
        return {
          executable: accountInfo.executable,
          owner: accountInfo.owner.toBase58(),
          lamports: accountInfo.lamports,
          data: [accountInfo.data.toString("base64")],
          rentEpoch: accountInfo.rentEpoch || 0,
        };
      } catch {}
    }
    return null;
  },

  async getTokenSupply(mintAddress: string): Promise<string> {
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const conn = new Connection(endpoint, "confirmed");
        const pub = new PublicKey(mintAddress);
        const supply = await withTimeout(conn.getTokenSupply(pub), 1500);
        return supply.value.amount;
      } catch {}
    }
    return "0";
  },
};
