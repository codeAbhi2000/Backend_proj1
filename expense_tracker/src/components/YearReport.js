import React from 'react'
import { Box, Stack, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import Grrocery from '../assets/images/icons8-grocery-50.png'
import Other from '../assets/images/icons8-cheque-50.png'
import BasicCard from './Card';
function YearReport({ data }) {
    const combinedArray = data.month_expense.map((item1) => {
        const item2 = data.bud_save_in.find((item2) => item2.month === item1.month);

        if (item2)
        {
            // Combine data from item1 and item2 into a single object
            return {
                month: item1.month,
                total_expense: item1.total_expense,
                total_budget: item2.total_budget,
                savings: item2.savings,
                income: item2.income,
            };
        } else
        {
            // Handle the case where there is no matching item in array2
            return {
                month: item1.month,
                total_expense: item1.total_expense,
                total_budget: 0,
                savings: 0,
                income: 0,
            };
        }
    });

    //   console.log(combinedArray);
    return (
        <>
            <Box width={{ sm: '90%', xs: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: { sm: 650, xs: 250 } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Month</TableCell>
                                <TableCell align="center">Total Expense</TableCell>
                                <TableCell align="center">Budget</TableCell>
                                <TableCell align="center">Savings</TableCell>
                                <TableCell align="center">Income</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {combinedArray.map((e) => (

                                <TableRow key={e.month}>
                                    <TableCell align="center">{e.month}</TableCell>
                                    <TableCell align="center">{e.total_expense}</TableCell>
                                    <TableCell align="center">{e.total_budget}</TableCell>
                                    <TableCell align="center">{e.savings}</TableCell>
                                    <TableCell align="center">{e.income}</TableCell>
                                </TableRow>
                            ))
                            }
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
                        <BasicCard title={'Total Expense'} value={data.overAll_data[0].y_total_expense} />
                        <BasicCard title={'Total Budget'} value={data.overAll_data[0].y_total_budget} />
                        <BasicCard title={'Savings'} value={data.overAll_data[0].y_total_savings} />
                        <BasicCard title={'Income'} value={data.overAll_data[0].y_total_income} />
                    </Stack>
                </Box>
                <Box sx={{ flexGrow: 1 }} mt={3}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>

                            <Stack direction={{ sm: 'row', xs: "column" }} spacing={2}>
                                <Box>
                                    <Typography>
                                        <TrendingUpOutlinedIcon color='secondary' />
                                        Investments
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography >
                                        Rs. {data.cata_wise_data[0].total_expense}
                                    </Typography>
                                </Box>
                            </Stack>

                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={'row'} spacing={2}>
                                    <ReceiptOutlinedIcon color='secondary' />
                                    <Typography>
                                        Bills&Utility
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cata_wise_data[1].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={'row'} spacing={2}>
                                    <CommuteOutlinedIcon color='secondary' />
                                    <Typography>
                                        Transportation
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cata_wise_data[2].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={'row'} spacing={2}>
                                    <ShoppingBagOutlinedIcon color='secondary' />
                                    <Typography>
                                        Shopping
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cata_wise_data[3].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={'row'} spacing={1}>
                                    <Box>
                                        <img src={Grrocery} alt="grocery" width={'50%'} />
                                    </Box>
                                    <Typography>
                                        Grocery
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cata_wise_data[4].total_expense}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Box>
                                <Stack direction={'row'} spacing={1}>
                                    <Box>
                                        <img src={Other} alt="other" width={'50%'} />
                                    </Box>
                                    <Typography>
                                        Others
                                    </Typography>
                                    <Typography>
                                        Rs. {data.cata_wise_data[5].total_expense}
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

export default YearReport