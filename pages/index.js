/* eslint-disable react/display-name */
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSound from "use-sound";

import ThemeSwitcher from "../components/ThemeSwitcher";
import Champion from "../assets/img/champion.svg";

import { useAnimationFrame } from "../utils/hooks";

import styles from "./index.module.css";

const NavigationBar = () => {
  return (
    <section id="navigation" className="text-3xl">
      <nav className="w-full flex items-center justify-between h-[128px]">
        <Link
          href="/"
          className="animated-underline focus:outline-none block whitespace-nowrap text-2xl uppercase tracking-wide font-bold dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black"
        >
          COW WHEEL
        </Link>
        <div className="flex items-center justify-center pl-10 py-2">
          <ThemeSwitcher />
        </div>
      </nav>
    </section>
  );
};

const FRICTION = 0.988; // 0.995 = soft, 0.99 = mid, 0.98 = hard
const rand = (m, M) => Math.random() * (M - m) + m;
const COLOR_WHEEL = [
  "#C9050B",
  "#F67600",
  "#F5BA01",
  "#6EB325",
  "#2F7DDF",
  "#6018C8",
];

const getSectorsFromContent = (content) => {
  const lines = content.split(/\n/);
  const arrLabel = [];
  for (let i = 0; i < lines.length; i++) {
    // Only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      arrLabel.push(lines[i].trim());
    }
  }

  let i = 0;
  const sectors = arrLabel.reduce((sectors, label) => {
    if (i >= COLOR_WHEEL.length) {
      i = 0;
    }
    sectors.push({
      color: COLOR_WHEEL[i],
      label,
    });
    i++;
    return sectors;
  }, []);

  if (sectors.length === 0) {
    return [
      {
        color: COLOR_WHEEL[0],
        label: "",
      },
    ];
  }
  return sectors;
};

const getShuffleContent = (content) => {
  let arrayContent = getSectorsFromContent(content).map((o) => o.label);
  for (let i = arrayContent.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayContent[i], arrayContent[j]] = [arrayContent[j], arrayContent[i]];
  }
  return arrayContent.join("\n");
};

function Wheel() {
  const router = useRouter();
  const [angVel, setAngVel] = useState(0); // Vận tốc góc
  const [angle, setAngle] = useState(0); // Góc
  const [content, setContent] = useState("");
  const [currentSector, setCurrentSector] = useState(0);
  const [winPopup, setWinPopup] = useState("");
  const [playUh, optsUh] = useSound("/uh.mp3", { interrupt: true });
  const [playYeah, optsYeah] = useSound("/yeah.mp3", { interrupt: true });

  const canvas = useRef();
  let ctx = null;

  // Initialize the canvas context
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    setContent(localStorage.getItem("content") || "Nhập\nTên\nVô\nĐây\nNè");
  }, []);

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  useEffect(() => {
    const sectors = getSectorsFromContent(content);

    const canvasEle = canvas.current;
    ctx = canvasEle.getContext("2d");

    const rad = ctx.canvas.width / 2;
    const arc = (2 * Math.PI) / sectors.length;
    sectors.forEach((sector, index) => {
      const ang = arc * index;

      ctx.save();
      // COLOR
      ctx.beginPath();
      ctx.fillStyle = `${sector.color}`;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, ang, ang + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      ctx.lineWidth = 0.1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      // TEXT
      ctx.translate(rad, rad);
      ctx.rotate(ang + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px monospace";
      ctx.fillText(sector.label, rad - 10, 10);
      //
      ctx.restore();
    });
  }, [content]);

  useAnimationFrame(() => {
    setAngVel((prevAngVel) => {
      const newAngVel = prevAngVel * FRICTION;
      if (newAngVel < 0.0003) {
        return 0;
      }
      return newAngVel;
    });
  });

  useEffect(() => {
    // Get angle from angVel
    setAngle((prevAngle) => {
      if (prevAngle !== 0 && angVel === 0) {
        optsYeah.stop();
        playYeah();
        setWinPopup(
          (sectors[currentSector] && sectors[currentSector].label) || ""
        );
      }
      let ang = prevAngle + angVel;
      ang %= 2 * Math.PI;
      return ang;
    });
  }, [angVel]);

  useEffect(() => {
    // Get current sector from content and angle
    const sectors = getSectorsFromContent(content);
    const canvasEle = canvas.current;
    canvasEle.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
    setCurrentSector(
      Math.floor(sectors.length - (angle / (2 * Math.PI)) * sectors.length) %
        sectors.length
    );
  }, [angle, content]);

  useEffect(() => {
    optsUh.stop();
    playUh();
  }, [currentSector]);

  const sectors = getSectorsFromContent(content);

  return (
    <>
      {winPopup !== "" && (
        <div className="top-0 fixed w-full h-full flex items-center justify-center z-50 bg-gray-700 bg-opacity-80">
          <div className="rounded bg-white p-8 flex flex-col items-center space-y-4">
            <Image src={Champion} alt="champion" width={80} height={80} />
            <div className="flow-root">!!! We have a winner !!!</div>
            <div className="flow-root text-xl">{winPopup}</div>
            <div>
              <button
                className="rounded bg-orange-500 p-2 mr-4 text-white"
                onClick={() => {
                  setContent((prevContent) => {
                    prevContent += "\n";
                    let newContent = prevContent.replace(`${winPopup}\n`, "");
                    return newContent.substring(0, newContent.length - 1);
                  });
                  setWinPopup("");
                }}
              >
                Remove
              </button>
              <button
                className="rounded bg-red-500 p-2 mr-4 text-white"
                onClick={() => {
                  setContent((prevContent) => {
                    prevContent += "\n";
                    const re = new RegExp(`${winPopup}\n`, "g");
                    let newContent = prevContent.replace(re, "");
                    return newContent.substring(0, newContent.length - 1);
                  });
                  setWinPopup("");
                }}
              >
                Remove all
              </button>
              <button
                className="rounded bg-blue-500 p-2 text-white"
                onClick={() => {
                  setWinPopup("");
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-blog-light-background dark:bg-blog-dark-background"
        style={{
          transitionProperty: "background-color",
          transitionDuration: "0.15s",
        }}
      >
        <div className="relative max-w-screen-lg w-full m-auto px-8 sm:px-12 lg:px-5 xl:px-0">
          <NavigationBar />
          <div
            className="grid grid-cols-3 gap-x-24 gap-y-0"
            style={{
              minHeight: "calc(100vh - 128px)",
            }}
          >
            <div className="col-span-3 md:col-span-2 flex items-center">
              <div className={styles["square-div"]}>
                <div className={styles["content-square"]}>
                  <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
                    <canvas
                      className="block w-[98%] h-[98%]"
                      ref={canvas}
                    ></canvas>
                    <div
                      onClick={() => {
                        if (sectors.length > 0 && angVel === 0) {
                          setAngVel(rand(0.2, 0.65));
                        }
                      }}
                      className={styles.spin}
                      style={{
                        cursor: angVel === 0 ? "pointer" : "not-allowed",
                        background: sectors[currentSector]
                          ? `${sectors[currentSector].color}`
                          : COLOR_WHEEL[0],
                      }}
                    >
                      {sectors[currentSector]
                        ? sectors[currentSector].label
                        : "SPIN"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1 flex flex-col text-black dark:text-white my-8">
              <div className="flex mb-5">
                <button
                  disabled={angVel !== 0}
                  style={{
                    cursor: angVel === 0 ? "pointer" : "not-allowed",
                  }}
                  className="animated-arrow-button border-black dark:border-[#ffffff4d] mr-2"
                  onClick={() => {
                    setContent(getShuffleContent(content));
                  }}
                >
                  <div className="animated-arrow-button-wrapper">
                    Shuffle
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        className="animated-arrow-button-arrow w-5"
                      >
                        <rect width="256" height="256" fill="none" />
                        <path
                          d="M32,72H83.9a7.8,7.8,0,0,1,6.5,3.4l75.2,105.2a7.8,7.8,0,0,0,6.5,3.4H232"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="12"
                        />
                        <polyline
                          points="208 48 232 72 208 96"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="12"
                        />
                        <polyline
                          points="208 160 232 184 208 208"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="12"
                        />
                        <path
                          d="M147.7,100.5l17.9-25.1a7.8,7.8,0,0,1,6.5-3.4H232"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="12"
                        />
                        <path
                          d="M32,184H83.9a7.8,7.8,0,0,0,6.5-3.4l17.9-25.1"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="12"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <button
                  disabled={angVel !== 0}
                  style={{
                    cursor: angVel === 0 ? "pointer" : "not-allowed",
                  }}
                  className="animated-arrow-button border-black dark:border-[#ffffff4d]"
                  onClick={() => {
                    setContent((preContent) => {
                      return preContent + "\n" + preContent;
                    });
                  }}
                >
                  <div className="animated-arrow-button-wrapper">
                    Duplicate
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="animated-arrow-button-arrow w-5"
                      >
                        <path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16C3.64 17.2 2 14.79 2 12zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <textarea
                style={{
                  cursor: angVel === 0 ? "text" : "not-allowed",
                }}
                disabled={angVel !== 0}
                className="bg-transparent w-full h-full border border-solid border-black dark:border-[#ffffff4d] p-4"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const withHead = (ChildComponent) => () =>
  (
    <>
      <Head>
        <title>Cow Wheel</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Cow Wheel" />
        <meta property="og:url" content="https://cowwheel.vercel.app/" />
        <meta property="og:description" content="Cow Wheel" />
        <meta property="og:type" content="website" />
      </Head>
      {ChildComponent()}
    </>
  );

export default withHead(Wheel);
