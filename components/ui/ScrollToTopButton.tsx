"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

declare global {
  interface Window {
    Tawk_API?: {
      onChatMaximized?: () => void;
      onChatMinimized?: () => void;
      onChatHidden?: () => void;
      onChatStarted?: () => void;
    };
  }
}

export default function ScrollToTopButton() {
  const [scrolled, setScrolled] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the button while the Tawk chat window is open so it's never covered/overlapping.
  useEffect(() => {
    let cancelled = false;

    const attachTawkHandlers = () => {
      if (cancelled || !window.Tawk_API) return false;

      window.Tawk_API.onChatMaximized = () => setChatExpanded(true);
      window.Tawk_API.onChatStarted = () => setChatExpanded(true);
      window.Tawk_API.onChatMinimized = () => setChatExpanded(false);
      window.Tawk_API.onChatHidden = () => setChatExpanded(false);
      return true;
    };

    if (!attachTawkHandlers()) {
      const interval = setInterval(() => {
        if (attachTawkHandlers()) clearInterval(interval);
      }, 500);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!scrolled || chatExpanded) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className="fixed z-40 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
      style={{
        right: "150px",
        bottom: "22px",
        background: "var(--teal-deep, #0f766e)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <ArrowUp size={20} strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
