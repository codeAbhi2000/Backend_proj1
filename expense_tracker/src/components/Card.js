import React from 'react'
import {Card,CardContent,Typography} from '@mui/material'
import Counter from './Counter'

function BasicCard({title,value}) {
  return (
    <Card sx={{ width:{sm: 270,xs:120},mt:2 ,borderRadius:'10px',maxHeight:160 ,textAlign:'center'}} >
      <CardContent centered>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
           <Counter number={value}/>
        </Typography>
        
      </CardContent>
     
    </Card>
    
  )
}

export default BasicCard