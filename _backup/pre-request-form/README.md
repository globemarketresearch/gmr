# Backup — Pre Request-Form Changes

Snapshot taken on **2026-05-23** before converting the checkout flow from a
live Stripe/PayPal payment to a "Buy Now" request-capture form.

## Files backed up

| Backup path | Original source |
|---|---|
| `components/checkout/CheckoutForm.tsx` | `components/checkout/CheckoutForm.tsx` |
| `app/checkout/[reportId]/page.tsx` | `app/checkout/[reportId]/page.tsx` |
| `app/order-success/page.tsx` | `app/order-success/page.tsx` |

## What changed

- `CheckoutForm.tsx` — replaced the 2-step details → payment flow with a
  single-step purchase-request form (submits via the forms API).  
  Stripe & PayPal imports/handlers are preserved as comments in the live file.
- `app/checkout/[reportId]/page.tsx` — updated copy (title, h1, trust badges).
- `app/order-success/page.tsx` — updated copy from "Payment Confirmed" to
  "Request Received".

## Restoring

Copy any file from this folder back to its original path to revert that change.
