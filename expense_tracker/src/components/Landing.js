import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import poster from '../assets/images/Manage money-amico.png'
import { Send } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext ,useEffect} from 'react';
import UserContext from '../context/userContext';

function Landing() {
    const user = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem('token')){
      user.upDateLocalUser()
    }
  },[])
    return (
        <Container sx={{
           width: '100%', display: 'flex', height: '90vh', mt: 1, color: 'white', justifyContent: 'center', alignItems: 'center'
        }}>
            <Stack direction={{xs:'column-reverse',sm:'row'}} spacing={{sm:2,xs:1}}>

                <Box width={{sm:"70%",xs:'100%'}}>
                    <Typography variant='h4' mb={4}>
                        "Budgeting isn't about restricting yourself; it's about giving yourself the freedom to spend guilt-free."
                    </Typography>
                    <Typography variant='p' display={{xs:'none',sm:'block'}}>
                        <b>BudgetBuddy </b>is your financial ally. This app helps you monitor spending, stay within budget, and make informed decisions, ultimately bringing clarity and control to your financial life. It serves as a powerful tool for individuals and households, offering a clear window into your financial habits and enabling you to make informed decisions. With BudgetBuddy, you can record and categorize your expenses, track income sources, and monitor your financial health over time. It's like having a trusted companion on your financial journey, guiding you towards a more secure and prosperous future.
                    </Typography>
                    <Box m={3}>
                        <Button variant='contained' color='secondary' endIcon={<Send/>}><Link to='/login'>Get Started</Link></Button>
                    </Box>
                </Box>
                <Box width={{sm:'30%',xs:'100%'}} alignItems={'center'} justifyContent={'center'} display={'flex'} >
                    <img src={poster} alt="poster" width='80%' />
                </Box>
            </Stack>
        </Container>
    )
}

export default Landing