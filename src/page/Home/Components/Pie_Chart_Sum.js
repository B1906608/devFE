import React from "react";

import { Legend, PieChart, Pie, Cell } from "recharts";

function Pie_Chart_Sum() {
  //pie-chart
  var data_pie_chart_sum = [
    { name: "Hoàn thành", value: 30 },
    { name: "HT quá hạn", value: 15 },
  ];

  var COLORS = ["#3e92cc", "#f99959"];
  const sum = data_pie_chart_sum.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  const data_pie_chart_percentage = data_pie_chart_sum.map((item) => ({
    ...item,
    percentage: ((item.value / sum) * 100).toFixed(2),
  }));

  return (
    <div className="w-[45vw]">
      <br />
      <div className="w-[45vw] shadow-2xl rounded-md bg-white">
        <p className="text-center mt-2 text-xl font-bold pt-3">
          Tỷ lệ công việc hoàn thành trong tháng 5
        </p>
        <div className="flex justify-center items-center">
          <PieChart width={650} height={360}>
            <Pie
              data={data_pie_chart_percentage}
              cx="50%"
              cy="50%"
              label={({ name, value, percentage }) =>
                `${name}: ${value} (${percentage}%)`
              }
              labelLine={{ stroke: "gray", strokeWidth: 1, radius: "40%" }}
              outerRadius="130"
              fill="#8884d8"
              dataKey="value"
            >
              {data_pie_chart_percentage.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* <Legend /> */}
          </PieChart>{" "}
        </div>
      </div>
    </div>
  );
}

export default Pie_Chart_Sum;
