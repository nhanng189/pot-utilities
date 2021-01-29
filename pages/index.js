import _get from "lodash/get";
import _snakeCase from "lodash/snakeCase";
import React, { useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import AppLogo from "../assets/img/app_logo.png";
import LanJee from "../assets/img/lan_jee.png";
import DungLee from "../assets/img/dung_lee.png";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(LanJee);

  return (
    <div>
      <div style={{ backgroundColor: "#ebf5fe" }}>
        <div className="container mx-auto py-6 flex items-center">
          <img className="h-16 w-16" src={AppLogo} />
          <div className="ml-4 text-xl font-bold">Pot Utilities</div>
        </div>
      </div>
      <div className="container mx-auto pt-4">
        <div className="grid grid-cols-5 gap-24">
          <div className="col-span-2 space-y-2">
            <label className="container flow-root" for="quote">
              Câu nói:
            </label>
            <textarea
              className="container flow-root rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nhập câu nói vào đây"
              id="quote"
              name="quote"
              rows="2"
              onChange={(e) => setQuote(_get(e, "target.value"))}
            />
            <label className="container flow-root" for="author">
              Chữ ký:
            </label>
            <input
              type="text"
              className="container flow-root rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nhập chữ ký vào đây"
              id="author"
              name="author"
              onChange={(e) => setAuthor(_get(e, "target.value"))}
            />
            <button
              className="flow-root bg-red-500 hover:bg-red-700 px-4 py-2 rounded w-40"
              onClick={() => {
                setImage(DungLee);
              }}
            >
              DungLee
            </button>
            <button
              className="flow-root bg-green-500 hover:bg-green-700 px-4 py-2 rounded w-40"
              onClick={() => {
                toPng(document.getElementById("quote-block")).then(
                  (dataUrl) => {
                    saveAs(dataUrl, `${_snakeCase(quote.substr(0, 10))}.png`);
                  }
                );
              }}
            >
              Tải về
            </button>
          </div>
          <div className="col-span-3">
            <div
              id="quote-block"
              className="relative bg-white rounded border-solid bg-contain bg-no-repeat bg-left-bottom"
              style={{
                width: "100%",
                paddingBottom: "56.25%",
                backgroundImage: `url(${image})`,
              }}
            >
              <div
                className="absolute container h-full"
                style={{
                  top: 0,
                  left: 0,
                }}
              >
                <div className="container h-full grid grid-cols-5 gap-4">
                  <div className="col-span-2" />
                  <div className="col-span-3 text-2xl leading-relaxed pr-8 font-semibold whitespace-normal break-all text-center whitespace-pre-line m-auto">
                    <div>{quote}</div>
                    <br />
                    <div>{author}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
