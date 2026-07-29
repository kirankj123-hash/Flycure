import { act, render, screen } from "@/test-utils"
import userEvent from "@testing-library/user-event"
import { FruitOrderingApp } from "./FruitOrderingApp"

describe("FruitOrderingApp", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("lets a returning customer complete the repeat-order fast path in two taps", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<FruitOrderingApp />)

    await user.click(screen.getByRole("button", { name: /Repeat 2 kg · ₹398/ }))
    expect(screen.getByText("2 kg · ₹398")).toBeInTheDocument()
    expect(screen.getByText("Tower B, Flat 1204")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /Pay ₹398 & confirm/ }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.getByText("ORDER CONFIRMED")).toBeInTheDocument()
  })

  it("disables Pay for a new customer until name, mobile, tower and flat are all valid", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<FruitOrderingApp returningCustomer={false} />)

    await user.click(screen.getByRole("button", { name: "2 kg" }))
    const payButton = screen.getByRole("button", { name: /Pay ₹398 & confirm/ })
    expect(payButton).toBeDisabled()

    await user.type(screen.getByPlaceholderText("Kiran"), "Asha")
    await user.type(screen.getByPlaceholderText("10-digit mobile"), "9876543210")
    await user.type(screen.getByPlaceholderText("B"), "C")
    await user.type(screen.getByPlaceholderText("1204"), "902")

    expect(payButton).toBeEnabled()
  })

  it("holds stock and lets a failed payment be retried", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<FruitOrderingApp simulatePaymentFailure />)

    await user.click(screen.getByRole("button", { name: /Repeat 2 kg · ₹398/ }))
    await user.click(screen.getByRole("button", { name: /Pay ₹398 & confirm/ }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.getByText("Payment didn't go through")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /Retry ₹398/ }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.getByText("ORDER CONFIRMED")).toBeInTheDocument()
  })

  it("shows the sold-out state when no stock is available", () => {
    render(<FruitOrderingApp availableKg={0} />)
    expect(screen.getByText("Today's harvest is sold out")).toBeInTheDocument()
  })

  it("shows the low-stock warning under 10kg", () => {
    render(<FruitOrderingApp availableKg={5} />)
    expect(screen.getByText("Only 5 kg left")).toBeInTheDocument()
  })

  it("shows the booking-closed state when booking is closed", () => {
    render(<FruitOrderingApp bookingOpen={false} />)
    expect(screen.getByText("Booking closed for today")).toBeInTheDocument()
  })

  it("requires all three ratings before feedback can be submitted", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<FruitOrderingApp />)

    await user.click(screen.getByRole("button", { name: /Repeat 2 kg · ₹398/ }))
    await user.click(screen.getByRole("button", { name: /Pay ₹398 & confirm/ }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(24000)
    })
    await user.click(screen.getByRole("button", { name: "Done" }))
    await user.click(screen.getByRole("button", { name: "Rate this batch" }))

    const sendFeedback = screen.getByRole("button", { name: "Send feedback" })
    expect(sendFeedback).toBeDisabled()

    const tasteRow = screen.getByText("Taste").parentElement!
    const ripenessRow = screen.getByText("Ripeness").parentElement!
    const overallRow = screen.getByText("Overall").parentElement!
    await user.click(within(tasteRow).getByText("5"))
    await user.click(within(ripenessRow).getByText("4"))
    await user.click(within(overallRow).getByText("5"))

    expect(sendFeedback).toBeEnabled()
  })
})

function within(element: HTMLElement) {
  return {
    getByText(text: string) {
      const match = Array.from(element.querySelectorAll("button")).find((b) => b.textContent === text)
      if (!match) throw new Error(`Could not find button with text "${text}"`)
      return match
    },
  }
}
