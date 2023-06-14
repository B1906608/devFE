import React, { useState, useEffect } from "react";
import CallApi from "../../../../API/CallAPI";
import { Legend, PieChart, Pie, Cell } from "recharts";

function Pie_Chart_Sum() {
  const [dataPieChartSum, setDataPieChartSum] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallApi("nvtron", "GET"); // Chỉnh sửa đường link API thích hợp
        const { TongCv, TongCvChuaHT, TongCvHoanThanh } = res.data;
        setDataPieChartSum([
          { name: "Công việc hoàn thành", value: TongCvHoanThanh },
          { name: "Công việc đang thực hiện", value: TongCvChuaHT },
          {
            name: "Công việc quá hạn",
            value: TongCv - TongCvHoanThanh - TongCvChuaHT,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(fetchData);
    fetchData();
  }, []);

  const COLORS = ["#178df0", "#90cb74", "#ee6766"];

  const renderCustom = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Truy cập giá trị của từng phần tử
    const value = dataPieChartSum[index].value;

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-[50vw] ml-[2vw] pr-[4vw]">
      <br />
      <div className="w-[45vw] mb-5 shadow-2xl rounded-md bg-white">
        <h3 className="text-center text-xl font-bold">
          Biểu đồ tổng số công việc
        </h3>
        <div className="justify-center">
          <PieChart width={650} height={500}>
            <Pie
              data={dataPieChartSum}
              isAnimationActive={true}
              cx="50%"
              cy="50%"
              label={renderCustom}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {dataPieChartSum.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Pie_Chart_Sum;
