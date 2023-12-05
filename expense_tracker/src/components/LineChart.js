import { Box } from '@mui/material'
import React from 'react'
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({pdata,lable,lable2,pdata2,second}) {
    let grapgData = []
   if(second){
    const getAmount = (data,length)=> {
        //  console.log(data);
        const dateWiseAmounts = new Array(length).fill(0);
        // Iterate through the array of objects
        for (const item of data) {
          const date = parseInt(item.date.slice(8,10)); // Assuming each object has a 'date' property
          const amount =parseInt( item.amount); // Assuming each object has an 'amount' property
          const index = date-1;
          dateWiseAmounts[index] += amount;
        }
      
        return dateWiseAmounts;
      }
    
    const d = new Date().getDate()
    let days = []
    for (let i = 0; i < d; i++) {
        days.push(i+1)
    }
    // console.log(pdata);
    let amount = getAmount(pdata,d)
    // console.log(amount);
    const chartdata = {
        labels :  days,
        datasets:[{
            label:lable,
            data:amount,
            backgroundColor:["#fc036b"],
        }
      ]
    }
    grapgData = chartdata
  }else{
    let mylabels = [];
    let mydata = [];
    for (let key in pdata2) {
      if (pdata2.hasOwnProperty(key)) {
        mylabels.push(key)
        mydata.push(pdata2[key])
      }
    }
    const chartdata2 = {
      labels :   mylabels
    ,
      datasets:[{
          label:lable,
          data:pdata.map((d)=> {return d.totalExpense}),
          backgroundColor:["#fc036b"],
      },
      {
        label:lable2,
        data:mydata,
        backgroundColor:["#3779b8"]
      }
    ]
  }
    grapgData = chartdata2
  }
  return (
    <Box width={'100%'}>
        <Bar data={grapgData} options={{responsive: true}}/>
    </Box>
  )
}

export default LineChart