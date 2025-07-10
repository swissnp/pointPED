import '@/styles/globals.css'
import React, { useEffect } from "react";
import { Workbox } from "workbox-window";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ensure service workers are supported and we are in production
    if (
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      const wb = new Workbox("/sw.js", { scope: "/" });
      wb.register();
    } else {
      console.warn("Progressive Web App support is disabled or not in production mode.");
    }
  }, []);

  return <Component {...pageProps} />;
}



