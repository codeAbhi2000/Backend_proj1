import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper,TablePagination, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useContext } from 'react';
import UserContext from '../context/userContext';

function Downloads() {
    const [DownloadList, setDownloadList] = useState([])
    const [page, setpage] = useState(0)
    const [rowPerPage, setrowPerPage] = useState(5)
    const user = useContext(UserContext)

    const handlePageChange = (event, newPage) => {
        setpage(newPage)
      }
    
      const handleRowPerPageChange = (e) => {
        setrowPerPage(+e.target.value)
        setpage(0)
      }
    const getDownloadList = async () => {
        try
        {

            const result = await Axios.get(`http://localhost:5000/getDownloadsList/${user.user.id}`)
            if (result)
            {
                setDownloadList(result.data.data)
            }
        } catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        getDownloadList()
    }, [])

    return (
        <Box  display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box width={{ sm: '80%', xs: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: { sm: 300, xs: 300 } }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                                <TableCell align="center">SL No</TableCell>
                                <TableCell align="center">Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DownloadList.length > 0 ? DownloadList.map((e, i) => (

                                <TableRow key={e.id}>
                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center"><a href={e.link}>{`Report${i + 1}`}</a></TableCell>
                                </TableRow>
                            )) : <Typography variant='h6' m={3} textAlign={'center'}>Nothing to show</Typography>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    count={DownloadList.length}
                    rowsPerPage={rowPerPage}
                    component={'div'}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                    sx={{ backgroundColor: 'secondary.main' }}
                >

                </TablePagination>
            </Box>
        </Box>
    )
}

export default Downloads