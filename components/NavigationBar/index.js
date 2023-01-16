import Link from "next/link";

import ThemeSwitcher from "../ThemeSwitcher";

const renderHeaderListItem = (title, linkTo) => {
  return (
    <li className="px-10 py-2 cursor-pointer">
      <Link href={linkTo} key={title}>
        <a
          className={`animated-underline focus:outline-none block whitespace-nowrap text-lg font-medium dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black`}
        >
          {title}
        </a>
      </Link>
    </li>
  );
};

const NavigationBar = () => {
  return (
    <section id="navigation" className="text-3xl">
      <nav className="w-full flex items-center justify-between h-[128px]">
        <Link href="/">
          <a className="animated-underline focus:outline-none block whitespace-nowrap text-2xl uppercase tracking-wide font-bold dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black">
            XAMXI
          </a>
        </Link>
        <div className="grow" />
        <ul className="justify-center list-none hidden md:flex">
          {renderHeaderListItem("Features", "#features")}
          {renderHeaderListItem("About", "#about")}
        </ul>
        <div className="flex items-center justify-center pl-10 py-2">
          <ThemeSwitcher />
        </div>
      </nav>
    </section>
  );
};

export default NavigationBar;
