import Head from "next/head";

import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pot Utilities</title>
        <meta
          name="og:description"
          property="og:description"
          content="lan jee"
        />
        <meta
          name="og:description1"
          property="og:description1"
          content="lan jee meme"
        />
        <meta
          name="og:description2"
          property="og:description2"
          content="lan jee generator"
        />
        <meta
          name="og:description3"
          property="og:description3"
          content="quote generator"
        />
        <meta
          name="og:description4"
          property="og:description4"
          content="cau noi lan fee"
        />
        <meta
          name="og:description5"
          property="og:description5"
          content="tao cau noi meme"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
