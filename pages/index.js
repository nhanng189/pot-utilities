import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import VoiceSvg from "../components/svg/voice";
import WheelSvg from "../components/svg/wheel";
import UrlSvg from "../components/svg/link";
// import QuoteSVG from "../components/svg/quote";
import SlackSVG from "../components/svg/slack";

const renderCategory = ({ image, title, description, linkTo }) => {
  const router = useRouter();

  return (
    <div
      class="p-6 group rounded-lg border border-purple-900 transition duration-100 transform hover:scale-105 hover:bg-purple-900 cursor-pointer flex items-center"
      onClick={() => {
        linkTo && router.push(linkTo);
      }}
    >
      {image &&
        image({
          className: "fill-current text-purple-900 group-hover:text-purple-50",
          width: 64,
          height: 64,
        })}
      <div className="space-y-2 ml-6 leading-relaxed">
        <p class="font-bold text-purple-900 group-hover:text-purple-50">
          {title}
        </p>
        <p class="text-purple-900 group-hover:text-purple-50">{description}</p>
      </div>
    </div>
  );
};

function Landing() {
  return (
    <div className="space-y-16 font-mono container m-auto py-16 px-8">
      <div className="space-y-4">
        <div className="text-center text-3xl tracking-wide font-extrabold text-purple-900">
          Những thứ xàm xí
        </div>
        <div className="text-center tracking-wide text-purple-900">
          Những chiếc tiện ích có cũng như không. Nói chung là xàm lắm đừng quan
          tâm
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        {renderCategory({
          image: UrlSvg,
          title: "Tạo liên kết rút gọn",
          description:
            "Hỗ trợ tùy biến meta tag để gây lú cực mạnh cho người xem, không bấm link thì đố ai biết link gì luôn.",
          linkTo: "/lien-ket-rut-gon",
        })}
        {renderCategory({
          image: WheelSvg,
          title: "Vòng quay ngẫu nhiên",
          description:
            "Công cụ chọn tên ngẫu nhiên từ danh sách tên được nhập sẵn, kết hợp với hiệu ứng âm thanh hài cốt.",
          linkTo: "/vong-quay",
        })}
        {renderCategory({
          image: VoiceSvg,
          title: "Giọng chị Google",
          description:
            "Nhập văn bản bất kỳ để chuyển thành giọng chị Google, bấm nút tải phát nữa là được luôn.",
          linkTo: "chi-google",
        })}
        {renderCategory({
          image: SlackSVG,
          title: "Slack APP: Poll",
          description: 
            "App cho Slack để tạo Poll, không bị giới hạn số lượng",
          linkTo: "https://slack.com/oauth/v2/authorize?client_id=765809097975.3442671727680&scope=chat:write,commands,chat:write.public&user_scope=",
        })}
      </div>
    </div>
  );
}

const withHead = (ChildComponent) => () =>
  (
    <>
      <Head>
        <title>Những thứ xàm xí</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="Xamxi"
          href="/opensearch.xml"
        />
        <meta property="og:title" content="Những thứ xàm xí" />
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
