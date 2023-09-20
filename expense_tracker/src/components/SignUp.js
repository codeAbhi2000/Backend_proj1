import React from 'react'
import { Box, Typography, Stack, TextField, Button, FormControl, FormHelperText, Container } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';

function SignUp() {
    return (
        <Container 
        sx={{
            height:'80vh',
            color:'white',
            display:'flex',
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
          
            }} >
        <Box sx={{display:'flex',flexDirection:'column'}}  alignItems='center' width={{sm:400,xs:350}} border='1px solid' borderColor={'secondary.main'} py={3}>
            <AccountCircle sx={{fontSize:60,textAlign:'center'}}/>
            <Typography variant='h5'>
                Sign Up
            </Typography>
            <FormControl sx={{
                width:'80%',
                mt:2
            }}>
                <Stack spacing={2}>
                    <TextField variant='outlined' label="Name" name='name' color='secondary'/>
                    <TextField variant='outlined' label="Email" name='email'  color='secondary' />
                    <TextField variant='outlined' label="Password" type="password" name='password'  color='secondary'/>
                    <Button variant='contained' sx={{bgcolor:'secondary.main'}}>Submit</Button>
                </Stack>
            </FormControl>
        </Box>
    </Container>
    )
}

export default SignUp