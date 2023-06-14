import React from "react";

import {
    Legend,
    PieChart, 
    Pie,
    Cell,
} from "recharts";

function Pie_Chart_Sum() {   
    //pie-chart
    var data_pie_chart_sum = [
        { name: "Tổng công việc", value: 30 },
        { name: "Công việc chưa hoàn thành", value: 15 },
    ];

    var COLORS = ["#3e92cc", "#8ac926"];
    const renderCustom = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        index
        }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        // Truy cập giá trị của từng phần tử
        const value = data_pie_chart_sum[index].value;
        
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
        <div className="w-[50vw] pl-[4vw]">
            <br/>
            <div className="w-[45vw] mb-5 border border-black rounded-xl">
                <h3 className="text-center text-2xl font-bold">
                    Tổng số công viêc và trạng thái công việc trong tháng 5
                </h3>
                <PieChart width={870} height={500}>
                    <Pie
                        data={data_pie_chart_sum}
                        isAnimationActive={true} // Animation
                        cx="50%"
                        cy="50%"
                        label={renderCustom}
                        outerRadius={190}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data_pie_chart_sum.map((entry, index) => (
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
    );
}

export default Pie_Chart_Sum;
