import type { Metadata } from "next"
import { FruitOrderingApp } from "@/features/fruit-orders/FruitOrderingApp"

export const metadata: Metadata = {
  title: "Fresh Harvest | Prestige Sunrise Park",
  description: "Book today's Japanese Red Diamond Guava harvest for delivery to your community.",
}

export default function FruitOrderingPage() {
  return <FruitOrderingApp />
}
