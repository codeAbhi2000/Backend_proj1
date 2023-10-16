import React, { useState } from 'react'
import { Box, Typography, Stack, TextField, Button, FormControl, FormHelperText, Container } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom'
import Axios from "axios"
import { useContext } from 'react';
import UserContext from '../context/userContext';



function Login() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [Error, setError] = useState(false)
    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {

        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        // console.log(loginData);
        Axios.post('http://localhost:5000/login',{
            email:loginData.email,
            password:loginData.password
        }).then((res)=>{
            // console.log(res.data);
            if(res.data.msg === 'Inavalid Credentials'){
                setError(true)
                alert(res.data.msg)
            } else
            {
                console.log(res.data.data);
                setloginData({
                    email: '',
                    password: ''
                })

                localStorage.setItem('user', JSON.stringify([...res.data.data[0], ...res.data.data[1], ...res.data.data[2]]))
                localStorage.setItem('token', res.data.token)
                const logedUser = JSON.parse(localStorage.getItem('user'))
                // console.log(typeof(logedUser[0].name));
                user.setuser(
                    {
                        isLogin: true,
                        isPremiumUser: logedUser[0].ispremiumuser,
                        name: logedUser[0].name,
                        id: logedUser[0].id,
                        email: logedUser[0].email,
                        budget: logedUser[2] ? logedUser[2].budget : 0,
                        total_expense: logedUser[1] ? logedUser[1].total_expense : 0,
                        income: logedUser[2] ? logedUser[2].income : 0
                    }
                )
                //  console.log(user.user);
                navigate('/userDash/home')

            }
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
            <Box sx={{ display: 'flex', flexDirection: 'column' }} alignItems='center' width={{ sm: 400, xs: 350 }} border='1px solid' borderColor={!Error ? 'secondary.main' : 'error.main'} py={3}>
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
                            <TextField variant='outlined' label="Email" name='email' color={'secondary'} onChange={handleChange} type='email' value={loginData.email} required />
                            <TextField variant='outlined' label="Password" type="password" name='password' color='secondary' onChange={handleChange} value={loginData.password} required />
                            <FormHelperText><Link to={'/forgotPassword'}>Forgot Password?</Link></FormHelperText>
                            <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Submit</Button>
                            <FormHelperText sx={{ color: "white" }}>Don't have accout? <Link to='/signup' color='secondary'>Create new Accout</Link></FormHelperText>
                        </Stack>
                    </form>
                </FormControl>
            </Box>
        </Container>
    )
}

export default Login