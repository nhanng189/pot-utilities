/* eslint-disable react/display-name */
import Head from "next/head";

import NavigationBar from "../components/NavigationBar";
import Header from "../components/LandingPage/Header";
import Features from "../components/LandingPage/Features";

function Home() {
  return (
    <div
      className="min-h-screen bg-blog-light-background dark:bg-blog-dark-background"
      style={{
        transitionProperty: "background-color",
        transitionDuration: "0.15s",
      }}
    >
      <div className="relative max-w-screen-lg w-full m-auto px-8 sm:px-12 lg:px-5 xl:px-0">
        <NavigationBar />
        <Header />
        <div className="mb-10 md:mb-16 lg:mb-20" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="gradient-bg gradient-bg-3 absolute mix-blend-screen overflow-visible opacity-[80%]"
        >
          <defs>
            <radialGradient
              id="Gradient1"
              cx="50%"
              cy="50%"
              fx="10%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="34s"
                values="0%;10%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="#00aeef"></stop>
              <stop offset="100%" stopColor="#00aeef00"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient2"
              cx="50%"
              cy="50%"
              fx="10%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="23.5s"
                values="0%;10%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="#ec008c"></stop>
              <stop offset="100%" stopColor="#ec008c00"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient3"
              cx="50%"
              cy="50%"
              fx="50%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="21.5s"
                values="0%;10%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="#fff200"></stop>
              <stop offset="100%" stopColor="#fff20000"></stop>
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
            <animate
              attributeName="x"
              dur="20s"
              values="25%;0%;25%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="21s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="17s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
            <animate
              attributeName="x"
              dur="23s"
              values="-25%;0%;-25%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="24s"
              values="0%;50%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="18s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient3)">
            <animate
              attributeName="x"
              dur="25s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="26s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50"
              to="0 50 50"
              dur="19s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
        </svg>
        <Features />
        <div className="pt-12"></div>
      </div>
    </div>
  );
}

const withHead = (ChildComponent) => () =>
  (
    <>
      <Head>
        <title>XAMXI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="XAMXI" />
        <meta property="og:url" content="https://xamxi.tk/" />
        <meta
          property="og:description"
          content="Ở đây cung cấp những chiếc tiện ích có như không có, tóm lại là như nồi, cam kết không giúp được gì."
        />
        <meta property="og:image" content="/vercel.png" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1500" />
        <meta property="og:type" content="website" />
      </Head>
      {ChildComponent()}
    </>
  );

export default withHead(Home);
