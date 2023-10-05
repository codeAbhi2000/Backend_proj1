import React from 'react'
import { Box } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({pdata}) {
  const data = {
    labels: pdata.map((d)=>{
        return d.name
    }),
    datasets: [
      {
        label: 'Category',
        data: pdata.map((d)=> {return d.total_expense}),
        backgroundColor: ['red','blue','green','pink','yellow','orange'],
      }
    ]
  };
 
    
 
  return (
    <Box height={"85%"}>
      <Doughnut data={data}/>
    </Box>
  )
}

export default DoughnutChart