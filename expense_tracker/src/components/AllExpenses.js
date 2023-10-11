import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, Box, FormControl, InputLabel, Select, MenuItem, Stack, TextField, TablePagination,IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios'
import { useContext } from 'react';
import UserContext from '../context/userContext';
import EditIcon from '@mui/icons-material/Edit';


function AllExpenses() {
  
  const user = useContext(UserContext)
  // console.log(user.user.id)
  
  const date = new Date()
  const [Expenses, setExpenses] = useState([])
  const [page, setpage] = useState(0)
  const [rowPerPage, setrowPerPage] = useState(5)
  const [open ,setopen] = useState(false)
  const [EditData, setEditData] = useState({
    id:null,
    description:'',
    amount:null,
    date:'',
    cat_id:null
  })
  
  const clickedItemdata = (obj)=>{
    setopen(true)
    console.log(obj);
    setEditData({
      id:obj.id,
      description:obj.description,
      amount:obj.amount,
      date:obj.date.slice(0,10),
      cat_id:obj.cat_id
    })
  }

  const handleFromDataChange = (e)=>{
    setEditData({...EditData,[e.target.name]:e.target.value})
  }
  const [filterData, setfilterData] = useState({
      searchKey:'',
      filter:''
  })

  const getExpenses = async () => {
    const expense = await Axios.get(`http://13.127.183.58:5000/getAllExpenses/${user.user.id}`, {
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

  const handlePageChange = (event,newPage)=>{
    setpage(newPage)
  }

  const handleRowPerPageChange = (e)=>{
    setrowPerPage(+e.target.value)
    setpage(0)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(EditData);
    Axios.post('http://13.127.183.58:5000/addExpense',{
            id : EditData.id,       
            description:EditData.description,
            date:EditData.date,
            amount:EditData.amount,
            uid:user.user.id ,
            cat_id:EditData.cat_id
        },{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        }).then((res)=>{
            alert(res.data.msg)
            setopen(false)
            setEditData({
              id:null,
              description:'',
              amount:null,
              date:'',
              cat_id:null
            })

        }).catch(err => console.log(err))
  }

  // console.log(filterData);
 
  useEffect(() => {
    getExpenses()
  },[])

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
      <Paper>
      <TableContainer >
        <Table sx={{ minWidth: { sm: 650, xs: 250 },  }}  >
          <TableHead stickyHeader>
            <TableRow sx={{backgroundColor:'secondary.main'}}>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {filterData.filter ? Expenses.filter((m)=> {
                 let cdate = m.date.slice(5,6) === 0 ? m.date.slice(6,7): m.date.slice(5,7)
                if(parseInt(cdate)===filterData.filter){
                   return m
                }
                else if (parseInt(m.date.slice(0,4)) === filterData.filter){
                  return m
                }
            }).slice(page * rowPerPage , page * rowPerPage + rowPerPage ).map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
                <TableCell align="center"><IconButton onClick={()=>clickedItemdata(e)}><EditIcon/></IconButton></TableCell>
              </TableRow>
            ))
              :<></>
          }
            {filterData.searchKey ? Expenses.filter((m)=>{
               return m.cat_name.toLowerCase().includes(filterData.searchKey.toLowerCase()) 
           }).slice(page * rowPerPage , page * rowPerPage + rowPerPage ).map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
                <TableCell align="center"><IconButton onClick={()=>clickedItemdata(e)}><EditIcon/></IconButton></TableCell>
              </TableRow>
            ))
            :<></>
            } 
           {filterData.filter === '' && filterData.searchKey === '' && Expenses.length > 0 ?  Expenses.slice(page * rowPerPage , page * rowPerPage + rowPerPage )
           .map((e) => (

              <TableRow key={e.id}>
                <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                <TableCell align="center">{e.amount}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.cat_name}</TableCell>
                <TableCell align="center"><IconButton onClick={()=>clickedItemdata(e)}><EditIcon/></IconButton></TableCell>
              </TableRow>
            )):<Typography variant='h5' textAlign={'center'}>No Expense Data </Typography>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10,25]}
        page={page}
        count={Expenses.length}
        rowsPerPage={rowPerPage}
        component={'div'}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}
        sx={{backgroundColor:'secondary.main'}}
      >
          
      </TablePagination>
      </Paper>
      <div>
      <Dialog open={open}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent >
        <form onSubmit={handleSubmit} >
                        <Stack spacing={1}>
                            <TextField variant='outlined' label="Description" name='description' color='secondary' type='text' value={EditData.description} required onChange={handleFromDataChange}/>
                            <TextField variant='outlined' label="Amount" type="number" name='amount' color='secondary' value={EditData.amount} required onChange={handleFromDataChange}/>
                            <label htmlFor="date">Date</label>
                            <TextField variant='outlined' id='date' type="date" name='date' value={EditData.date} color='secondary' required onChange={handleFromDataChange}/>
                            <label htmlFor="demo-simple-select">Category</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label='category'
                                name='cat_id'
                                value={EditData.cat_id}
                                onChange={handleFromDataChange}
                            >
                                <MenuItem value={1000}>Investment</MenuItem>
                                <MenuItem value={1001}>Bills & Utilities</MenuItem>
                                <MenuItem value={1002}>Transportation</MenuItem>
                                <MenuItem value={1003}>Shopping</MenuItem>
                                <MenuItem value={1004}>Grocery</MenuItem>
                                <MenuItem value={1005}>Others</MenuItem>
                            </Select>
                            <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Submit</Button>
                        </Stack>
                    </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setopen(false)}  color='secondary'  >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}

export default AllExpenses