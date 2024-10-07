import { PriceCardItem } from "./PriceCardItem";
import { PriceCardItemProps } from "@/app/Components/PriceCard/interfaces";

export const PricesCardComponent = ({ data }: PriceCardItemProps) => {
  return (
    <div className="flex lg:flex-row flex-col justify-between px-10 my-12 gap-4">
      {data.map((item, index) => (
        <PriceCardItem key={index} {...item} />
      ))}
    </div>
  );
};
