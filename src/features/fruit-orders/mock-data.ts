import type { PastOrder, SavedCustomer } from "./types"

// Demo product/community data for the ported screen. Isolated here (rather
// than inline in the component) so a future swap to a real Product/
// ServiceArea/Community record is a data-layer change, not a rewrite of
// FruitOrderingApp.tsx.
export const COMMUNITY_NAME = "Prestige Sunrise Park · Birchwood"

export const FRUIT = {
  name: "Japanese Red Diamond Guava",
  harvestLine: "Harvested today · Banavara Farm",
  deliveryWindow: "5 PM – 8 PM",
  currentBatch: "RG-2707 · Banavara Farm",
  batchNumber: "RG-2707",
  nextFruitTeaser: "Alphonso Mango · next week",
}

export const BATCH_DETAILS: [string, string][] = [
  ["Batch", "RG-2707"],
  ["Variety", "Red Diamond (verified)"],
  ["Farm", "Banavara Farm, Hassan"],
  ["Harvested", "27 July, 6 AM"],
  ["Taste", "Sweet, low tartness"],
  ["Ripeness", "Eat in 1–2 days"],
  ["Seeds", "Soft, low count"],
  ["Storage", "Refrigerate, 4 days"],
]

export const SUPPORT_PHONE = "+91 98xxxxxx10"
export const SUPPORT_LINE = "Banavara Fresh · FSSAI 21425xxxxxx1042"
export const SUPPORT_PHONE_LINE = `Support ${SUPPORT_PHONE} · a person answers, not a bot`
export const SUPPORT_HISTORY_LINE = `Something wrong with an order? Support ${SUPPORT_PHONE} — a person answers.`

export const PRICE_PER_KG = 199
export const OPENING_STOCK_KG = 100

export const SAVED_CUSTOMER: SavedCustomer = {
  name: "Kiran",
  mobile: "9845012204",
  tower: "B",
  flat: "1204",
  text: "Tower B, Flat 1204",
}

export const PAST_ORDERS: PastOrder[] = [
  { number: "#1038", date: "21 July", qty: 2, batch: "RG-2107 · Banavara Farm", status: "Delivered", payment: "Paid · UPI", rated: true },
  { number: "#1021", date: "14 July", qty: 3, batch: "RG-1407 · Banavara Farm", status: "Delivered", payment: "Paid · UPI", rated: true },
  { number: "#1009", date: "7 July", qty: 1, batch: "RG-0707 · Banavara Farm", status: "Delivered", payment: "Paid · Cash", rated: true },
  { number: "#0994", date: "30 June", qty: 2, batch: "RG-3006 · Banavara Farm", status: "1 kg credited", payment: "Paid · UPI", rated: true },
]

export const STATUS_COPY: Record<string, { title: string; sub: string }> = {
  confirmed: { title: "Confirmed", sub: "Packing starts at 3 PM · arriving 5–8 PM today" },
  packed: { title: "Packed", sub: "Weighed and labelled · arriving 5–8 PM today" },
  out: { title: "Out for delivery", sub: "Ravi is on the way · about 40 minutes" },
  delivered: { title: "Delivered", sub: "Handed over at your door · 6:42 PM" },
}
