import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { BiDownload } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import XLSX from "xlsx";
import moment from "moment";
import CallApi from "../../API/CallAPI";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "dv_ten",
    numeric: false,
    disablePadding: true,
    label: "Tên đơn vị",
  },
  {
    id: "tentruongphong",
    numeric: true,
    disablePadding: false,
    label: "Trưởng đơn vị",
  },
  {
    id: "tongcv",
    numeric: true,
    disablePadding: false,
    label: "Tổng CV đã giao",
  },
  {
    id: "sapdenhan",
    numeric: true,
    disablePadding: false,
    label: "Công việc sắp tới hạn",
  },
  {
    id: "hethan",
    numeric: true,
    disablePadding: false,
    label: "Công việc quá hạn",
  },
  {
    id: "tile",
    numeric: true,
    disablePadding: false,
    label: "Tỷ lệ hoàn thành",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hasCvCon, setHasCvCon] = useState(false);

  useEffect(() => {
    // Nếu có CvCon thì set hasCvCon là true
    if (row.CvCon.length > 0) {
      setHasCvCon(true);
    } else {
      setHasCvCon(false);
    }
  }, [row.CvCon]);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  // set trạng thái công việc
  function trangThai(trangThai) {
    switch (trangThai) {
      case "2":
        return (
          <div className="bg-[#178df0] text-white rounded-lg text-base font-bold py-1">
            Đang thực hiện
          </div>
        );
      case "3":
        return (
          <div className="bg-[#90ca74] text-white rounded-lg text-base font-bold py-1">
            Hoàn thành
          </div>
        );
      case "4":
        return (
          <div className="bg-[#ee6765] text-white rounded-lg text-base font-bold py-1">
            Quá hạn
          </div>
        );
      default:
        return "";
    }
  }

  return (
    <>
      {/* body cha */}
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={props.index % 2 === 0 ? "bg-blue-50" : ""}
        style={{
          height: "50px",
          fontSize: "1.25rem",
          backgroundColor: hover ? "#d3d3d3" : "",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <th className="text-left font-medium">
          {/* icon sổ ra cv con */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ display: hasCvCon ? "block" : "none" }}
          >
            {open ? <AiOutlineDown /> : <GrNext />}
          </IconButton>
        </th>
        <th className="text-left font-medium">{row.dv_ten}</th>
        <th className="text-left font-normal">{row.tentruongphong}</th>
        <th className="text-center font-medium">{row.tongcv}</th>
        <th className="text-center font-normal">{row.sapdenhan}</th>
        <th className="text-center font-normal">{row.hethan}</th>
        <th className="text-center font-normal">
          {typeof row.tile === "number" && row.tile % 1 !== 0
            ? row.tile.toFixed(1) + "%"
            : row.tile + "%"}
        </th>
      </TableRow>

      {/* Công việc của từng đơn vị */}
      <TableRow className={props.index % 2 === 0 ? "bg-blue-50" : ""}>
        <TableCell style={{ paddingBottom: 5, paddingTop: 5 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                {/* Head của công việc con */}
                <TableHead className="bg-[#6a994e] text-white">
                  <tr>
                    <th className="text-left">
                      <p className="text-lg ml-2">Công việc đã giao</p>
                    </th>
                    <th className="w-[14vw]">
                      <div className="flex text-lg ">Người đảm nhận</div>
                    </th>
                    <th className="w-[10vw]">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời gian </p>
                          <p>thực hiện </p>
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời hạn</p>
                          <p>công việc</p>
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời gian</p>
                          <p>hoàn thành</p>
                        </button>
                      </div>
                    </th>
                    <th className="w-[10vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Trạng thái</p>
                          <p>công việc</p>
                        </button>
                      </div>
                    </th>
                    <th className="w-[10vw]">
                      <div className="flex text-lg justify-center items-center text-center">
                        <button>
                          <p>Tỷ lệ</p>
                          <p>hoàn thành</p>
                        </button>
                      </div>
                    </th>
                  </tr>
                </TableHead>
                <TableBody>
                  {row.CvCon.map((CvConRow) => (
                    <TableRow
                      key={CvConRow.cv_id}
                      className="border-x border-b h-10 bg-white"
                    >
                      <td className="text-left text-lg pl-3">
                        {CvConRow.cv_ten}
                      </td>

                      <td className="text-left text-lg">{CvConRow.nv_ten}</td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_tgthuchien}
                      </td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_hanhoanthanh
                          ? moment(CvConRow.cv_hanhoanthanh).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_thgianhoanthanh
                          ? moment(CvConRow.cv_thgianhoanthanh).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>

                      <td className="text-center text-lg">
                        {trangThai(CvConRow.cv_trangthai)}
                      </td>

                      <td className="text-center text-lg">
                        {typeof CvConRow.cv_tiendo === "number" &&
                        CvConRow.cv_tiendo % 1 !== 0
                          ? CvConRow.cv_tiendo.toFixed(1) + "%"
                          : CvConRow.cv_tiendo + "%"}
                      </td>
                      <th className="text-center font-normal"></th>
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

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function dataTable() {
      try {
        let res = await CallApi("ldbang", "GET");
        console.log("Bảng", res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    dataTable();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

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
    <div className="w-full">
      <div className="m-auto px-5 py-3">
        <TableContainer component={Paper}>
          {/* Phần Excel */}
          <div className="flex  bg-[#1982c4] w-full h-12 items-center justify-between">
            <p className="ml-5 text-white text-3xl font-bold">
              Danh sách đơn vị trực thuộc
            </p>
            <button
              onClick={exportToExcel}
              className="flex mr-5 bg-[#6a994e] hover:bg-green-500 p-1 rounded-lg items-center"
            >
              <p className="text-lg text-white font-bold">Xuất Excel</p>
              <div className="ml-2 text-white text-xl">
                <BiDownload />
              </div>
            </button>
          </div>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.dv_ten);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  // <TableRow
                  //   hover
                  //   onClick={(event) => handleClick(event, row.dv_ten)}
                  //   aria-checked={isItemSelected}
                  //   tabIndex={-1}
                  //   key={row.dv_ten}
                  //   selected={isItemSelected}
                  //   sx={{ cursor: "pointer" }}
                  // >
                  //   <TableCell
                  //     component="th"
                  //     id={labelId}
                  //     scope="row"
                  //     padding="none"
                  //     width={"200px"}
                  //   >
                  //     {row.dv_ten}
                  //   </TableCell>
                  //   <TableCell align="right">{row.dv_id}</TableCell>
                  //   <TableCell align="right">{row.tongcv}</TableCell>
                  //   <TableCell align="right">{row.sapdenhan}</TableCell>
                  //   <TableCell align="right">{row.hethan}</TableCell>
                  //   <TableCell align="right">{row.tile}</TableCell>
                  // </TableRow>

                  <Row key={row.id} row={row} index={index} />
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
