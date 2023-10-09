import { Box, Container, TextField, FormControl, Typography, Button,  Grid, Stack,FormHelperText } from '@mui/material'
import  Axios  from 'axios'
import React ,{useState} from 'react'
import { useContext } from 'react';
import UserContext from '../context/userContext';

function Budget() {
    const user = useContext(UserContext)
    let cat 

    const makeJson = ()=>{
        const ids = [1000,1001,1002,1003,1004,1005]
        let index = 0
        const data = []
        for(let item in limits){
            console.log(limits[item]);
            let temp ={
                id : ids[index],
                climit:limits[item]
            }

            data.push(temp)
            index++
        }
        cat = JSON.stringify(data)
    } 
    const [budget, setbudget] = useState({
        budget:null,
        income:null,
        date:''
    })

    const [limits, setlimits] = useState({
        investment:null,
        billUtilities:null,
        transportation:null,
        shopping:null,
        grocery:null,
        others:null
    })

    const handleChange1 = (e)=>{
        setbudget({...budget,[e.target.name]:e.target.value})
    }
    const handleChange2 = (e)=>{
        setlimits({...limits,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        makeJson()
        Axios.post('http://localhost:5000/addBudget',{
            income:budget.income,
            budget:budget.budget,
            savings:budget.income-budget.budget,
            date :budget.date,
            uid : user.user.id,
            cat_id_limit:cat
        },{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        }).then(res =>{
            alert(res.data.msg)
            setbudget({
                budget:null,
                income:null,
                date:''
            })
            setlimits({
                investment:null,
                billUtilities:null,
                transportation:null,
                shopping:null,
                grocery:null,
                others:null
            })
        }).catch(err => console.log(err))
        user.updateUser()
    }
    return (
        <Container
            sx={{
                height: 'auto',
                color: 'white',
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }} >
             <Box textAlign={'center'} border={'1px solid'} borderColor={'secondary.main'} p={3} m={2} borderRadius={10}> 
                <Typography variant='h6'>
                    Suggetion*
                </Typography>
                <Typography variant='p'>
                Split your Income into three categories of spending: 50% on needs, 30% on wants, and 20% on savings.
                </Typography>
            </Box>   
            <Box sx={{ display: 'flex', flexDirection: 'column' }} alignItems='center' width={{ sm: 400, xs: 350 }} border='1px solid' borderColor={'secondary.main'} height={'auto'} py={3}>

                <Typography variant='h5'>
                    Budgeting
                </Typography>

                <FormControl sx={{
                    width: '90%',
                    mt: 2,
                }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField variant='outlined' label="Budget Limit For the Month" type='number' name='budget' color='secondary' value={budget.budget} required onChange={handleChange1} />
                            <TextField variant='outlined' label="Income" type="number" name='income' color='secondary' required value={budget.income} onChange={handleChange1}/>
                            <TextField variant='outlined'  type="date" name='date' color='secondary' required value={budget.date} onChange={handleChange1} />
                            <TextField variant='outlined' label="Savings" type="number" name='savings' color='secondary' value={budget.income-budget.budget}  />
            
                            <FormHelperText sx={{
                                fontStyle:'italic'
                            }}>Divide Your Budget Among all Categories And set Limit for each</FormHelperText>
                            <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Invetsment" type="number" name='investment' color='secondary' required value={limits.investment} onChange={handleChange2}/>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Bills & Utilities" type="number" name='billUtilities' color='secondary' required value={limits.billUtilities} onChange={handleChange2} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Transportation" type="number" name='transportation' color='secondary' required  value={limits.transportation} onChange={handleChange2}/>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Shopping" type="number" name='shopping' color='secondary' required value={limits.shopping} onChange={handleChange2} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Grocery" type="number" name='grocery' color='secondary' required value={limits.grocery} onChange={handleChange2} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} >
                                    <TextField variant='outlined' label="Other" type="number" name='others' color='secondary' required value={limits.others} onChange={handleChange2} />
                                </Grid>
                            </Grid>
                            </Box>
                            <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Add</Button>

                        </Stack>
                    </form>
                </FormControl>
            </Box>
        </Container>
    )
}

export default Budget