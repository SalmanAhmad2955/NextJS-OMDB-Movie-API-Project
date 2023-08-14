import React, { useEffect } from "react";
import { BsMoonFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

const DarkMode: React.FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mount, setMount] = React.useState<boolean>(false);
  const currentTheme = theme === "system" ? systemTheme : (theme as string);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && currentTheme === "dark" ? (
        <MdLightMode
          onClick={() => setTheme("light")}
          className="text-xl cursor-pointer hover:text-amber-500"
        />
      ) : (
        <BsMoonFill
          onClick={() => setTheme("dark")}
          className="text-xl cursor-pointer hover:text-amber-500"
        />
      )}
    </>
  );
};

export default DarkMode;
