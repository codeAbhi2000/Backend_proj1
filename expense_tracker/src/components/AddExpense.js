import { Box, Container, TextField, FormControl, Typography ,Button,MenuItem,Select,InputLabel,Stack} from '@mui/material'
import React from 'react'

function AddExpense() {
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
                    Add Your Expense
                </Typography>

                <FormControl sx={{
                    width: '80%',
                    mt: 2,
                }}>
                    <form >
                        <Stack spacing={2}>
                            <TextField variant='outlined' label="Description" name='description' color='secondary' type='text' required />
                            <TextField variant='outlined' label="Amount" type="number" name='amount' color='secondary' required />
                            <label htmlFor="date">Date</label>
                            <TextField variant='outlined' id='date' type="date" name='date' color='secondary' required />
                            <label htmlFor="demo-simple-select">Category</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label='category'
                            >
                                <MenuItem value={10}>Investment</MenuItem>
                                <MenuItem value={20}>Bills & Utilities</MenuItem>
                                <MenuItem value={30}>Transportation</MenuItem>
                                <MenuItem value={30}>Shopping</MenuItem>
                                <MenuItem value={30}>Grocery</MenuItem>
                                <MenuItem value={30}>Others</MenuItem>
                            </Select>
                            <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Add</Button>

                        </Stack>
                    </form>
                </FormControl>
            </Box>
        </Container>
    )
}

export default AddExpense