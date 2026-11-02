'use client';

import { useEffect, useRef, useState } from 'react';

interface PayPalButtonProps {
  paypalOrderId: string;
  onApprove: (paypalOrderId: string) => Promise<void> | void;
  onError: (err: unknown) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paypal?: any;
  }
}

const SCRIPT_ID = 'paypal-js-sdk';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

/**
 * True when a real PayPal client ID is configured. Placeholder values
 * (TEMP / PASTE_...) count as "not configured" so checkout falls back to
 * the manual purchase-request flow instead of showing a broken button.
 */
export const isPayPalConfigured =
  CLIENT_ID.length > 20 && !/^(TEMP|PASTE_|your-)/i.test(CLIENT_ID);

/**
 * Loads the PayPal JS SDK once per page. Sandbox vs live is decided by the
 * client ID itself — the SDK URL is the same for both environments.
 */
function loadPayPalSdk(): Promise<void> {
  if (window.paypal) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src =
        `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(CLIENT_ID)}` +
        '&currency=USD&intent=capture&components=buttons';
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => {
      script?.remove(); // allow a retry on next mount
      reject(new Error('Failed to load PayPal SDK'));
    }, { once: true });
  });
}

export function PayPalButton({ paypalOrderId, onApprove, onError, onCancel }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);

  // Keep latest callbacks without re-rendering the PayPal buttons.
  const handlers = useRef({ onApprove, onError, onCancel });
  handlers.current = { onApprove, onError, onCancel };

  useEffect(() => {
    let cancelled = false;
    loadPayPalSdk()
      .then(() => { if (!cancelled) setSdkReady(true); })
      .catch((err) => { if (!cancelled) handlers.current.onError(err); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!sdkReady || !containerRef.current || !window.paypal) return;

    const buttons = window.paypal.Buttons({
      createOrder: () => paypalOrderId,
      onApprove: async (data: { orderID: string }) => {
        await handlers.current.onApprove(data.orderID);
      },
      onCancel: () => handlers.current.onCancel?.(),
      onError: (err: unknown) => handlers.current.onError(err),
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
    });

    buttons.render(containerRef.current).catch((err: unknown) => {
      // render() rejects if the container unmounts mid-render; ignore that case.
      if (containerRef.current) handlers.current.onError(err);
    });

    return () => {
      buttons.close?.().catch?.(() => {});
    };
  }, [sdkReady, paypalOrderId]);

  return (
    // `relative z-0 isolate` creates a stacking context so the z-index PayPal
    // puts on its iframes can't escape and paint over the fixed site header.
    <div className="relative z-0 isolate w-full">
      {!sdkReady && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin h-6 w-6 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
          <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading payment options...</span>
        </div>
      )}
      <div ref={containerRef} id="paypal-button-container" className="w-full" />
    </div>
  );
}
