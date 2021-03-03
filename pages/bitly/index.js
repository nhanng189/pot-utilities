import Head from "next/head";
import React from "react";

export default function UrlGateway() {
  return (
    <>
      <Head>
        <title>Url Gateway</title>
        <meta
          name="og:title"
          property="og:title"
          content="European Travel Destinations"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Offering tour packages for individuals or groups."
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://media.nesta.org.uk/images/Predictions-2019_Twitter_02.width-1200.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hello world</div>
    </>
  );
}
