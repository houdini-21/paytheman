"use client";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { TopBarPropsItem } from "./interfaces";

export const TopBarItem = ({ name, path }: TopBarPropsItem) => {
  const currentPath = usePathname();

  return (
    <Link
      href={path}
      prefetch
      className="group dark:text-white text-slate-800 transition duration-300 font-bold hover:scale-110 ease-in-out mx-4"
    >
      {name}
      <span
        className={classNames(
          "block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 dark:bg-white bg-slate-800",
          {
            "max-w-full": path === currentPath,
          }
        )}
      ></span>
    </Link>
  );
};
