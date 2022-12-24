import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Admin from "../../../components/Layout/Admin";
import axios from "axios";
import CreateTest from "../../../components/Admin/Test/CreateTest";
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
import UpdateTest from "../../../components/Admin/Test/UpdateTest";
import DeleteTest from "../../../components/Admin/Test/DeleteTest";

const test = () => {
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
        .get(`${process.env.API_URL}/exams/${router.query.id}/tests`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <>
      <CreateTest id={router.query.id} data={data} setData={setData} />
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table sx={{ minWidth: 650 }} aria-label="questions crud table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Source</TableCell>
              <TableCell align="center">Instruction</TableCell>
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
                    {row.section}
                  </TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ __html: row.source }} />
                  </TableCell>
                  <TableCell align="center">
                    {row.instruction}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Manage questions inside this test" arrow>
                        <IconButton
                          aria-label="redirect"
                          onClick={() => router.push(`/admin/exam/test/${row._id}`)}
                        >
                          <ArtTrackIcon />
                        </IconButton>
                      </Tooltip>
                      <UpdateTest id={row._id} data={data} setData={setData} />
                      <DeleteTest id={row._id} data={data} setData={setData} />
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

test.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};

export default test;
