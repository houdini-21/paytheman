import { SiRobinhood } from "react-icons/si";

export const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="text-[200px] dark:text-white text-slate-800 animate-pulse">
      <SiRobinhood />
    </span>
  </div>
);
