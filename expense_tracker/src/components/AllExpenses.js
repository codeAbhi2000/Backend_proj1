import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, Box, FormControl, InputLabel, Select, MenuItem, Stack, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios'
import { useContext } from 'react';
import UserContext from '../context/userContext';

function AllExpenses() {
  
  const user = useContext(UserContext)
  // console.log(user.user.id)

  const date = new Date()
  const [Expenses, setExpenses] = useState([])

  const [filterData, setfilterData] = useState({
      searchKey:'',
      filter:''
  })

  const getExpenses = async () => {
    const expense = await Axios.get(`http://localhost:5000/getAllExpenses/${user.user.id}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    // console.log(expense.data.data);
    setExpenses(expense.data.data)
  }

  const handleChange = (e)=>{
    setfilterData({...filterData,[e.target.name]:e.target.value})
  }

  // console.log(filterData);
 
  useEffect(() => {
    getExpenses()
  })

  // console.log(Expenses);
  return (
    <>
      <Box m={3}>
        <Stack direction='row' sx={{display:'flex'}} justifyContent={'space-evenly'}>
        <Box width={{ sm: '30%', xs: "50%" }} sx={{display:'flex'}} alignItems={'center'} >
           <Box bgcolor={'primary.main'} width={"15%"} height={'3.5rem'} borderRadius={'0,2%,0,2%'} sx={{display:'flex'}} alignItems={'center'} justifyContent={'center'}>
              <SearchIcon />
           </Box>
            <TextField
              placeholder="Search Category…"
              inputProps={{ 'aria-label': 'search' }}
              value={filterData.searchKey}
              onChange={handleChange}
              name='searchKey'
            />
        </Box>
        <Box width={'40%'}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterData.filter}
              label="Filter"
              name='filter'
              onChange={handleChange}
            >
              <MenuItem value={''}>All</MenuItem>
              <MenuItem value={date.getMonth()+1}>This Month</MenuItem>
              <MenuItem value={date.getFullYear()}>This Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: { sm: 650, xs: 250 } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {filterData.filter && Expenses.filter((m)=> {
                 let cdate = m.date.slice(5,6) === 0 ? m.date.slice(6,7): m.date.slice(5,7)
                if(parseInt(cdate)===filterData.filter){
                   return m
                }
                else if (parseInt(m.date.slice(0,4)) === filterData.filter){
                  return m
                }
            }).map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
              </TableRow>
            ))

          }
            {filterData.searchKey && Expenses.filter((m)=>{
               return m.cat_name.toLowerCase().includes(filterData.searchKey.toLowerCase()) 
           }).map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
              </TableRow>
            ))
            } 
           {filterData.filter === '' && filterData.searchKey === '' ? Expenses.map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
              </TableRow>
            )):<></>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AllExpenses