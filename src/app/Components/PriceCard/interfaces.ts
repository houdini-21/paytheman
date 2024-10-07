export interface PricesCardProps {
  name: string;
  price: number;
  percentage: number;
  change: number;
}

export interface PriceCardItemProps {
  data: PricesCardProps[];
}
