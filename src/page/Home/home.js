/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// 
// import CallApi from ".import styled from "styled-components";./API/CallApi";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      lop: [],
    };
  }
  render() {
    //bar-chart
    var data_bar_chart = [
        // {
        //     name: "Sĩ số",
        //     Số_HS: 61,
        // },
        {
            name: "Sĩ số",
            Số_HS: 61,
        },
        {
            name: "Lên lớp",
            Số_HS: 1,
        },
        {
            name: "Khen thưởng",
            Số_HS: 6,
        },
        {
            name: "Ở lại lớp",
            Số_HS: 6,
        },
    ];

    //pie-chart
    var data_pie_chart = [
      { name: "Yếu", value: 2 },
      { name: "Trung bình", value: 5 },
      { name: "Khá", value: 6 },
      { name: "Giỏi", value: 6 },
      { name: "Xuất sắc", value: 5 },
    ];
    var COLORS = ["#FE0000", "#FF7B00", "#FFDD00", "#0088FE", "#70E000"];
    var RADIAN = Math.PI / 180;
    var renderCustom = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    var { students, lop } = this.state;
    for (let i = 0; i < students.length; i++) {
      if (students[i].gpa < 5) {
        data_pie_chart[0].value += 1;
      }
      if (students[i].gpa >= 5 && students[i].gpa < 6) {
        data_pie_chart[1].value += 1;
      }
      if (students[i].gpa >= 6 && students[i].gpa < 8) {
        data_pie_chart[2].value += 1;
      }
      if (students[i].gpa >= 8 && students[i].gpa < 10) {
        data_pie_chart[3].value += 1;
      }
      if (students[i].gpa >= 10) {
        data_pie_chart[4].value += 1;
      }
    }

    for (let i = 0; i < students.length; i++) {
      // Sĩ số
      if (students[i].gpa >= 0 && students[i].gpa <= 10) {
        data_bar_chart[0].Số_HS += 1;
      }
      // Lên lớp
      if (students[i].gpa >= 3 && students[i].gpa <= 10) {
        data_bar_chart[1].Số_HS += 1;
      }
      // Khen thưởng
      if (students[i].gpa >= 6 && students[i].gpa <= 10) {
        data_bar_chart[2].Số_HS += 1;
      }
      // Ở lại lớp
      if (students[i].gpa >= 0 && students[i].gpa <= 2) {
        data_bar_chart[3].Số_HS += 1;
      }
    }

    return (
      <div className="w-full">
        <div className="dropdown">
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            {lop.map((item) => (
              <li
                to="/home/list-students"
                key={item}
                onClick={() => this.ChooseClass(item)}
              >
                <a role="button">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <label
          style={{
            padding: "5px",
          }}
        >
          {sessionStorage.getItem("item")}
        </label>
        <br /> <br />
        <div className="m-auto w-3/4 mb-5 border border-black rounded-xl">
          <h3 style={{ textAlign: "center" }}>
            BIỂU ĐỒ THỐNG KÊ ĐIỂM TRUNG BÌNH CẢ NĂM HỌC SINH
          </h3>
          <div className="w-1/2 m-auto">
            <PieChart width={500} height={450}>
              <Pie
                data={data_pie_chart}
                isAnimationActive={true}
                cx="50%"
                cy="50%"
                label={renderCustom}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data_pie_chart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>{" "}
          </div>
        </div>
        <div className="m-auto w-3/4 p-0 mb-5 border border-black rounded-xl">
          <h3 style={{ textAlign: "center" }}>
            BIỂU ĐỒ THỐNG KÊ TRẠNG THÁI HỌC SINH
          </h3>
          <div className="w-[90vw] m-auto">
            <ComposedChart width={900} height={500} data={data_bar_chart}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Số_HS" barSize={50} fill="#0088FE" />
            </ComposedChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
