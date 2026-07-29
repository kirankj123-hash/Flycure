"use client"

import { useEffect, useRef, useState } from "react"
import { BATCH_DETAILS, COMMUNITY_NAME, FRUIT, OPENING_STOCK_KG, PAST_ORDERS, PRICE_PER_KG, SAVED_CUSTOMER, STATUS_COPY, SUPPORT_HISTORY_LINE, SUPPORT_LINE, SUPPORT_PHONE_LINE } from "./mock-data"
import type { BandPanel, FruitOrderingAppProps, PaymentMethod, SessionOrder, SheetState } from "./types"

const QTY_OPTIONS = [1, 2, 3, 5] as const
const PAYMENT_DEFS: { value: PaymentMethod; label: string }[] = [
  { value: "upi", label: "UPI app" },
  { value: "qr", label: "Merchant QR" },
  { value: "link", label: "Payment link" },
  { value: "cod", label: "Cash on delivery" },
]
const RESOLUTION_DEFS = [
  { value: "replacement" as const, label: "Replace the affected quantity" },
  { value: "credit" as const, label: "Give me a credit instead" },
]

/**
 * Ported 1:1 from the Claude Design file "Fruit Ordering App.dc.html"
 * (project cc3d41c7-3d93-4272-abe9-8c0c45391d60). State fields, computed
 * values, and handlers mirror the source `Component extends DCLogic` class —
 * this is a straight port to React, not a redesign.
 */
export function FruitOrderingApp({
  returningCustomer = true,
  lastOrderKg = 2,
  availableKg = 42,
  bookingOpen = true,
  codEnabled = true,
  simulatePaymentFailure = false,
}: FruitOrderingAppProps) {
  const [screen, setScreen] = useState<"home" | "history">("home")
  const [qty, setQty] = useState<number | null>(null)
  const [counterQty, setCounterQty] = useState(4)
  const [sheet, setSheet] = useState<SheetState>(null)
  const [editingAddress, setEditingAddress] = useState(false)
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [tower, setTower] = useState("")
  const [flat, setFlat] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi")
  const [showOtherPayments, setShowOtherPayments] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [order, setOrder] = useState<SessionOrder | null>(null)
  const [bandPanel, setBandPanel] = useState<BandPanel>(null)
  const [taste, setTaste] = useState(0)
  const [ripeness, setRipeness] = useState(0)
  const [overall, setOverall] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [issueQty, setIssueQty] = useState(1)
  const [resolution, setResolution] = useState<"replacement" | "credit">("replacement")
  const [issuePhoto, setIssuePhoto] = useState(false)
  const [issueSubmitted, setIssueSubmitted] = useState(false)
  const [notified, setNotified] = useState(false)
  const [whatsappSent, setWhatsappSent] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [holdSeconds, setHoldSeconds] = useState(600)
  const [retried, setRetried] = useState(false)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    }
  }, [])

  function startBooking(q: number) {
    setQty(q)
    setSheet("details")
    setEditingAddress(false)
    setShowOtherPayments(false)
    setRetried(false)
    setHoldSeconds(600)
    setWhatsappSent(false)
    setShareCopied(false)
    setName(returningCustomer ? SAVED_CUSTOMER.name : "")
    setMobile(returningCustomer ? SAVED_CUSTOMER.mobile : "")
    setTower(returningCustomer ? SAVED_CUSTOMER.tower : "")
    setFlat(returningCustomer ? SAVED_CUSTOMER.flat : "")
  }

  const onOpenHistory = () => setScreen("history")
  const onCloseHistory = () => setScreen("home")
  const onRepeatFrom = (q: number) => {
    setScreen("home")
    setPaymentMethod("upi")
    startBooking(q)
  }
  const onReportFrom = () => {
    setScreen("home")
    setBandPanel("issue")
  }
  const onRepeatLast = () => {
    setPaymentMethod("upi")
    startBooking(lastOrderKg)
  }

  const onIncCounter = () => setCounterQty((c) => Math.min(20, c + 1))
  const onDecCounter = () => setCounterQty((c) => Math.max(1, c - 1))
  const onBookCounter = () => startBooking(counterQty)

  const onCloseSheet = () => {
    setSheet(null)
    setQty(null)
  }
  const stopProp = (e: React.MouseEvent) => e.stopPropagation()
  const onChangeAddress = () => setEditingAddress(true)
  const onShowOtherPayments = () => setShowOtherPayments(true)
  const onToggleDetails = () => setDetailsOpen((d) => !d)

  function startHoldCountdown() {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    holdTimerRef.current = setInterval(() => {
      setHoldSeconds((s) => Math.max(0, s - 1))
    }, 1000)
  }

  function completeOrder(currentQty: number, currentPaymentMethod: PaymentMethod, currentTower: string, currentFlat: string) {
    const cod = currentPaymentMethod === "cod"
    const newOrder: SessionOrder = {
      number: "#" + (1050 + Math.floor(Math.random() * 40)),
      qty: currentQty,
      amount: Math.round(currentQty * PRICE_PER_KG),
      address: currentTower ? `Tower ${currentTower}, Flat ${currentFlat}` : SAVED_CUSTOMER.text,
      status: "confirmed",
      payment: cod ? "Cash on delivery" : "Paid",
    }
    setOrder(newOrder)
    setSheet("confirmed")
    setWhatsappSent(true)
    ;(["packed", "out", "delivered"] as const).forEach((st, i) => {
      const t = setTimeout(() => {
        setOrder((prev) => (prev ? { ...prev, status: st } : prev))
      }, 8000 + i * 8000)
      timersRef.current.push(t)
    })
  }

  const onPay = () => {
    const shouldFail = simulatePaymentFailure && !retried
    const currentQty = qty ?? 0
    setSheet("paying")
    const t = setTimeout(() => {
      if (shouldFail) {
        setSheet("failed")
        startHoldCountdown()
      } else {
        completeOrder(currentQty, paymentMethod, tower, flat)
      }
    }, 1500)
    timersRef.current.push(t)
  }

  const onRetryPay = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    setRetried(true)
    const currentQty = qty ?? 0
    setSheet("paying")
    const t = setTimeout(() => completeOrder(currentQty, paymentMethod, tower, flat), 1500)
    timersRef.current.push(t)
  }

  const onPickAnotherMethod = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    setSheet("details")
    setShowOtherPayments(true)
    setRetried(true)
  }

  const onDoneSheet = () => {
    setSheet(null)
    setQty(null)
  }
  const onTrack = () => setWhatsappSent(true)
  const onShare = () => setShareCopied(true)
  const onNotify = () => setNotified(true)

  const onOpenRate = () => setBandPanel("rate")
  const onOpenIssue = () => setBandPanel("issue")
  const onCloseBandPanel = () => setBandPanel(null)
  const onSubmitRating = () => setRatingSubmitted(true)

  const onAttachPhoto = () => setIssuePhoto(true)
  const onIncIssueQty = () => setIssueQty((q) => Math.min(order ? order.qty : 5, q + 1))
  const onDecIssueQty = () => setIssueQty((q) => Math.max(1, q - 1))
  const onSubmitIssue = () => setIssueSubmitted(true)

  function ratingRow(value: number, setValue: (n: number) => void) {
    return [1, 2, 3, 4, 5].map((n) => ({
      n,
      active: value === n,
      onClick: () => setValue(n),
    }))
  }

  // ---- derived values (renderVals() equivalent) ----
  const isSoldOut = availableKg <= 0
  const isClosed = !isSoldOut && !bookingOpen
  const canBook = !isSoldOut && bookingOpen
  const stockLow = availableKg > 0 && availableKg < 10
  const stockHealthy = !stockLow && !isSoldOut
  const stockPercent = Math.max(0, Math.min(100, Math.round((availableKg / OPENING_STOCK_KG) * 100)))

  const qtyChips = QTY_OPTIONS.map((q) => ({
    value: q,
    label: q === 5 ? "5 kg" : `${q} kg`,
    disabled: q > availableKg,
    active: qty === q,
    onClick: () => startBooking(q),
  }))

  const paymentDefs = codEnabled ? PAYMENT_DEFS : PAYMENT_DEFS.filter((p) => p.value !== "cod")
  const paymentLabel = (paymentDefs.find((p) => p.value === paymentMethod) ?? paymentDefs[0]).label

  const amount = qty ? Math.round(qty * PRICE_PER_KG) : 0
  const amountText = `₹${amount}`
  const qtyText = `${qty ?? ""} kg`

  const showSavedAddress = returningCustomer && !editingAddress
  const showAddressFields = !showSavedAddress
  const mobileDigits = mobile.replace(/\D/g, "")
  const mobileOk = mobileDigits.length === 10
  const nameMissing = !returningCustomer && !name.trim()
  const payDisabled = showAddressFields && (!mobileOk || !flat.trim() || !tower.trim() || nameMissing)
  const nameHint = nameMissing ? "Tell us who to hand it to" : ""
  const mobileHint = !mobileOk && mobileDigits.length > 0 ? "Needs 10 digits" : !mobileOk ? "We send the confirmation here" : ""
  const flatHint = !tower.trim() || !flat.trim() ? "Tower and flat both needed" : ""

  const st = order ? STATUS_COPY[order.status] : null
  const mm = Math.floor(holdSeconds / 60)
  const ss = String(holdSeconds % 60).padStart(2, "0")
  const holdText = `${mm}:${ss}`

  const resolutionOptions = RESOLUTION_DEFS.map((d) => ({ ...d, checked: resolution === d.value }))

  const showRepeat = returningCustomer && !order && canBook && lastOrderKg <= availableKg
  const repeatLabel = `Repeat ${lastOrderKg} kg · ₹${Math.round(lastOrderKg * PRICE_PER_KG)}`
  const repeatSubText = `Same as 21 July · ${SAVED_CUSTOMER.text} · UPI`

  const sessionRows = order
    ? [
        {
          number: order.number,
          dateText: "Today",
          qtyText: `${order.qty} kg`,
          amountText: `₹${order.amount}`,
          subText: `Batch ${FRUIT.currentBatch}`,
          status: st!.title,
          statusClass: order.status === "delivered" ? "tag tag-accent" : "tag tag-outline",
          payment: order.payment === "Paid" ? `Paid · ${paymentLabel}` : order.payment,
          paymentClass: order.payment === "Paid" ? "tag tag-accent" : "tag tag-neutral",
          canReport: order.status === "delivered",
          repeatLabel: `Repeat ${order.qty} kg`,
          onRepeat: () => onRepeatFrom(order.qty),
          onReport: onReportFrom,
        },
      ]
    : []

  const pastRows = returningCustomer
    ? PAST_ORDERS.map((o) => ({
        number: o.number,
        dateText: o.date,
        qtyText: `${o.qty} kg`,
        amountText: `₹${Math.round(o.qty * PRICE_PER_KG)}`,
        subText: o.batch,
        status: o.status,
        statusClass: o.status === "Delivered" ? "tag tag-accent" : "tag tag-neutral",
        payment: o.payment,
        paymentClass: "tag tag-neutral",
        canReport: false,
        repeatLabel: `Repeat ${o.qty} kg`,
        onRepeat: () => onRepeatFrom(o.qty),
        onReport: onReportFrom,
      }))
    : []

  const historyRows = [...sessionRows, ...pastRows]

  return (
    <div className="fruit-app" style={{ display: "flex", justifyContent: "center", padding: "var(--space-4)" }}>
      <div style={{ width: "100%", maxWidth: 430, background: "var(--color-bg)", position: "relative", minHeight: "100vh" }}>
        <div style={{ padding: "var(--space-4)" }}>
          {screen === "home" && (
            <>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {COMMUNITY_NAME}
              </div>
              {returningCustomer && (
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 3 }}>
                  Welcome back, {SAVED_CUSTOMER.name} · {SAVED_CUSTOMER.text}
                </div>
              )}

              {order && (
                <div style={{ border: "2px solid var(--color-accent)", padding: "var(--space-3)", marginTop: "var(--space-3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-2)" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{st?.title}</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>{order.number}</div>
                  </div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>{st?.sub}</div>

                  {!bandPanel && (
                    <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-3)" }}>
                      {order.status !== "delivered" && (
                        <button className="btn btn-secondary" onClick={onTrack}>
                          {whatsappSent ? "Tracking on WhatsApp ✓" : "Track on WhatsApp"}
                        </button>
                      )}
                      {order.status === "delivered" && (
                        <button className="btn btn-primary" onClick={onOpenRate}>
                          Rate this batch
                        </button>
                      )}
                      {order.status === "delivered" && (
                        <button className="btn btn-secondary" onClick={onOpenIssue}>
                          Report an issue
                        </button>
                      )}
                    </div>
                  )}

                  {bandPanel === "rate" && (
                    <div style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)" }}>
                      {!ratingSubmitted ? (
                        <>
                          {[
                            { label: "Taste", value: taste, setValue: setTaste },
                            { label: "Ripeness", value: ripeness, setValue: setRipeness },
                            { label: "Overall", value: overall, setValue: setOverall },
                          ].map((row) => (
                            <div
                              key={row.label}
                              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}
                            >
                              <span style={{ fontSize: 12, opacity: 0.7, width: 70 }}>{row.label}</span>
                              <div style={{ display: "flex", gap: 4 }}>
                                {ratingRow(row.value, row.setValue).map((b) => (
                                  <button
                                    key={b.n}
                                    className={b.active ? "btn btn-primary" : "btn btn-secondary"}
                                    style={{ minWidth: 34, minHeight: 34, justifyContent: "center" }}
                                    onClick={b.onClick}
                                  >
                                    {b.n}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div style={{ display: "flex", gap: "var(--space-2)" }}>
                            <button className="btn btn-primary" disabled={!(taste && ripeness && overall)} onClick={onSubmitRating}>
                              Send feedback
                            </button>
                            <button className="btn btn-ghost" onClick={onCloseBandPanel}>
                              Not now
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: 13, color: "var(--color-accent-700)" }}>✓ Thanks — noted against batch {FRUIT.batchNumber}.</div>
                      )}
                    </div>
                  )}

                  {bandPanel === "issue" && (
                    <div style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)" }}>
                      {!issueSubmitted ? (
                        <>
                          <button
                            className="photo-slot"
                            style={{ width: "100%", height: 88, border: "1px solid var(--color-divider)", cursor: "pointer" }}
                            onClick={onAttachPhoto}
                          >
                            {issuePhoto ? "Photo attached ✓" : "Tap to add a photo"}
                          </button>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-3)" }}>
                            <span style={{ fontSize: 12, opacity: 0.7 }}>Affected quantity</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", border: "1px solid var(--color-divider)", padding: "0 var(--space-1)" }}>
                              <button className="btn btn-icon" onClick={onDecIssueQty}>
                                −
                              </button>
                              <span style={{ minWidth: 36, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13 }}>
                                {issueQty} kg
                              </span>
                              <button className="btn btn-icon" onClick={onIncIssueQty}>
                                +
                              </button>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", margin: "var(--space-3) 0" }}>
                            {resolutionOptions.map((opt) => (
                              <label className="radio" key={opt.value}>
                                <input type="radio" name="resolution" checked={opt.checked} onChange={() => setResolution(opt.value)} />
                                <span className="dot" />
                                {opt.label}
                              </label>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: "var(--space-2)" }}>
                            <button className="btn btn-primary" disabled={!issuePhoto} onClick={onSubmitIssue}>
                              Send for review
                            </button>
                            <button className="btn btn-ghost" onClick={onCloseBandPanel}>
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: 13, color: "var(--color-accent-700)" }}>✓ Sent for review. Our team will respond on WhatsApp today.</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="grayscale photo-slot" style={{ height: 180, marginTop: "var(--space-4)" }}>
                Guava photo — today&apos;s batch
              </div>

              <h1 style={{ fontSize: 26, margin: "var(--space-3) 0 var(--space-1)" }}>{FRUIT.name}</h1>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{FRUIT.harvestLine}</div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "var(--space-3)",
                  paddingTop: "var(--space-3)",
                  borderTop: "2px solid var(--color-divider)",
                }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 32 }}>
                  ₹{PRICE_PER_KG}<span style={{ fontSize: 14, fontWeight: 400 }}>/kg</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>Delivery today</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{FRUIT.deliveryWindow}</div>
                </div>
              </div>

              <div style={{ marginTop: "var(--space-3)" }}>
                <div style={{ height: 4, background: "var(--color-neutral-300)" }}>
                  {stockHealthy && <div style={{ height: "100%", width: `${stockPercent}%`, background: "var(--color-accent)" }} />}
                  {stockLow && <div style={{ height: "100%", width: `${stockPercent}%`, background: "var(--color-danger)" }} />}
                </div>
                {stockHealthy && <div style={{ fontSize: 12, opacity: 0.7, marginTop: 5 }}>{availableKg} kg available today</div>}
                {stockLow && (
                  <div style={{ fontSize: 12, marginTop: 5, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-danger)" }}>
                    Only {availableKg} kg left
                  </div>
                )}
              </div>

              {canBook && (
                <>
                  {showRepeat && (
                    <div style={{ marginTop: "var(--space-4)" }}>
                      <button className="btn btn-primary" style={{ width: "100%", minHeight: 52, fontSize: 16 }} onClick={onRepeatLast}>
                        {repeatLabel}
                      </button>
                      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 5 }}>{repeatSubText}</div>
                    </div>
                  )}

                  <div style={{ marginTop: "var(--space-4)" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55, marginBottom: "var(--space-2)" }}>
                      Or another quantity
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-2)" }}>
                      {qtyChips.map((chip) => (
                        <button
                          key={chip.value}
                          className={chip.active ? "btn btn-primary" : "btn btn-secondary"}
                          style={{ minHeight: 48, justifyContent: "flex-start" }}
                          disabled={chip.disabled}
                          onClick={chip.onClick}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                      <span style={{ fontSize: 12, opacity: 0.6, flex: 1 }}>Other quantity</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", border: "1px solid var(--color-divider)", padding: "0 var(--space-1)" }}>
                        <button className="btn btn-icon" onClick={onDecCounter}>
                          −
                        </button>
                        <span style={{ minWidth: 38, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>
                          {counterQty} kg
                        </span>
                        <button className="btn btn-icon" onClick={onIncCounter}>
                          +
                        </button>
                      </div>
                      <button className="btn btn-secondary" style={{ minHeight: 44 }} onClick={onBookCounter}>
                        Book
                      </button>
                    </div>
                  </div>
                </>
              )}

              {isSoldOut && (
                <div style={{ marginTop: "var(--space-4)", border: "2px solid var(--color-danger)", padding: "var(--space-3)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-danger)" }}>
                    Today&apos;s harvest is sold out
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>The next batch is picked tomorrow morning.</div>
                  <button className="btn btn-primary" style={{ marginTop: "var(--space-3)", minHeight: 44 }} onClick={onNotify}>
                    {notified ? "You're on the list ✓" : "Notify me"}
                  </button>
                </div>
              )}

              {isClosed && (
                <div style={{ marginTop: "var(--space-4)", border: "2px solid var(--color-divider)", padding: "var(--space-3)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>Booking closed for today</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Orders close at 2 PM so the fruit can be packed. Tomorrow&apos;s board opens at 7 AM.
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: "var(--space-3)", minHeight: 44 }} onClick={onNotify}>
                    {notified ? "You're on the list ✓" : "Notify me"}
                  </button>
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: 0,
                  borderTop: "2px solid var(--color-divider)",
                  borderBottom: "2px solid var(--color-divider)",
                  padding: "var(--space-3) 0",
                  marginTop: "var(--space-4)",
                  cursor: "pointer",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "var(--color-text)",
                  textAlign: "left",
                }}
                onClick={onToggleDetails}
              >
                Why this batch<span style={{ fontSize: 16 }}>{detailsOpen ? "−" : "+"}</span>
              </button>

              {detailsOpen && (
                <>
                  <div style={{ paddingTop: "var(--space-3)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3) var(--space-4)", fontSize: 13 }}>
                    {BATCH_DETAILS.map(([label, value]) => (
                      <div key={label}>
                        <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>{label}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
                    <div className="grayscale photo-slot" style={{ height: 96 }}>
                      Farm photo
                    </div>
                    <div className="grayscale photo-slot" style={{ height: 96 }}>
                      Packing photo
                    </div>
                  </div>
                  <p style={{ fontSize: 13, marginTop: "var(--space-3)" }}>
                    If any fruit is internally damaged, send a photograph within 24 hours — we replace the affected quantity or credit it. No
                    questions repeated.
                  </p>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
                <div style={{ fontSize: 13 }}>{FRUIT.nextFruitTeaser}</div>
                <button className="btn btn-ghost" onClick={onNotify}>
                  {notified ? "You're on the list ✓" : "Notify me"}
                </button>
              </div>

              <button
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: 0,
                  borderTop: "2px solid var(--color-divider)",
                  padding: "var(--space-3) 0",
                  marginTop: "var(--space-4)",
                  cursor: "pointer",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "var(--color-text)",
                  textAlign: "left",
                }}
                onClick={onOpenHistory}
              >
                {historyRows.length > 0 ? `Your orders · ${historyRows.length}` : "Your orders"}
                <span style={{ fontSize: 16 }}>→</span>
              </button>

              <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-3)", borderTop: "2px solid var(--color-divider)", fontSize: 11, opacity: 0.6, lineHeight: 1.7 }}>
                {SUPPORT_LINE}
                <br />
                {SUPPORT_PHONE_LINE}
              </div>
            </>
          )}

          {screen === "history" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <button className="btn btn-icon" style={{ border: "1px solid var(--color-divider)" }} onClick={onCloseHistory}>
                  ←
                </button>
                <h2 style={{ margin: 0, fontSize: 24 }}>Your orders</h2>
              </div>

              {historyRows.length === 0 && (
                <div style={{ marginTop: "var(--space-6)", border: "1px solid var(--color-divider)", padding: "var(--space-4)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>No orders yet</div>
                  <p style={{ fontSize: 13, margin: "6px 0 var(--space-3)" }}>
                    Your first booking shows up here with its batch, delivery time and receipt.
                  </p>
                  <button className="btn btn-primary" style={{ minHeight: 44 }} onClick={onCloseHistory}>
                    See today&apos;s harvest
                  </button>
                </div>
              )}

              {historyRows.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                  {historyRows.map((o) => (
                    <div key={o.number} style={{ border: "1px solid var(--color-divider)", padding: "var(--space-3)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-2)" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>
                          {o.qtyText} · {o.amountText}
                        </div>
                        <div style={{ fontSize: 11, opacity: 0.6 }}>{o.dateText}</div>
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{o.subText}</div>
                      <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginTop: "var(--space-2)", flexWrap: "wrap" }}>
                        <span className={o.statusClass}>{o.status}</span>
                        <span className={o.paymentClass}>{o.payment}</span>
                        <span style={{ fontSize: 11, opacity: 0.6 }}>{o.number}</span>
                      </div>
                      <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                        <button className="btn btn-secondary" style={{ minHeight: 44, whiteSpace: "nowrap" }} onClick={o.onRepeat}>
                          {o.repeatLabel}
                        </button>
                        {o.canReport && (
                          <button className="btn btn-ghost" onClick={o.onReport}>
                            Report an issue
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-3)", borderTop: "2px solid var(--color-divider)", fontSize: 11, opacity: 0.6, lineHeight: 1.7 }}>
                {SUPPORT_HISTORY_LINE}
              </div>
            </>
          )}
        </div>

        {sheet && (
          <div
            style={{ position: "fixed", inset: 0, background: "color-mix(in srgb, var(--color-neutral-900) 45%, transparent)", display: "flex", alignItems: "flex-end" }}
            onClick={onCloseSheet}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 430,
                margin: "0 auto",
                background: "var(--color-bg)",
                borderTop: "2px solid var(--color-text)",
                padding: "var(--space-4)",
                boxShadow: "var(--shadow-lg)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={stopProp}
            >
              {sheet === "details" && (
                <>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>
                    {qtyText} · {amountText}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>{FRUIT.name} · today, {FRUIT.deliveryWindow}</div>

                  <div style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)" }}>
                    {showSavedAddress && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ fontSize: 14 }}>{SAVED_CUSTOMER.text}</div>
                        <button className="btn btn-ghost" onClick={onChangeAddress}>
                          Change
                        </button>
                      </div>
                    )}
                    {showAddressFields && (
                      <>
                        {!returningCustomer && (
                          <>
                            <div className="field">
                              <label>Name</label>
                              <input className="input" style={{ minHeight: 44 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Kiran" />
                            </div>
                            {nameHint && <div style={{ fontSize: 11, color: "var(--color-danger)", margin: "-4px 0 var(--space-2)" }}>{nameHint}</div>}
                          </>
                        )}
                        <div className="field">
                          <label>WhatsApp number</label>
                          <input
                            className="input"
                            style={{ minHeight: 44 }}
                            type="tel"
                            inputMode="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="10-digit mobile"
                          />
                        </div>
                        {mobileHint && <div style={{ fontSize: 11, color: "var(--color-danger)", margin: "-4px 0 var(--space-2)" }}>{mobileHint}</div>}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
                          <div className="field">
                            <label>Tower</label>
                            <input className="input" style={{ minHeight: 44 }} value={tower} onChange={(e) => setTower(e.target.value)} placeholder="B" />
                          </div>
                          <div className="field">
                            <label>Flat</label>
                            <input className="input" style={{ minHeight: 44 }} value={flat} onChange={(e) => setFlat(e.target.value)} placeholder="1204" />
                          </div>
                        </div>
                        {flatHint && <div style={{ fontSize: 11, color: "var(--color-danger)", margin: "-4px 0 var(--space-2)" }}>{flatHint}</div>}
                      </>
                    )}
                  </div>

                  <div style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)" }}>
                    {!showOtherPayments && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ fontSize: 14 }}>Paying by {paymentLabel}</div>
                        <button className="btn btn-ghost" onClick={onShowOtherPayments}>
                          Other ways
                        </button>
                      </div>
                    )}
                    {showOtherPayments && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                        {paymentDefs.map((opt) => (
                          <label className="radio" style={{ minHeight: 32 }} key={opt.value}>
                            <input type="radio" name="paymentMethod" checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value)} />
                            <span className="dot" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", minHeight: 52, marginTop: "var(--space-4)", fontSize: 16 }}
                    disabled={payDisabled}
                    onClick={onPay}
                  >
                    {paymentMethod === "cod" ? `Confirm ${qtyText} · pay on delivery` : `Pay ${amountText} & confirm`}
                  </button>
                  <button className="btn btn-ghost" style={{ marginTop: "var(--space-2)" }} onClick={onCloseSheet}>
                    Cancel
                  </button>
                </>
              )}

              {sheet === "paying" && (
                <>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>Confirming your payment</div>
                  <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4, marginBottom: "var(--space-3)" }}>
                    {paymentMethod === "cod" ? `Reserving your ${qtyText}…` : "Approve the request in your UPI app."}
                  </div>
                  <div style={{ height: 4, background: "var(--color-neutral-300)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: "40%",
                        background: "var(--color-accent)",
                        animation: "fruit-app-indeterminate 1.1s linear infinite",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: "var(--space-3)" }}>Please don&apos;t close this screen.</div>
                </>
              )}

              {sheet === "failed" && (
                <>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "var(--color-danger)" }}>
                    Payment didn&apos;t go through
                  </div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>
                    No money was taken. Your {qtyText} is held for <strong>{holdText}</strong> — retry within that and the stock stays yours.
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", minHeight: 52, marginTop: "var(--space-4)", fontSize: 16, whiteSpace: "nowrap" }}
                    onClick={onRetryPay}
                  >
                    Retry {amountText}
                  </button>
                  <button className="btn btn-secondary" style={{ width: "100%", minHeight: 44, marginTop: "var(--space-2)" }} onClick={onPickAnotherMethod}>
                    Choose another method
                  </button>
                  <button className="btn btn-ghost" style={{ marginTop: "var(--space-2)" }} onClick={onCloseSheet}>
                    Cancel booking
                  </button>
                </>
              )}

              {sheet === "confirmed" && order && (
                <>
                  <span className="tag tag-accent" style={{ width: "fit-content" }}>
                    ORDER CONFIRMED
                  </span>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, marginTop: "var(--space-2)" }}>
                    {qtyText} · {amountText}
                  </div>
                  <div style={{ marginTop: "var(--space-3)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", fontSize: 13 }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>Order</div>
                      <div>{order.number}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>Payment</div>
                      <div>{order.payment}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>Delivering to</div>
                      <div>{order.address}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>Window</div>
                      <div>Today, 5–8 PM</div>
                    </div>
                  </div>
                  {whatsappSent && <div style={{ fontSize: 12, color: "var(--color-accent-700)", marginTop: "var(--space-3)" }}>✓ Confirmation sent on WhatsApp</div>}
                  {shareCopied && <div style={{ fontSize: 12, color: "var(--color-accent-700)", marginTop: "var(--space-2)" }}>✓ Link copied — share with your neighbours</div>}
                  <button className="btn btn-primary" style={{ width: "100%", minHeight: 52, marginTop: "var(--space-4)", fontSize: 16 }} onClick={onDoneSheet}>
                    Done
                  </button>
                  <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                    <button className="btn btn-ghost" onClick={onTrack}>
                      Track on WhatsApp
                    </button>
                    <button className="btn btn-ghost" onClick={onShare}>
                      Share
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
