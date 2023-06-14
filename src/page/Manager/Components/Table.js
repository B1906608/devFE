import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiDownload } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import XLSX from "xlsx";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    workSmall: [
      {
        id: 1,
        title: "Lập trình 2 chức năng",
        actor: "Nguyễn Văn A",
        time: "11 giờ",
        deadline: "15/06/2023",
        completionTime: "14/06/2023",
        status: "Chưa hoàn thành",
        progress: "90%",
      },
      {
        id: 2,
        title: "Lập trình 1 chức năng",
        actor: "Nguyễn Văn B",
        time: "2 giờ",
        deadline: "15/05/2023",
        completionTime: "24/05/2023",
        status: "Quá hạn",
        progress: "10%",
      },
      {
        id: 3,
        title: "Lập trình 1 chức năng",
        actor: "Nguyễn Văn C",
        time: "2 giờ",
        deadline: "15/05/2023",
        completionTime: "24/05/2023",
        status: "Quá hạn",
        progress: "10%",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        // className={props.index % 2 === 0 ? "bg-blue-200" : ""}
        className="text-lg h-12"
      >
        <th className="text-left font-medium">
          {/* icon sổ ra cv con */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineDown /> : <GrNext />}
          </IconButton>
          {/* tên cv */}
          {row.name}
        </th>
        <th className="text-center font-normal">{row.fat}</th>
        <th className="text-center font-normal">{row.calories}</th>
        <th className="text-center font-normal">{row.carbs}</th>
        <th className="text-center font-normal">
          {row.protein}
          {/* {row.protein === "Chưa hoàn thành" ? (
                    <span className="text-gray-700">{row.protein}</span>
                ) : (
                    <span className="text-red-500">{row.protein}</span>
                )} */}
        </th>
        <th className="text-center font-medium">{row.price}</th>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div" className='bg-green-200 pl-2'>
                    Công việc con
                </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead className="bg-[#6a994e] text-white">
                  <tr className="border-x border-black">
                    <th className="text-left">
                      <p className="text-lg ml-2">Công việc đã giao</p>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Người</p>
                          <p>đảm nhận</p>
                        </div>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Số giờ</p>
                          <p>đã làm</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Thời gian</p>
                          <p>bắt đầu</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Thời gian</p>
                          <p>đến hạn</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Trạng thái</p>
                          <p>công việc</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex justify-center items-center">
                        <div className="text-sm">
                          <p>Tỷ lệ</p>
                          <p>hoàn thành</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                  </tr>
                </TableHead>
                <TableBody>
                  {row.workSmall.map((workSmallRow) => (
                    <TableRow key={workSmallRow.id}>
                      <TableCell component="th" scope="row">
                        {workSmallRow.title}
                      </TableCell>
                      <TableCell align="center">{workSmallRow.actor}</TableCell>
                      <TableCell align="center">{workSmallRow.time}</TableCell>
                      <TableCell align="center">
                        {workSmallRow.deadline}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.completionTime}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.status}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.progress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData("Phòng giải pháp", 23, "Nguyễn Văn A", 0, 0, "100%"),
  createData("Phòng triển khai", 28, "Nguyễn Văn B", 3, 4, "75%"),
  createData("Phòng hổ trợ", 26, "Nguyễn Văn C", 2, 6, "65%"),
  createData("Phòng kỹ thuật", 30, "Nguyễn Văn D", 1, 2, "90%"),
  createData("Phòng kế hoạch", 36, "Nguyễn Văn E", 6, 12, "50%"),
];

export default function CollapsibleTable() {
  function exportToExcel() {
    const table = document.getElementsByTagName("table")[0]; // lấy table HTML đầu tiên trong document
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");
    const date = new Date().toISOString().slice(0, 10);
    const filename = `Danh sách công việc - ${date}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  const [showOptionsTime, setShowOptionsTime] = useState(false);

  function toggleOptionsTime() {
    setShowOptionsTime(!showOptionsTime);
  }

  function handleOptionTimeClick(option) {
    console.log(`Selected option: ${option}`);
    setShowOptionsTime(false);
  }

  function SortButton() {
    const [numbers, setNumbers] = useState([]);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [iconColor, setIconColor] = useState("text-black");

    const sortNumbers = () => {
      const sortedNumbers = [...numbers].sort(
        ascendingOrder ? (a, b) => a - b : (a, b) => b - a
      );
      setNumbers(sortedNumbers);
      setAscendingOrder(!ascendingOrder);
      setIconColor(ascendingOrder ? "text-white" : "text-black");
    };

    return (
      <div>
        <button
          className="ml-1 text-xl bg-blue-300 text-black"
          onClick={sortNumbers}
        >
          <TbArrowsSort className={`sort-icon ${iconColor}`} />
          {/* {ascendingOrder ? "Tăng dần" : "Giảm dần"} */}
        </button>
        <ul>
          {numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="m-auto p-5">
        <TableContainer component={Paper}>
          <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between px-20">
            <p className="ml-5 text-white text-4xl font-bold">
              Danh sách các công việc
            </p>
            <button
              onClick={exportToExcel}
              className="flex mr-5 bg-[#6a994e] p-2 rounded-lg items-center"
            >
              <p className="text-xl text-white font-bold">Xuất Excel</p>
              <div className="ml-2 text-white text-2xl">
                <BiDownload />
              </div>
            </button>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <tr className="border-x">
                <th className="text-left">
                  <p className="text-2xl ml-2">Công việc đã giao</p>
                </th>
                <th className="w-[20vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Lãnh đạo</p>
                      <p>đơn vị</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[13vw]">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Tổng CV</p>
                      <p>đã giao</p>
                    </div>
                    <SortButton />
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Công việc</p>
                      <p>sắp đến hạn</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Công việc</p>
                      <p>chưa hoàn thành</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Tỷ lệ</p>
                      <p>hoàn thành</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  colSpan={7}
                  className="bg-blue-500 h-1 border-x border-blue-500"
                ></th>
              </tr>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row key={row.name} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
