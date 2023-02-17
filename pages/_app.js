import '@/styles/globals.css'
import React, { useEffect } from "react";
import { Workbox } from "workbox-window";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      console.warn("Progressive Web App support is disabled");
      return;
    }
const wb = new Workbox("sw.js", { scope: "/" });
    wb.register();
  }, []);
return <Component {...pageProps} />;
}



