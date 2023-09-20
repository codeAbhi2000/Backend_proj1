import React from 'react'
import { Stack, Box, Tabs, Tab, } from '@mui/material'
// import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicCard from './Card';
import DoughnutChart from './DoughnutChart';


function Udashboard() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ backgroundColor: 'primary.dark', color: 'white', height: '100%' }} >
      <Box sx={{ backgroundColor: 'primary.light', width: { xs: '100%', sm: '20%' }, height: { sm: 'auto', xs: '3rem' } }} >
        <Tabs
          variant="scrollable"
          orientation={smallScreen ? "vertical" : "horizonal"}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="nav tabs example"
        >

          <Tab label="Page One" variant='a' href='#' />
          <Tab label="Page Two" />
          <Tab label="Page Three" />
          <Tab label="Page Three" />
          <Tab label="Page Three" />
          <Tab label="Page Three" />
        </Tabs>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column'}}   justifyContent='center' width={{sm:'75%',xs:'100%'}}>
        <Stack direction='row' spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap='wrap' alignItems='center' height="30vh" justifyContent='center' >
          <BasicCard />
          <BasicCard />
          <BasicCard />
        </Stack>
        <Stack width='100%'  mt={2} direction={{xs:'column',sm:'row'}} alignItems='center' justifyItems='center' justifyContent='space-evenly'>
          <Box width={{sm:"40%",xs:'80%'}} height={{sm:'70vh',xs:'40vh'}} border='1px solid white' m={1}>
              <DoughnutChart/>
          </Box>
          <Box width={{sm:"40%",xs:'80%'}} height={{sm:'60vh',xs:'40vh'}} border='1px solid white'  m={1}>
              chart 2
          </Box>
        </Stack>
      </Box>

    </Stack>
  )
}

export default Udashboard