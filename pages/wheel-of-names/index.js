import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import "./style.scss";

const FRICTION = 0.995; // 0.995 = soft, 0.99 = mid, 0.98 = hard
const rand = (m, M) => Math.random() * (M - m) + m;

export default function Wheel() {
  const router = useRouter();
  const [angVel, setAngVel] = useState(0); // Vận tốc góc
  const [angle, setAngle] = useState(0); // Góc
  const [sectors, setSectors] = useState([
    { color: "#f82", label: "Luong Nhan" },
    { color: "#0bf", label: "Hoang Lam" },
    { color: "#fb0", label: "Nhut 5 tay" },
    { color: "#0fb", label: "Kiet Lac" },
    { color: "#b0f", label: "Bung bu" },
    { color: "#f0b", label: "Nhan map" },
    { color: "#bf0", label: "Nam phen" },
  ]);
  const [currentSector, setCurrentSector] = useState();

  const canvas = useRef();
  let ctx = null;

  // Initialize the canvas context
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // Get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
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

  const useAnimationFrame = (callback) => {
    const engineRef = React.useRef();
    const previousEngineRef = React.useRef();

    const animate = (engine) => {
      if (previousEngineRef.current != undefined) {
        callback();
      }
      previousEngineRef.current = engine;
      engineRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
      engineRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(engineRef.current);
    }, []);
  };

  useAnimationFrame(() => {
    setAngVel((prevAngVel) => {
      const newAngVel = prevAngVel * FRICTION;
      if (newAngVel < 0.002) {
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
  }, [angle]);

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
            className="flex items-center justify-center"
            style={{ minHeight: "calc(100vh - 84px)" }}
          >
            <div id="wheelOfFortune">
              <canvas id="wheel" ref={canvas}></canvas>
              <div>Van toc goc: {angVel}</div>
              <div>Goc (rad): {angle}</div>
              <div
                onClick={() => {
                  setAngVel(rand(0.2, 0.5));
                }}
                id="spin"
                style={{
                  background: sectors[currentSector]
                    ? `${sectors[currentSector].color}`
                    : "white",
                }}
              >
                {sectors[currentSector] ? sectors[currentSector].label : "SPIN"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
