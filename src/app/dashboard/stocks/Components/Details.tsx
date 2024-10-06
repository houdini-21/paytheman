"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAppSelector } from "@/Store";
import { getStockDetails } from "@/app/hooks/getMarketData";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Image from "next/image";

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

const TableRow = ({ label, value }: TableRowProps) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-700 py-4">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
};

const Details = () => {
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
                  className="text-white hover:underline"
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

  return (
    <div className="text-sm w-full max-w-md mx-auto rounded-lg p-6">
      <span className="text-white text-xl font-bold mb-5 block">
        Company Details:
      </span>

      {isLoading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-700 py-4"
            >
              <Skeleton
                width={100}
                baseColor="#3a3a3a"
                highlightColor="#565656"
              />
              <Skeleton
                width={150}
                baseColor="#3a3a3a"
                highlightColor="#565656"
              />
            </div>
          ))}
        </>
      ) : (
        details.map((detail, index) => (
          <TableRow key={index} label={detail.label} value={detail.value} />
        ))
      )}
    </div>
  );
};

export default Details;
