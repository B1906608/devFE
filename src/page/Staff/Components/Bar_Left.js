import React, { useState, useEffect } from "react";
import CallApi from "../../../API/CallAPI";

import {
  ComposedChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

function Bar_Left() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvcot", "GET"); // gọi API để lấy dữ liệu
        console.log("Cột trái", res.data);
        setData(
          res.data.map((number) => {
            number.so_gio_lam = +number.so_gio_lam;
            return number;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const barSize = data.length <= 10 ? 50 : data.length <= 30 ? 30 : 15;

  return (
    <div className="w-[47vw] mb-3">
      <br />
      <div className="shadow-xl rounded-md bg-white">
        <p className="text-center text-xl font-bold py-3">
          Thời gian thực hiện công việc trong tháng{" "}
          {data.find((thang) => thang.name === "thang")?.month} là :{" "}
          {data.find((thang) => thang.name === "TongGioLam")?.value} giờ
        </p>
        <div className="w-full h-[540px] mb-4 flex justify-center">
          <div className="rotate-90 items-center my-28 h-10 font-bold text-xl">
            Số giờ
          </div>
          {data.length !== 0 && (
            <ComposedChart
              width={600}
              height={540}
              data={data.filter((month) => {
                return month.name !== "TongGioLam" && month.name !== "thang";
              })}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="cv_ten"
                interval={0}
                angle={60}
                tickMargin={100}
                height={200}
                padding={{ right: 30 }}
                dx={0} // Điều chỉnh vị trí của tick
                dy={-90} // Điều chỉnh vị trí của label
                textAnchor="start" // Căn lề của label theo hướng end (bên phải)
              />
              <YAxis padding={{ top: 20 }} />
              <Bar dataKey="so_gio_lam" barSize={barSize}>
                {data.map((entry, index) => {
                  const fillColor = "#3e92cc"; // thay đổi màu fill tương ứng
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
                <LabelList
                  dataKey="so_gio_lam"
                  position="top"
                  style={{
                    fontSize: "20px",
                  }}
                />
              </Bar>
            </ComposedChart>
          )}
        </div>
        <div className="flex justify-center font-bold pb-2 text-xl">
          Tên công việc
        </div>
      </div>
    </div>
  );
}

export default Bar_Left;
