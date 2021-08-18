import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tiện ích như nồi</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="Otuti"
          href="/opensearch.xml"
        />
        <meta property="og:title" content="Những tiện ích như nồi" />
        <meta property="og:url" content="https://otuti.tk/" />
        <meta property="og:description" content="Ở đây cung cấp những chiếc tiện ích có như không có, tóm lại là như nồi, cam kết không giúp được gì." />
        <meta property="og:image" content="/pot.png" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1500" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="font-mono text-white w-full h-full px-4">
        <div className="container h-full m-auto flex flex-col">
          <div
            className="flex flex-wrap	justify-center items-center py-4"
            style={{ minHeight: 84 }}
          >
            <div className="flex items-center">
              <img
                style={{ height: 48 }}
                src="/pot.png"
                alt="app-logo"
                className="mb-4 sm:mb-0"
              />
              <div className="ml-4 text-xl font-bold">p[Otuti]lities</div>
            </div>
            <div className="flex-grow-0 sm:flex-grow"></div>
            <div
              style={{ height: "fit-content" }}
              className="flex items-center"
            >
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/meme-quotes");
                }}
              >
                Meme quote
              </div>
              <div className="mx-2">|</div>
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/url-shortener");
                }}
              >
                Url shortener
              </div>
              <div className="mx-2">|</div>
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/wheel-of-names");
                }}
              >
                Wheel
              </div>
              <div className="mx-2">|</div>
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/text-to-speech");
                }}
              >
                Text2Speech
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
