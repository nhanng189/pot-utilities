import _ from "lodash";
import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function UrlShortener() {
  const router = useRouter();
  const [shortedUrl, setShortedUrl] = useState();

  return (
    <>
      <Head>
        <title>Otuti | Url shortener</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Otuti url shortener" />
        <meta
          property="og:description"
          content="Offering Url shortener service with full custom meta tags"
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
          <Formik
            initialValues={{ url: "", title: "", description: "", image: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.url) {
                errors.url = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await axios.post("/api/shortener", values);
                setSubmitting(false);
                setShortedUrl(`https://otuti.ml/${_.get(data, "code")}`);
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-4">
                <div className="flow-root space-y-1">
                  <label className="flow-root">Url</label>
                  <Field
                    className="container flow-root bg-transparent rounded border-2 p-2"
                    name="url"
                  />
                  <ErrorMessage
                    className="flow-root text-red-500 px-3 w-min"
                    name="url"
                    component="div"
                  />
                </div>
                <div className="flow-root space-y-1">
                  <label className="flow-root">Application name</label>
                  <Field
                    className="container flow-root flex-grow bg-transparent rounded border-2 p-2"
                    name="applicationName"
                  />
                </div>
                <div className="flow-root space-y-1">
                  <label className="flow-root">Title</label>
                  <Field
                    className="container flow-root bg-transparent rounded border-2 p-2"
                    name="title"
                  />
                </div>
                <div className="flow-root space-y-1">
                  <label className="flow-root">Description</label>
                  <Field
                    className="container flow-root bg-transparent rounded border-2 p-2"
                    name="description"
                  />
                </div>
                <div className="flow-root space-y-1">
                  <label className="flow-root">Image URL</label>
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
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          {shortedUrl && (
            <>
              <div className="flex items-center justify-center">
                <div className="flow-root rounded p-2">{shortedUrl}</div>
                <div className="ml-4">
                  <button
                    className="flow-root rounded bg-green-500 active:bg-green-700 p-2"
                    onClick={() => {
                      navigator.clipboard.writeText(shortedUrl);
                    }}
                  >
                    Copy
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
