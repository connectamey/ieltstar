import { useEffect, useState } from "react";
import Admin from "../../../components/Layout/Admin";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import formatDate from "../../../utils/formatDate";
import Stack from "@mui/material/Stack";
import CreateExam from "../../../components/Admin/Exam/CreateExam";
import UpdateExam from "../../../components/Admin/Exam/UpdateExam";
import DeleteExam from "../../../components/Admin/Exam/DeleteExam";
import TablePagination from "@mui/material/TablePagination";
import { IconButton } from "@mui/material";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from "next/router";

const exam = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/exams`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <CreateExam data={data} setData={setData} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="questions crud table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    {formatDate(new Date(row.date))}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Manage tests inside this exam" arrow>
                        <IconButton
                          aria-label="redirect"
                          onClick={() => router.push(`/admin/exam/${row._id}`)}
                        >
                          <ArtTrackIcon />
                        </IconButton>
                        </Tooltip>
                      <UpdateExam id={row._id} data={data} setData={setData} />
                      <DeleteExam id={row._id} data={data} setData={setData} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
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
    </>
  );
};

exam.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};

export default exam;
