import { useState, useEffect } from "react";
import { getStockDetails } from "@/app/hooks/getMarketData";
import { useAppSelector } from "@/Store";
import Image from "next/image";
import Link from "next/link";

interface TableRowProps {
  label: string;
  value: string | number | JSX.Element;
}

interface DetailsProps {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export const useStockDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<TableRowProps[]>([]);
  const stockValue = useAppSelector((state) => state.stock.value);

  useEffect(() => {
    const fetchStockDetails = async () => {
      setIsLoading(true);
      const response: DetailsProps = await getStockDetails(stockValue);
      const formattedMarketCap = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: response.currency ? response.currency : "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        response.marketCapitalization ? response.marketCapitalization : 0
      );

      const data = [
        {
          label: "Logo",
          value: (
            <Image
              src={
                response.logo ??
                "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
              }
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded"
              priority={false}
            />
          ),
        },
        {
          label: "Name",
          value: (
            <>
              {response.weburl ? (
                <Link
                  href={response.weburl}
                  className="dark:text-white hover:underline text-slate-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  {response.name}
                </Link>
              ) : (
                response.name
              )}
            </>
          ),
        },
        { label: "Country", value: response.country ?? "N/A" },
        { label: "Currency", value: response.currency ?? "USD" },
        { label: "Exchange", value: response.exchange ?? "N/A" },
        { label: "IPO Date", value: response.ipo ?? "N/A" },
        {
          label: "Market Capitalization",
          value: formattedMarketCap,
        },
        { label: "Industry", value: response.finnhubIndustry ?? "N/A" },
      ];

      setDetails(data);
      setIsLoading(false);
    };
    fetchStockDetails();
  }, [stockValue]);

  return { isLoading, details };
};
