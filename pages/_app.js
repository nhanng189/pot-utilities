import { AnimateSharedLayout } from "framer-motion";

import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <div
        style={{ zIndex: "-1" }}
        className="fixed w-screen h-screen top-0 left-0 bg-cover bg-shape-pattern"
      ></div>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}
