"use client";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { QuoteChartProps } from "./interfaces";

export const QuoteChart = ({ data }: QuoteChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#31A200"
          isAnimationActive={true} // Activar la animación en los cambios
          animationDuration={500} // Controlar la duración de la animación
          animationEasing="ease-in-out" // Definir el tipo de animación
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
