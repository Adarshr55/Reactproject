import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import React from "react";

function OrderStatusDonut({ pending, shipped, delivered, cancelled,title}) {
  const data = [
    { name: "Pending", value: pending },
    { name: "Shipped", value: shipped },
    { name: "Delivered", value: delivered },
    { name: "Cancelled", value: cancelled },
  ];

  const COLORS = ["#FBBF24", "#3B82F6", "#22C55E", "#EF4444"];

  return (
    <PieChart width={350} height={350}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        dataKey="value"
        paddingAngle={3}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default OrderStatusDonut;
