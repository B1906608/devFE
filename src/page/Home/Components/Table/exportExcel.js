import React from "react";
import { BiDownload } from "react-icons/bi";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import XLSX from "xlsx";

function Excel() {
  function exportToExcel() {
    const table = document.getElementsByTagName("table")[0]; // lấy table HTML đầu tiên trong document
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");
    const date = new Date().toISOString().slice(0, 10);
    const filename = `Danh sách công việc - ${date}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  return (
    <TableContainer component={Paper}>
      <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between px-20">
        <p className="ml-5 text-white text-4xl font-bold">
          Danh sách các công việc
        </p>
        <button
          onClick={exportToExcel}
          className="flex mr-5 bg-[#91cc75] p-2 rounded-lg items-center"
        >
          <p className="text-xl text-white font-bold">Xuất Excel</p>
          <div className="ml-2 text-white text-2xl">
            <BiDownload />
          </div>
        </button>
      </div>
    </TableContainer>
  );
}

export default Excel;
