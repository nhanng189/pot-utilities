import _ from "lodash";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import DB from "../../utils/db";

function UrlGateway({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(data.url);
  }, []);

  return (
    <>
      <Head>
        <title>Gateway</title>
        {data.title && (
          <meta name="og:title" property="og:title" content={data.title} />
        )}
        {data.description && (
          <meta
            name="og:description"
            property="og:description"
            content={data.description}
          />
        )}
        {data.image && (
          <meta name="og:image" property="og:image" content={data.image} />
        )}
        {data.applicationName && (
          <meta
            name="application-name"
            property="application-name"
            content={data.applicationName}
          />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div />
    </>
  );
}

export async function getServerSideProps(context) {
  const { code } = context.query;
  try {
    const doc = await DB.db.collection("urlShortener").doc(code).get();
    if (!doc.exists) {
      return {
        redirect: {
          permanent: true,
          destination: "/404",
        },
      };
    }
    return { props: { data: doc.data() } };
  } catch (e) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }
}

export default UrlGateway;
