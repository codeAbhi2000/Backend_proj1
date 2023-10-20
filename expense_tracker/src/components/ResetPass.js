import React, { useState } from 'react'
import { Box, Typography, Stack, TextField, Button, FormControl, Container } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

function ResetPass() {
    const { uid } = useParams()
    const navigate = useNavigate()
    const [passwords, setpasswords] = useState({
        password: '',
        cfm_password: ''
    })

    const handleChange = (e) => {
        setpasswords({ ...passwords, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('started');

        if (passwords.password === passwords.cfm_password)
        {
            const response = await Axios.post('http://3.109.94.251:5000/resetPassword', {
                uid,
                pass: passwords.password
            })

            if (response.status === 200)
            {
                alert(response.data.msg)
                navigate('/login')
            }
        } else
        {
            alert('Both Passwords should be same')
            setpasswords({
                password: '',
                cfm_password: ''
            })
        }



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

                <Typography variant='h5'>
                    Resert Password
                </Typography>

                <FormControl sx={{
                    width: '80%',
                    mt: 2,
                }}>
                    <form onSubmit={handleSubmit} >
                        <Stack spacing={2}>
                            <TextField variant='outlined' label="Password" name='password' color={'secondary'} value={passwords.password} type='password' onChange={handleChange} required />
                            <TextField variant='outlined' label="Confirm Password" name='cfm_password' color={'secondary'} value={passwords.cfm_password} type='text' onChange={handleChange} required />
                            <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Submit</Button>
                        </Stack>
                    </form>
                </FormControl>
            </Box>

        </Container>
    )
}

export default ResetPass