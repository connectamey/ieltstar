import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Admin from "../../../../components/Layout/Admin";
import axios from "axios";
import CreateQuestion from "../../../../components/Admin/Question/CreateQuestion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import { IconButton } from "@mui/material";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import Tooltip from "@mui/material/Tooltip";
import UpdateQuestion from "../../../../components/Admin/Question/UpdateQuestion";
import DeleteQuestion from "../../../../components/Admin/Question/DeleteQuestion";

const question = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(router.query.id);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get(`${process.env.API_URL}/tests/${router.query.id}/`)
        .then((response) => {
          console.log(response.data.questions);
          setData(response.data.questions);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <>
      <CreateQuestion id={router.query.id} data={data} setData={setData} />
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table sx={{ minWidth: 650 }} aria-label="questions crud table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Options</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Answer</TableCell>
              <TableCell align="center">Marks</TableCell>
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
                  <TableCell align="center">{row.description ? row.description : "-"}</TableCell>
                  <TableCell align="center">{row.options.join(", ")}</TableCell>
                  <TableCell align="center">{row.type ? row.type : "-"}</TableCell>
                  <TableCell align="center">{row.answer}</TableCell>
                  <TableCell align="center">{row.marks}</TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <UpdateQuestion id={row._id} testId={id} data={data} setData={setData} />
                      <DeleteQuestion id={row._id} testId={id} data={data} setData={setData} />
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

question.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};

export default question;
