"use client";

import React from "react";
import Header from "@/components/layout/header";
import PoolsTable from "@/components/trending-pools/pools-table";

export default function TrendingPoolsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PoolsTable />
      </main>
    </div>
  );
}
