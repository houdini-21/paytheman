import Link from "next/link";
import { SiRobinhood } from "react-icons/si";
import { TopBarPropsItem } from "./interfaces";
import { TopBarItem } from "./TopBarItem";

export const TopBar = ({ items }: { items: TopBarPropsItem[] }) => {
  return (
    <nav className="flex items-center py-3 px-6 flex-wrap">
      <Link href="#" className="p-2 mr-4 inline-flex items-center">
        <SiRobinhood className="text-3xl text-white" />
      </Link>
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="flex-row ml-auto lg:w-auto w-full lg:items-center items-start flex h-auto">
          {items.map((item, index) => {
            return <TopBarItem key={index} name={item.name} path={item.path} />;
          })}
        </div>
      </div>
    </nav>
  );
};
