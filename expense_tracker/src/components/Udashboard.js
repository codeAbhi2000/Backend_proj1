import React from 'react'
import { Stack, Box, Tabs, Tab, } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Udashboard() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ backgroundColor: 'primary.dark', color: 'white', height: '100%' }} >
      <Box sx={{ backgroundColor: 'primary.light', width: { xs: '100%', sm: '20%' }, height: { sm: 'auto', xs: '5rem' } }} >
        <Tabs
          variant="scrollable"
          orientation={smallScreen ? "vertical" : "horizonal"}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="nav tabs example"
        >
          <Link to='home' ><Tab label="Home" /></Link>
          <Link to='allExpenses' ><Tab label="All Expenses" /></Link>
          <Link to='addExpense' ><Tab label="Add Expenses" /></Link>
          <Link to='budgeting' ><Tab label="Budgeting" /></Link>
          <Link to='expenseAnalyse' ><Tab label="Expenses Analyser" /></Link>
          <Link to='report' ><Tab label="Download Expenses Report" /></Link>
          <Link to='/login' ><Tab label="Learn Personal Finance" /></Link>

        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }} justifyContent='center' width={{ sm: '75%', xs: '100%' }}>
        <Outlet />

      </Box>

    </Stack>
  )
}

export default Udashboard