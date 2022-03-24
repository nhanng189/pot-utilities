import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nProgress from "nprogress";

import "../styles/globals.scss";
import "../styles/nprogress.css";

nProgress.configure({ showSpinner: false });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <div
        style={{ zIndex: "-1" }}
        className="fixed w-screen h-screen top-0 left-0 bg-cover bg-purple-50"
      ></div>
      <Component {...pageProps} />
    </>
  );
}
