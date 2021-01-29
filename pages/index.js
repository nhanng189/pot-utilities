import _get from "lodash/get";
import _snakeCase from "lodash/snakeCase";
import React, { useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import AppLogo from "../assets/img/app_logo.png";
import LanJee from "../assets/img/lan_jee.png";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

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
              className="flow-root bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
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
              class="bg-white	aspect-w-16 aspect-h-9 rounded border-solid bg-contain bg-no-repeat bg-left-bottom"
              style={{
                backgroundImage: `url(${LanJee})`,
              }}
            >
              <div className="container h-full grid grid-cols-5 gap-4">
                <div className="col-span-2" />
                <div className="col-span-3 flex flex-col items-center justify-center text-2xl leading-relaxed pr-8 font-semibold whitespace-normal break-all">
                  <div>{quote}</div>
                  <div className="mt-12">{author}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
