import React from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Table from "./Components/Table";
import Pie_Chart_Sum from "./Components/Pie_Chart_Sum";
import Bar_Chart_Type from "./Components/Bar_Chart_Type";

function Home() {
  return (
    <div className="bg-[#eff0f5]">
      <div>
        <Header />
      </div>
      <div>
        <div>
          <Table />
        </div>
        <div className="flex justify-center items-center">
          <div>
            <Bar_Chart_Type />
          </div>
          <div>
            <Pie_Chart_Sum />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
