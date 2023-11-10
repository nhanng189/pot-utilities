import _get from "lodash/get";
import { useState, useEffect } from "react";
import cookie from "cookie";
import { Analytics } from "@vercel/analytics/react";

import { ThemeContext } from "../components/ThemeSwitcher/ThemeContext";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(pageProps.theme);

  useEffect(() => {
    document.cookie = cookie.serialize("theme", theme);
  }, [theme]);

  return (
    <div id="theme-provider" className={theme === "dark" ? "dark" : ""}>
      <Analytics />
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const cookies = _get(appContext, "ctx.req.cookies", {});

  return { pageProps: { theme: cookies?.theme } };
};

export default MyApp;
