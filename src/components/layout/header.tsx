import React from "react";
import Link from "next/link";

export default function Header(): React.JSX.Element {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Crypto News
          </Link>
        </nav>
      </div>
    </header>
  );
}
