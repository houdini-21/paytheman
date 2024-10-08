"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useStockDetails } from "./hooks/detailsHook";
import "react-loading-skeleton/dist/skeleton.css";

interface TableRowProps {
  label: string;
  value: string | number | JSX.Element;
}

const TableRow = ({ label, value }: TableRowProps) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-700 py-4">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
};

export const Details = () => {
  const { isLoading, details } = useStockDetails();

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
