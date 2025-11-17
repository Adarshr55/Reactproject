import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React from "react";

function OrderStatusDonut({ pending, shipped, delivered, cancelled, title }) {
  const data = [
    { name: "Pending", value: pending },
    { name: "Shipped", value: shipped },
    { name: "Delivered", value: delivered },
    { name: "Cancelled", value: cancelled },
  ];

  const COLORS = ["#FBBF24", "#3B82F6", "#22C55E", "#EF4444"];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Title */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {title}
        </h2>
      )}

      {/* Center Chart */}
      <div className="w-full flex justify-center">
        <PieChart width={420} height={350}> 
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </div>
    </div>
  );
}

export default OrderStatusDonut;
