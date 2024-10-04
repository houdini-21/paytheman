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
      className="group text-white transition duration-300 font-bold hover:scale-110 ease-in-out mx-4"
    >
      {name}
      <span
        className={classNames(
          "block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white",
          {
            "max-w-full": path === currentPath,
          }
        )}
      ></span>
    </Link>
  );
};
