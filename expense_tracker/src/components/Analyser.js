import { Box, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import UserContext from '../context/userContext';
import Counter from './Counter';

function Analyser() {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [ExpenseStatus, setStatus] = useState(true)
    const [CatData, setCatData] = useState([])
    const [LimitData, setLimitData] = useState([])
    const Category_wise_expense = () => {
        Axios.get(`http://13.232.46.108:5000/getCatExpense/${user.user.id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            // console.log(res.data.data);
            setCatData(res.data.data)
        }).catch(err => console.log(err))
    }

    const getBudgetLimit = () => {
        Axios.get(`http://13.232.46.108:5000/getBudgetLimit/${user.user.id}`, {
            headers: {
                Authorization: localStorage.getItem('token')

            }
        }).then((res) => {

            setLimitData(res.data.data[0].cat_id_limit)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        Category_wise_expense()
        getBudgetLimit()
        return () => {
            if (user.user.total_expense > user.user.budget)
            {
                setStatus(false)
            }

        }
        // react-hooks/exhaustive-deps
    }, [])

    if (user.user.isPremiumUser)
    {
        return (
            <Stack>
                <Box width={"100%"} >
                    <Typography variant='h4' m={3} textAlign={'center'}>Overview Of Expenses</Typography>
                    {CatData.length > 0 && LimitData.length > 0 ? <Stack direction={{ sm: 'row', xs: 'column' }} spacing={{ sm: 1, xs: 2 }}>
                        <Box width={{ sm: '60%', xs: '90%' }} p={2} sx={{ display: 'flex', flexDirection: 'column' }} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h6' m={3} textAlign={'center'}>Limit & Spending on Each Category</Typography>
                            <LineChart pdata={CatData} lable={'Cat Spent'} lable2='Cat Limit' second={false} pdata2={LimitData} />
                        </Box>
                        <Box width={{ sm: '35%', xs: '100%' }} height={{ sm: "70vh", xs: '50vh' }} sx={{ display: 'flex', flexDirection: 'column' }} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h6' m={3} textAlign={'center'}>Insights of Your Expense</Typography>
                            <Box sx={{ display: 'flex' }} justifyContent={'space-evenly'} p={2} mb={1} alignItems={'center'} width={"80%"} border={'1px solid'}>
                                <DonutLargeOutlinedIcon color='secondary' /> <Typography fontSize={15}>This Month Budget</Typography><Counter number={user.user.budget} />
                            </Box>
                            <Box sx={{ display: 'flex' }} justifyContent={'space-evenly'} p={2} mb={1} alignItems={'center'} width={"80%"} border={'1px solid'}>
                                <BarChartOutlinedIcon color='secondary' /> <Typography fontSize={15}>Total Expense till Now</Typography><Counter number={user.user.total_expense} />
                            </Box>
                            <Box sx={{ display: 'flex' }} justifyContent={'space-evenly'} p={2} mb={1} alignItems={'center'} width={"80%"} border={'1px solid'}>
                                <AccountBalanceWalletOutlinedIcon color='secondary' /> <Typography fontSize={15}>Monthly Income</Typography><Counter number={user.user.income} />
                            </Box>
                            <Box sx={{ display: 'flex' }} justifyContent={'space-evenly'} p={2} mb={1} alignItems={'center'} width={"80%"} border={'1px solid'} borderColor={ExpenseStatus ? 'success.main' : "error.main"}>
                                <UpdateOutlinedIcon color={ExpenseStatus ? 'success' : "error"} /> <Typography fontSize={15} color={ExpenseStatus ? 'success.main' : "error.main"}>{
                                    user.user.total_expense < user.user.budget ? "Your Expenses Are in limit" : "You are Exceeding the budget"
                                }</Typography>
                            </Box>
                        </Box>
                    </Stack> : <Typography variant='h6' m={3} textAlign={'center'}>Add expense and Budget view data</Typography>}
                </Box>


            </Stack>
        )
    }
    else
    {
        navigate('/userDash/notice')
        return null
    }
}

export default Analyser