import React,{useState} from 'react'
import { Box, Typography, Stack, TextField, Button, FormControl, FormHelperText, Container } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link,useNavigate} from 'react-router-dom'
import Axios from "axios"
import { useContext } from 'react';
import UserContext from '../context/userContext';



function Login() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [loginData, setloginData] = useState({
        email:'',
        password:''
    })

    const  handleChange = (e)=>{
        setloginData({...loginData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        // console.log(loginData);
        Axios.post('http://localhost:5000/login',loginData).then((res)=>{
            // console.log(res.data.data[0].name);
            user.update(true,res.data.data[0].name,res.data.data[0].id)
            setloginData({
                email:'',
                password:''
            })
            navigate('/userDash/home')
        }).catch(err => console.log(err))
    }
    return (
        <Container
            sx={{
                height: '80vh',
                color: 'white',
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

            }} >
            <Box sx={{ display: 'flex', flexDirection: 'column' }} alignItems='center' width={{ sm: 400, xs: 350 }} border='1px solid' borderColor={'secondary.main'} py={3}>
                <AccountCircle sx={{ fontSize: 60, textAlign: 'center' }} />
                <Typography variant='h5'>
                    Login
                </Typography>

                <FormControl sx={{
                    width: '80%',
                    mt: 2,
                }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField variant='outlined' label="Email" name='email' color='secondary' onChange={handleChange} type='email' value={loginData.email} required/>
                        <TextField variant='outlined' label="Password" type="password" name='password' color='secondary' onChange={handleChange} value={loginData.password} required/>
                        <FormHelperText>Forgot Password?</FormHelperText>
                        <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Submit</Button>
                        <FormHelperText sx={{color:"white"}}>Don't have accout? <Link to='/signup' color='secondary'>Create new Accout</Link></FormHelperText>
                    </Stack>
                </form>
                </FormControl>
            </Box>
        </Container>
    )
}

export default Login