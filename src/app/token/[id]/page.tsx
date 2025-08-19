import React from "react";
import TokenDetailsPage from "@/components/pages/token-details-page";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TokenPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  return <TokenDetailsPage tokenId={id} />;
}
