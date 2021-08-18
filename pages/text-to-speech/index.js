import _ from "lodash";
import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";

function TextToSpeech({ text }) {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(async () => {
    if (text) {
      const { data } = await axios.get(`/api/text-to-speech/?text=${text}`);
      setFileUrl(data);
    }
  }, [text]);

  return (
    <>
      <Head>
        <title>Otuti | Text to speech</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Otuti text to speech" />
        <meta
          property="og:description"
          content="Offering tool for converting text to speech"
        />
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
            <div className="flex items-center">
              <img
                style={{ height: 48 }}
                src="/pot.png"
                alt="app-logo"
                className="mb-4 sm:mb-0"
              />
              <div className="ml-4 text-xl font-bold">p[Otuti]lities</div>
            </div>
            <div className="flex-grow-0 sm:flex-grow"></div>
          </div>
          <Formik
            initialValues={{ text }}
            validate={(values) => {
              const errors = {};
              if (!values.text) {
                errors.text = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { text } = values;
                const { data } = await axios.get(
                  `/api/text-to-speech/?text=${text}`
                );
                setSubmitting(false);
                setFileUrl(data);
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-4">
                <div className="flow-root space-y-1">
                  <label className="flow-root">Text</label>
                  <Field
                    className="container flow-root bg-transparent rounded border-2 p-2"
                    name="text"
                  />
                  <ErrorMessage
                    className="flow-root text-red-500 px-3 w-min"
                    name="text"
                    component="div"
                  />
                </div>
                <br />
                <button
                  className="container flow-root rounded bg-green-500 p-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Convert
                </button>
              </Form>
            )}
          </Formik>
          {fileUrl && (
            <>
              <div className="mt-8 flex items-center justify-center">
                <div className="flow-root rounded p-2">
                  <audio controls autoPlay src={fileUrl}>
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </div>
                <div className="ml-4">
                  <button
                    className="flow-root rounded bg-green-500 active:bg-green-700 p-2"
                    onClick={() => {
                      window.open(fileUrl, "_blank");
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { text } = context.query;
  return { props: { text: text || "" } };
}

export default TextToSpeech;
