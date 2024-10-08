import { TimeframeButtonsProps } from "./interfaces";

export const TimeframeButtons = ({
  active,
  setActive,
}: TimeframeButtonsProps) => {
  const buttons = [
    { label: "Live", value: "live" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "1Y", value: "1Y" },
  ];

  return (
    <div className="flex space-x-2 justify-end">
      {buttons.map((button) => (
        <button
          key={button.value}
          onClick={() => setActive(button.value)}
          className={`px-3 py-2 rounded-md border transition-all duration-200 text-sm ${
            active === button.value
              ? "dark:bg-white dark:text-black bg-zinc-700 text-white border-zinc-700"
              : "bg-transparent text-zinc-400 border-zinc-400 hover:bg-zinc-700 hover:text-white"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};
