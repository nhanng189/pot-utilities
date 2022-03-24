import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSound from "use-sound";

import { useAnimationFrame } from "../../utils/hooks";

import "./style.scss";

const FRICTION = 0.99; // 0.995 = soft, 0.99 = mid, 0.98 = hard
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

export default function Wheel() {
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
      ctx.fillStyle = sector.color;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, ang, ang + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      // TEXT
      ctx.translate(rad, rad);
      ctx.rotate(ang + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 25px monospace";
      ctx.fillText(sector.label, rad - 10, 10);
      //
      ctx.restore();
    });
  }, [content]);

  useAnimationFrame(() => {
    setAngVel((prevAngVel) => {
      const newAngVel = prevAngVel * FRICTION;
      if (newAngVel < 0.0001) {
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
      <Head>
        <title>Xamxi | Vòng quay</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vòng quay" />
        <meta property="og:description" content="Vòng quay" />
      </Head>
      {winPopup !== "" && (
        <div className="absolute w-full h-full flex items-center justify-center z-50 bg-gray-700 bg-opacity-80">
          <div className="rounded bg-white p-8 flex flex-col items-center space-y-4">
            <img
              className="flow-root"
              src="/champion.svg"
              alt="champion"
              width={80}
            ></img>
            <div className="flow-root">!!! We have a winner !!!</div>
            <div className="flow-root text-xl">{winPopup}</div>
            <div>
              <button
                className="rounded bg-red-500 p-2 mr-4"
                onClick={() => {
                  setContent((prevContent) => {
                    prevContent += "\n";
                    let newContent = prevContent.replace(`${winPopup}\n`, "");
                    return newContent.substr(0, newContent.length - 1);
                  });
                  setWinPopup("");
                }}
              >
                Remove winner
              </button>
              <button
                className="rounded bg-blue-500 p-2"
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
      <div className="font-mono text-purple-900 w-full h-full px-4">
        <div className="container h-full m-auto flex flex-col">
          <div
            className="relative flex flex-wrap justify-between items-center py-4"
            style={{ minHeight: 84 }}
          >
            <div className="flex items-center">
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-x-1 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                {"<<"} Trang chủ
              </div>
            </div>
            <div className="flex-grow-0 sm:flex-grow"></div>
            <div className="flex items-center">
              <img
                style={{ height: 48 }}
                src="/pot.png"
                alt="app-logo"
                className="mb-4 sm:mb-0"
              />
              <div className="ml-4 text-xl font-bold">Những thứ xàm xí</div>
            </div>
            <div className="flex-grow-0 sm:flex-grow"></div>
          </div>

          <div
            className="relative grid sm:grid-cols-3 grid-cols-1 gap-16"
            style={{ height: "calc(100vh - 84px)" }}
          >
            <div className="sm:col-span-2 col-span-1 sm:py-8">
              <div id="square-div">
                <div id="content-square">
                  <div id="wheelOfFortune">
                    <canvas id="wheel" ref={canvas}></canvas>
                    <div
                      onClick={() => {
                        if (sectors.length > 0 && angVel === 0) {
                          setAngVel(rand(0.2, 0.5));
                        }
                      }}
                      id="spin"
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

            <div className="sm:py-8 relative">
              <button
                disabled={angVel !== 0}
                style={{
                  cursor: angVel === 0 ? "pointer" : "not-allowed",
                }}
                className="absolute right-0 rounded bg-green-500 p-2"
                onClick={() => {
                  setContent(getShuffleContent(content));
                }}
              >
                Xáo trộn
              </button>
              <textarea
                style={{
                  cursor: angVel === 0 ? "pointer" : "not-allowed",
                }}
                disabled={angVel !== 0}
                className="bg-transparent h-96 w-full rounded border-2 p-4"
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
