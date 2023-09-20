import React from 'react'
import { Box } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: ['20','50','30'],
        backgroundColor: ['red','blue','orange'],
      }
    ]
  };
 
    
 
  return (
    <Box>
      <Doughnut data={data}/>
    </Box>
  )
}

export default DoughnutChart