import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { useAnimationFrame, useWindowSize } from "../../utils/hooks";

import "./style.scss";

const FRICTION = 0.995; // 0.995 = soft, 0.99 = mid, 0.98 = hard
const rand = (m, M) => Math.random() * (M - m) + m;
const COLOR_WHEEL = [
  "#003300",
  "#000033",
  "#330000",
  "#333333",
  "#003333",
  "#330033",
  "#333300",
  "#006600",
  "#330066",
  "#006633",
];

export default function Wheel() {
  const router = useRouter();
  const [angVel, setAngVel] = useState(0); // Vận tốc góc
  const [angle, setAngle] = useState(0); // Góc
  const [content, setContent] = useState("");
  const [sectors, setSectors] = useState([]);
  const [currentSector, setCurrentSector] = useState(0);

  const canvas = useRef();
  let ctx = null;

  // Initialize the canvas context
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
  }, []);

  useEffect(() => {
    if (content === "") {
      setContent("Wheel\nBy\nOtuti");
    }
  }, [content]);

  useEffect(() => {
    const lines = content.split(/\n/);
    const arrLabel = [];
    for (let i = 0; i < lines.length; i++) {
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(lines[i])) {
        arrLabel.push(lines[i].trim());
      }
    }

    if (arrLabel.length === 0) {
      setSectors([
        {
          color: COLOR_WHEEL[0],
          label: "Wheel",
        },
        {
          color: COLOR_WHEEL[1],
          label: "By",
        },
        {
          color: COLOR_WHEEL[2],
          label: "Otuti",
        },
      ]);
    }

    let i = 0;
    setSectors(
      arrLabel.reduce((sectors, label) => {
        if (i >= COLOR_WHEEL.length) {
          i = 0;
        }
        sectors.push({
          color: COLOR_WHEEL[i],
          label,
        });
        i++;
        return sectors;
      }, [])
    );
  }, [content]);

  useEffect(() => {
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
  }, [sectors]);

  useAnimationFrame(() => {
    setAngVel((prevAngVel) => {
      const newAngVel = prevAngVel * FRICTION;
      if (newAngVel < 0.001) {
        return 0;
      }
      return newAngVel;
    });
  });

  useEffect(() => {
    setAngle((prevAngle) => {
      let ang = prevAngle + angVel;
      ang %= 2 * Math.PI;
      return ang;
    });
  }, [angVel]);

  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
    setCurrentSector(
      Math.floor(sectors.length - (angle / (2 * Math.PI)) * sectors.length) %
        sectors.length
    );
  }, [angle, sectors]);

  return (
    <>
      <Head>
        <title>Otuti | Wheel</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Otuti wheel of names" />
        <meta property="og:description" content="Wheel of names" />
      </Head>
      <div className="font-mono text-white w-full h-full px-4">
        <div className="container h-full m-auto flex flex-col">
          <div
            className="relative flex flex-wrap	justify-center items-center py-4"
            style={{ minHeight: 84 }}
          >
            <div className="absolute left-0 flex items-center">
              <div
                className="mx-2 text-center transition duration-100 ease-in-out transform hover:-translate-x-1 hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                {"<<"} Go back
              </div>
            </div>
            <div className="flex-grow-0 sm:flex-grow"></div>
            <motion.figure className="flex items-center" layoutId="app-logo">
              <img
                style={{ height: 48 }}
                src="/pot.png"
                alt="app-logo"
                className="mb-4 sm:mb-0"
              />
              <div className="ml-4 text-xl font-bold">p[Otuti]lities</div>
            </motion.figure>
            <div className="flex-grow-0 sm:flex-grow"></div>
          </div>

          <div
            className="relative grid grid-cols-3 gap-4"
            style={{ height: "calc(100vh - 84px)" }}
          >
            <div
              className="col-span-2"
              id="wheelOfFortune"
              style={{
                width: "500px",
                height: "500px",
              }}
            >
              <canvas id="wheel" ref={canvas}></canvas>
              <div
                onClick={() => {
                  if (sectors.length > 0) {
                    setAngVel(rand(0.2, 0.5));
                  }
                }}
                id="spin"
                style={{
                  background:
                    sectors[currentSector] && `${sectors[currentSector].color}`,
                }}
              >
                {sectors[currentSector] ? sectors[currentSector].label : "SPIN"}
              </div>
            </div>

            <div className="py-8 relative">
              <button className="absolute right-0 rounded bg-green-500 p-2">
                Suffle
              </button>
              <textarea
                className="bg-transparent h-full w-full rounded border-2 p-4"
                placeholder="Enter text here"
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
