import React from "react";

import {
    ComposedChart,
    Bar,
    LabelList,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
} from "recharts";

function Bar_Chart_Type() {   
    //bar-chart
    var data_bar_chart = [
        {
            name: "Phòng giải pháp",
            Số_Giờ: 41,
        },
        {
            name: "Phòng triển khai",
            Số_Giờ: 40,
        },
        {
            name: "Phòng hỗ trợ",
            Số_Giờ: 35,
        },
        {
            name: "Phòng kỹ thuật",
            Số_Giờ: 26,
        },
        {
            name: "Phòng kế hoạch",
            Số_Giờ: 17,
        },
        {
            name: "TT - CNTT",
            Số_Giờ: 17,
        },
    ];

    const barSize = data_bar_chart.length <= 10 ? 50 : data_bar_chart.length <= 30 ? 30 : 15;

    return (
        <div className="w-[50vw] ml-[2vw] pr-[4vw]">
            <br/>
            <div className="w-[45vw] p-0 mb-5 border border-black rounded-xl">
                <h3 className="text-center text-2xl font-bold">
                    Tỉ lệ loại công việc theo giờ đã được giao trong tháng 5
                </h3>
                <div className="w-full h-[500px]">
                    <ComposedChart width={800} height={500} data={data_bar_chart}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" interval={0} angle={60} tickMargin={70} height={150} />
                        <YAxis />
                        <Bar dataKey="Số_Giờ" barSize={barSize}>
                            {data_bar_chart.map((entry, index) => {
                                const fillColor = index % 2 === 0 ? "#0088FE" : "#e5e5e5"; // thay đổi màu fill tương ứng
                                return (
                                <Cell key={`cell-${index}`} fill={fillColor} />
                                );
                            })}
                            <LabelList dataKey="Số_Giờ" position="top" fill="blue"/>
                        </Bar>
                    </ComposedChart>
                </div>
            </div>
           
        </div>
    );
}

export default Bar_Chart_Type;
