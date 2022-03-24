import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import VoiceSvg from "../components/svg/voice";
import WheelSvg from "../components/svg/wheel";
import UrlSvg from "../components/svg/link";
import QuoteSVG from "../components/svg/quote";

const renderCategory = ({ image, title, description, linkTo }) => {
  const router = useRouter();

  return (
    <div
      class="p-6 group rounded-lg border border-indigo-400 transition duration-100 transform hover:scale-105 hover:bg-indigo-400 cursor-pointer flex items-center"
      onClick={() => {
        router.push(linkTo);
      }}
    >
      {image &&
        image({
          className: "fill-current text-white group-hover:text-black",
          width: 64,
          height: 64,
        })}
      <div className="space-y-2 ml-6 leading-relaxed">
        <p class="font-bold text-white group-hover:text-black">{title}</p>
        <p class="text-gray-300 group-hover:text-gray-900">{description}</p>
      </div>
    </div>
  );
};

function Landing() {
  return (
    <div className="space-y-16 font-mono container m-auto py-16 px-8">
      <div className="space-y-4">
        <div className="text-center text-3xl tracking-wide font-extrabold text-white">
          p[Otuti]lities
        </div>
        <div className="text-center tracking-wide text-white">
          Cung cấp những chiếc tiện ích có cũng như không. Nói chung là như nồi
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        {renderCategory({
          image: UrlSvg,
          title: "Tạo liên kết rút gọn",
          description:
            "Hỗ trợ tùy biến meta tag để gây lú cực mạnh cho người xem, không bấm link thì đố ai biết link gì luôn.",
          linkTo: "/url-shortener",
        })}
        {renderCategory({
          image: WheelSvg,
          title: "Vòng quay ngẫu nhiên",
          description:
            "Công cụ chọn tên ngẫu nhiên từ danh sách tên được nhập sẵn, kết hợp với hiệu ứng âm thanh hài cốt.",
          linkTo: "/wheel-of-names",
        })}
        {renderCategory({
          image: VoiceSvg,
          title: "Giọng chị Google",
          description:
            "Nhập văn bản bất kỳ để chuyển thành giọng chị Google, bấm nút tải phát nữa là được luôn.",
          linkTo: "text-to-speech",
        })}
        {renderCategory({
          image: QuoteSVG,
          title: "Lân Jee quote",
          description:
            "Cái này chưa code xong nên còn chuối lắm, lưu ý là Lân Jee chưa bao giờ nói những điều này.",
          linkTo: "/meme-quotes",
        })}
      </div>
    </div>
  );
}

const withHead = (ChildComponent) => () =>
  (
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
        <meta property="og:url" content="https://xamxi.tk/" />
        <meta
          property="og:description"
          content="Ở đây cung cấp những chiếc tiện ích có như không có, tóm lại là như nồi, cam kết không giúp được gì."
        />
        <meta property="og:image" content="/pot.png" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1500" />
        <meta property="og:type" content="website" />
      </Head>
      {ChildComponent()}
    </>
  );

export default withHead(Landing);
