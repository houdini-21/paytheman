"use client";
import { useAppSelector } from "@/Store";
import { PriceCardItem } from "./PriceCardItem";

export const PricesCardComponent = () => {
  const notificationsItem = useAppSelector((state) => state.card.items);

  return (
    <div className="flex lg:flex-row flex-col justify-between px-10 my-12 gap-4">
      {notificationsItem.map((item, index) => (
        <PriceCardItem
          key={index}
          symbol={item.companySymbol}
          name={item.companyName.label}
        />
      ))}
    </div>
  );
};
