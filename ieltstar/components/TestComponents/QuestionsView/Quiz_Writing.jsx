import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//Demo writing quiz for format testing 
const Quiz_Writing = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/questions')
        .then(response => setData(response.data))
  }, [])
  return (
    <div>{JSON.stringify(data)}</div>
  )
}
  

export default Quiz_Writing
