import _map from "lodash/map";
import { useRouter } from "next/router";
import Image from "next/image";

import { useWasInViewAtLeastOnce } from "../../Hooks/useWasInViewAtLeastOnce";

import Wheel from "../../../assets/img/wheel.jpg";

import styles from "./index.module.scss";

const Feature = ({
  backgroundImage,
  image,
  linkTo,
  title,
  description,
  features,
}) => {
  const router = useRouter();

  const { setRef, wasInViewAtLeastOnce } = useWasInViewAtLeastOnce();

  const featureCardClassName = wasInViewAtLeastOnce
    ? styles["slide-top"]
    : styles["slide-top-pre"];

  return (
    <div
      className={`${featureCardClassName} p-8`}
      style={{
        backgroundImage,
      }}
      ref={setRef}
      key={title}
    >
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          {image && (
            <Image
              src={image}
              alt="feature-image"
              className="pointer-events-none"
            />
          )}
        </div>
        <div className="flex flex-col col-span-2 md:col-span-1 text-black dark:text-white">
          <p className="font-semibold text-2xl sm:text-3xl pb-5">{title}</p>
          <p className="text-base leading-8 pb-2">{description}</p>
          <div className="flex flex-col">
            {_map(features, (feature) => {
              return (
                <div className="inline-flex items-center" key={feature}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-projecs-arrow w-5 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                  <p className="text-[15px] leading-7">{feature}</p>
                </div>
              );
            })}
          </div>
          <div className="text-sm mt-2">
            {linkTo ? (
              <button
                className="animated-arrow-button border-black dark:border-[#ffffff4d]"
                onClick={() => {
                  router.push(linkTo);
                }}
              >
                <div className="animated-arrow-button-wrapper">
                  Go
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="animated-arrow-button-arrow w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            ) : (
              <div className="w-fit	py-2 px-3 text-sm border rounded-3xl border-solid border-black dark:border-[#ffffff4d]">
                Coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const { setRef, wasInViewAtLeastOnce } = useWasInViewAtLeastOnce();

  const featuresTitleClassName = wasInViewAtLeastOnce
    ? styles["stroke-offset"]
    : "";

  return (
    <section id="features">
      <svg
        viewBox="0 0 1280 400"
        className="tracking-widest text-[16rem] lg:text-[15rem] font-medium
        fill-black dark:fill-white stroke-black dark:stroke-white"
        ref={setRef}
      >
        <text
          className={featuresTitleClassName}
          textAnchor="middle"
          x="50%"
          y="70%"
        >
          Features
        </text>
      </svg>
      <div className="grid grid-cols-1 gap-10">
        <Feature
          backgroundImage="linear-gradient(120deg, rgba(255, 91, 137, 0.25) 53.5%, rgba(234, 68, 68, .25) 100.2%)"
          image={Wheel}
          title="Wheel of fortune"
          description="Nulla lorem dui, tristique eu rhoncus a, molestie ut ante. Fusce tempus in ex in pulvinar."
          features={[
            "Curabitur eu nibh nisl",
            "Vestibulum sollicitudin",
            "Donec nunc est",
          ]}
          linkTo="/wheel"
        />
        <Feature
          backgroundImage="linear-gradient(120deg, rgba(82, 91, 219, .25) 11.2%, rgba(65, 71, 150, 0.25))"
          image={Wheel}
          title="Etiam ut semper mauris"
          description="Nulla lorem dui, tristique eu rhoncus a, molestie ut ante. Fusce tempus in ex in pulvinar."
          features={[
            "Curabitur eu nibh nisl",
            "Vestibulum sollicitudin",
            "Donec nunc est",
          ]}
        />
        <Feature
          backgroundImage="linear-gradient(120deg, rgba(217, 164, 4, .25) 10.7%, rgba(242, 116, 5, .25) 113.2%)"
          image={Wheel}
          title="Ieptos himenaeos"
          description="Nulla lorem dui, tristique eu rhoncus a, molestie ut ante. Fusce tempus in ex in pulvinar."
          features={[
            "Curabitur eu nibh nisl",
            "Vestibulum sollicitudin",
            "Donec nunc est",
          ]}
        />
      </div>
    </section>
  );
};

export default Features;
