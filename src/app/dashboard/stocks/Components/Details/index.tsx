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
      <span
        className="dark:text-gray-400
        text-slate-800
      "
      >
        {label}
      </span>
      <span
        className="dark:text-white
      text-slate-800
      "
      >
        {value}
      </span>
    </div>
  );
};

export const Details = () => {
  const { isLoading, details } = useStockDetails();

  return (
    <div className="text-sm w-full max-w-md mx-auto rounded-lg p-6">
      <span className="dark:text-white text-slate-800 text-xl font-bold mb-5 block">
        Company details:
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
                baseColor={
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#3a3a3a"
                    : "#f3f3f3"
                }
                highlightColor={
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#565656"
                    : "#e5e5e5"
                }
              />
              <Skeleton
                width={150}
                baseColor={
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#3a3a3a"
                    : "#f3f3f3"
                }
                highlightColor={
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#565656"
                    : "#e5e5e5"
                }
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
