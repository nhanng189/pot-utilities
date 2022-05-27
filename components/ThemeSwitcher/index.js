import { ThemeContext } from "./ThemeContext";

import MoonSVG from "../SVGdotJS/moon";
import SunSVG from "../SVGdotJS/sun";

const ThemeSwitcher = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <button
          className="transition ease-in-out hover:scale-110 duration-150"
          onClick={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        >
          {theme === "light" ? (
            <SunSVG
              className="focus:outline-none block dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black"
              width={32}
              height={32}
            />
          ) : (
            <MoonSVG
              className="focus:outline-none block dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black"
              width={32}
              height={32}
            />
          )}
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

export default ThemeSwitcher;
