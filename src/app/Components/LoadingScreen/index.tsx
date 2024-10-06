import { SiRobinhood } from "react-icons/si";

export const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="text-[200px] text-white animate-pulse">
      <SiRobinhood />
    </span>
  </div>
);
