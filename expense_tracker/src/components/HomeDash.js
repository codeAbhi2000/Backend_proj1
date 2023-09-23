import React from 'react'
import BasicCard from './Card';
import DoughnutChart from './DoughnutChart';
import {Stack,Box} from '@mui/material'

function HomeDash() {
  return (
    <>
        <Stack direction='row' spacing={{ xs: 2, sm: 2 }} useFlexGap alignItems='center' height="30vh" justifyContent='center' >
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
    </>
  )
}

export default HomeDash