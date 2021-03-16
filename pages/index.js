import _ from "lodash";
import Head from "next/head";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export default function UrlShortener() {
  const [shortedUrl, setShortedUrl] = useState();

  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta property="og:title" content="Url Shortener" />
        <meta
          property="og:description"
          content="Offering Url Shortener service with custom meta tags"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto my-8 space-y-4">
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
              const { data } = await axios.post("/api/entry", values);
              setSubmitting(false);
              setShortedUrl(`https://otuti.ml/${_.get(data, "code")}`);
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="container space-y-4">
              <Field
                className="container flow-root rounded border-2 p-2 border-red-500"
                name="url"
                placeholder="Paste your URL"
              />
              <ErrorMessage
                className="flow-root text-red-500 px-3 w-min"
                name="url"
                component="div"
              />
              <br />
              <Field
                className="container flow-root rounded border-2 p-2"
                name="applicationName"
                placeholder="Type your application name"
              />
              <Field
                className="container flow-root rounded border-2 p-2"
                name="title"
                placeholder="Type your title"
              />
              <Field
                className="container flow-root rounded border-2 p-2"
                name="description"
                placeholder="Type your description"
              />
              <Field
                className="container flow-root rounded border-2 p-2"
                name="image"
                placeholder="Paste your image url"
              />
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
    </>
  );
}
