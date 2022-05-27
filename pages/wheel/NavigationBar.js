import Link from "next/link";

import ThemeSwitcher from "../../components/ThemeSwitcher";

const NavigationBar = () => {
  return (
    <section id="navigation" className="text-3xl">
      <nav className="w-full flex items-center justify-between h-[128px]">
        <Link href="/">
          <a className="animated-underline focus:outline-none block whitespace-nowrap text-2xl uppercase tracking-wide font-bold dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black">
            XAMXI
          </a>
        </Link>
        <div className="flex items-center justify-center pl-10 py-2">
          <ThemeSwitcher />
        </div>
      </nav>
    </section>
  );
};

export default NavigationBar;
