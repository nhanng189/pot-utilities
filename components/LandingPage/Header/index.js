import Image from "next/image";
import { useRouter } from "next/router";

import Giraffe from "../../../assets/img/giraffe.png";

const Header = () => {
  const router = useRouter();

  return (
    <section
      id="header"
      className="grid grid-cols-2 gap-8"
      style={{
        minHeight: "calc(100vh - 128px)",
      }}
    >
      <div className="flex items-center col-span-2 md:col-span-1">
        <div>
          <p
            className="mb-5 text-5xl font-medium leading-snug
              text-black dark:text-white"
          >
            Lorem ipsum dolor sit amet
          </p>
          <p
            className="mb-10 leading-normal text-post-bodyText text-2xl font-normal
              text-[#6b7280] dark:text-[#9ca3af]"
          >
            Aliquam non arcu tincidunt, eleifend lectus et, hendrerit nibh.
            Aliquam nisl lacus, condimentum in lectus luctus, blandit vehicula
            massa. Duis consectetur pretium ullamcorper
          </p>
          <button
            className="animated-button px-5 py-2 text-center uppercase relative lg:text-base font-normal select-none
              text-black dark:text-white
              hover:text-white dark:hover:text-black
              after:bg-black dark:after:bg-white
              border-black dark:border-white
              hover:border-black dark:hover:border-white"
            name="Check them out!"
            onClick={() => {
              router.push("#features");
            }}
          >
            Check out the features!
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end hidden md:flex">
        <Image className="pointer-events-none" src={Giraffe} alt="header-img" />
      </div>
    </section>
  );
};

export default Header;
