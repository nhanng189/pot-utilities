import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Landing() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Otuti | Tiện ích như nồi</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="[Otuti] Những tiện ích như nồi" />
        <meta property="og:url" content="https://otuti.tk/" />
        <meta
          name="description"
          content="Ở đây cung cấp những chiếc tiện ích có như không có, tóm lại là như nồi, cam kết không giúp được gì."
        />
      </Head>
      <div className="font-mono text-white w-full h-full px-4">
        <div className="container h-full m-auto flex flex-col">
          <div
            className="flex flex-wrap	justify-center items-center py-4"
            style={{ minHeight: 84 }}
          >
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
            </div>
          </div>
          <div
            className="flex flex-col justify-center space-y-8"
            style={{ minHeight: "calc(100vh - 84px)" }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flow-root text-4xl font-bold text-center"
            >
              Tôi đi code
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flow-root text-base leading-relaxed space-y-2 text-center"
            >
              <div className="flow-root">
                Hằng năm cứ vào cuối thu, lá ngoài đường rụng nhiều và trên
                không có những đám mây bàng bạc, lòng tôi lại nao nức những kỷ
                niệm hoang mang của buổi tựu trường.
              </div>
              <div className="flow-root">
                Tôi không thể nào quên được những cảm giác trong sáng ấy nảy nở
                trong lòng tôi như mấy cành hoa tươi mỉm cười giữa bầu trời
                quang đãng. Những ý tưởng ấy tôi chưa lần nào ghi lên giấy, vì
                hồi ấy tôi không biết ghi và ngày nay tôi không nhớ hết. Nhưng
                mỗi lần thấy mấy em nhỏ rụt rè núp dưới nón mẹ lần đầu tiên đến
                trường, lòng tôi lại tưng bừng rộn rã.
              </div>
              <div className="flow-root">
                Buổi sáng mai hôm ấy, một buổi mai đầy sương thu và gió lạnh. Mẹ
                tôi âu yếm nắm tay tôi dẫn đi trên con đường làng dài và hẹp.
                Con đường này tôi đã quen đi lại lắm lần, nhưng lần này tự nhiên
                tôi thấy lạ. Cảnh vật chung quanh tôi đều thay đổi, vì chính
                lòng tôi đang có sự thay đổi lớn:
              </div>
              <div>Hôm nay tôi đi code.</div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
