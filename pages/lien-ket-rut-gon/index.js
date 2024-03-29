import _ from "lodash";
import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";

export default function UrlShortener() {
  const router = useRouter();
  const [shortedUrl, setShortedUrl] = useState();

  return (
    <>
      <Head>
        <title>Xamxi | Liên kết rút gọn</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Tạo liên kết rút gọn" />
        <meta property="og:description" content="Tạo liên kết rút gọn" />
      </Head>
      <div className="font-mono text-purple-900 w-full h-full px-4">
        <div className="container h-full m-auto flex flex-col">
          <div
            className="relative flex flex-wrap justify-center items-center py-4"
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
          <div className="flow-root space-y-8">
            <Formik
              className="flow-root"
              initialValues={{
                url: "",
                applicationName: "",
                title: "",
                description: "",
                image: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.url) {
                  errors.url = "Phải điền link vô ô này mới được nha";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const { data } = await axios.post("/api/shortener", values);
                  setSubmitting(false);
                  setShortedUrl(`https://xamxi.ml/${_.get(data, "code")}`);
                } catch (error) {
                  console.log("error", error);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-4">
                  <div className="flow-root space-y-1">
                    <label className="flow-root">Điền link nè:</label>
                    <Field
                      className="container flow-root bg-transparent rounded border-2 p-2"
                      name="url"
                    />
                    <ErrorMessage
                      className="flow-root text-red-500  w-full"
                      name="url"
                      component="div"
                    />
                  </div>
                  <div className="flow-root space-y-1">
                    <label className="flow-root">Custom tên website nè:</label>
                    <Field
                      className="container flow-root flex-grow bg-transparent rounded border-2 p-2"
                      name="applicationName"
                    />
                  </div>
                  <div className="flow-root space-y-1">
                    <label className="flow-root">Custom title nè:</label>
                    <Field
                      className="container flow-root bg-transparent rounded border-2 p-2"
                      name="title"
                    />
                  </div>
                  <div className="flow-root space-y-1">
                    <label className="flow-root">Custom mô tả nè:</label>
                    <Field
                      className="container flow-root bg-transparent rounded border-2 p-2"
                      name="description"
                    />
                  </div>
                  <div className="flow-root space-y-1">
                    <label className="flow-root">Custom hình ảnh nè:</label>
                    <Field
                      className="container flow-root bg-transparent rounded border-2 p-2"
                      name="image"
                    />
                  </div>
                  <br />
                  <button
                    className="container flow-root rounded bg-green-500 p-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Điền xong thì nhấn đây nè
                  </button>
                </Form>
              )}
            </Formik>
            {shortedUrl && (
              <div className="flow-root">
                <div className="flex items-center justify-center">
                  <div className="rounded p-2">Link rút gọn đây nè: </div>
                  <div className="rounded p-2">{shortedUrl}</div>
                  <div className="ml-4">
                    <button
                      className="rounded bg-green-500 active:bg-green-700 p-2"
                      onClick={() => {
                        navigator.clipboard.writeText(shortedUrl);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
