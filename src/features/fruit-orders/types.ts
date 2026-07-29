export type OrderStatus = "confirmed" | "packed" | "out" | "delivered"

export interface SavedCustomer {
  name: string
  mobile: string
  tower: string
  flat: string
  text: string
}

export interface PastOrder {
  number: string
  date: string
  qty: number
  batch: string
  status: string
  payment: string
  rated: boolean
}

export interface SessionOrder {
  number: string
  qty: number
  amount: number
  address: string
  status: OrderStatus
  payment: string
}

export type SheetState = "details" | "paying" | "failed" | "confirmed" | null
export type BandPanel = "rate" | "issue" | null
export type PaymentMethod = "upi" | "qr" | "link" | "cod"

export interface FruitOrderingAppProps {
  /** Demo state toggles — mirror the Claude Design file's editable props. */
  returningCustomer?: boolean
  lastOrderKg?: number
  availableKg?: number
  bookingOpen?: boolean
  codEnabled?: boolean
  simulatePaymentFailure?: boolean
}
