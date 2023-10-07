import React from 'react'
import { Box, Stack, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import Grrocery from '../assets/images/icons8-grocery-50.png'
import Other from '../assets/images/icons8-cheque-50.png'
import BasicCard from './Card';

function MonthReport({ data }) {
    // console.log(data);
    return (
        <>
            <Box width={{ sm: '80%', xs: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: { sm: 650, xs: 390 } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.allExpenses.map((e) => (

                                <TableRow key={e.id}>
                                    <TableCell align="center">{e.date.slice(0, 10).split('-').reverse().join("-")}</TableCell>
                                    <TableCell align="center">{e.amount}</TableCell>
                                    <TableCell align="center">{e.description}</TableCell>
                                    <TableCell align="center">{e.cat_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}>
                <Typography variant='h6'>Insights Of Expense</Typography>
                <Box>
                    <Stack direction='row' spacing={{ xs: 2, sm: 2 }} useFlexGap flexWrap={'wrap'} alignItems='center' justifyContent='center' >
                        <BasicCard title={'Total Expense'} value={data.total_expense[0].total_expense} />
                        <BasicCard title={'Total Budget'} value={data.savings_budget[0].total_budget} />
                        <BasicCard title={'Savings'} value={data.savings_budget[0].savings} />
                        <BasicCard title={'Income'} value={data.savings_budget[0].savings + +data.savings_budget[0].total_budget} />
                    </Stack>
                </Box>
                <Box sx={{ flexGrow: 1 }} mt={3} border={'1px solid white'}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
                                    <Typography display={'flex'}>
                                        <TrendingUpOutlinedIcon color='secondary' sx={{ mr: 1 }} />
                                        Investments
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cat_distribution[0].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
                                    <Typography display={'flex'}>
                                        <ReceiptOutlinedIcon color='secondary' sx={{ mr: 1 }} />
                                        Bills&Utility
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cat_distribution[1].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
                                    <Typography display={'flex'}>
                                        <CommuteOutlinedIcon color='secondary' sx={{ mr: 1 }} />
                                        Transportation
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cat_distribution[2].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
                                    <Typography display={'flex'}>
                                        <ShoppingBagOutlinedIcon color='secondary' sx={{ mr: 1 }} />
                                        Shopping
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cat_distribution[3].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
                                    <Box display={'flex'}>
                                        <img src={Grrocery} alt="grocery" width={'20%'} style={{ marginRight: "5%" }} />
                                        <Typography>
                                            Grocery
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        Rs. {data.cat_distribution[4].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
                                    <Box display={'flex'}>
                                        <img src={Other} alt="other" width={'20%'} style={{ marginRight: "5%" }} />
                                        <Typography>
                                            Others
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        Rs. {data.cat_distribution[5].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>

    )
}

export default MonthReport