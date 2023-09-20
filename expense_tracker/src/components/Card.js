import React from 'react'
import {Card,CardContent,Typography} from '@mui/material'

function BasicCard() {
  return (
   
    <Card sx={{ width:{sm: 270,xs:120},mt:2 ,borderRadius:'10px',maxHeight:160}} >
      <CardContent centered>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          what is this
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        
      </CardContent>
     
    </Card>
    
  )
}

export default BasicCard