import { Table,TableBody,TableCell,TableRow,TableContainer,TableHead ,Paper} from '@mui/material'
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import { useContext } from 'react';
import UserContext from '../context/userContext';

function AllExpenses() {
    const user = useContext(UserContext)
    console.log(user.user.id)
    const [Expenses, setExpenses] = useState([])

    const getExpenses = async ()=>{
       const expense = await Axios.get(`http://localhost:5000/getAllExpenses/${user.user.id}`)
        console.log(expense.data.data);
        setExpenses(expense.data.data)
    }

    useEffect(() => {
      getExpenses()
    }, [])
    
    console.log(Expenses);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:{ sm:650 ,xs:250}}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {Expenses.map((e)=>(
            
            <TableRow key={e.id}>
              <TableCell align="center">{e.date.slice(0,10).split('-').reverse().join("-")}</TableCell>
              <TableCell align="center">{e.amount}</TableCell>
              <TableCell align="center">{e.description}</TableCell>
              <TableCell align="center">{e.cat_name}</TableCell>
            </TableRow>
        ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AllExpenses