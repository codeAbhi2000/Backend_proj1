import {
  Box,
  Container,
  TextField,
  FormControl,
  Typography,
  Button,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import UserContext from "../context/userContext";

function AddExpense() {
  const user = useContext(UserContext);
  const [ExpenseData, setExpenseData] = useState({
    description: "",
    amount: null,
    date: "",
    cat_id: null,
  });

  const handleChange = (e) => {
    setExpenseData({ ...ExpenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(localStorage.getItem('token'));
    // console.log(ExpenseData);
    Axios.post(
      "https://expense-tracker-nalq.onrender.com/addExpense",
      {
        description: ExpenseData.description,
        date: ExpenseData.date,
        amount: ExpenseData.amount,
        uid: user.user.id,
        cat_id: ExpenseData.cat_id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        alert(res.data.msg);
        setExpenseData({
          description: "",
          amount: null,
          date: "",
          cat_id: null,
        });
      })
      .catch((err) => console.log(err));
    user.updateUser();
  };
  return (
    <Container
      sx={{
        height: "80vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: { sm: 6, xs: 0 },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        alignItems="center"
        width={{ sm: 400, xs: 350 }}
        border="1px solid"
        borderColor={"secondary.main"}
        py={3}
      >
        <Typography variant="h5">Add Your Expense</Typography>

        <FormControl
          sx={{
            width: "80%",
            mt: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Description"
                name="description"
                color="secondary"
                type="text"
                value={ExpenseData.description}
                required
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Amount"
                type="number"
                name="amount"
                color="secondary"
                value={ExpenseData.amount}
                required
                onChange={handleChange}
              />
              <label htmlFor="date">Date</label>
              <TextField
                variant="outlined"
                id="date"
                type="date"
                name="date"
                value={ExpenseData.date}
                color="secondary"
                required
                onChange={handleChange}
              />
              <label htmlFor="demo-simple-select">Category</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="category"
                name="cat_id"
                value={ExpenseData.cat_id}
                onChange={handleChange}
              >
                <MenuItem value={"investment"}>Investment</MenuItem>
                <MenuItem value={"bills_utilities"}>Bills & Utilities</MenuItem>
                <MenuItem value={"transportation"}>Transportation</MenuItem>
                <MenuItem value={"shopping"}>Shopping</MenuItem>
                <MenuItem value={"grocery"}>Grocery</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
              <Button
                variant="contained"
                sx={{ bgcolor: "secondary.main" }}
                type="submit"
              >
                Add
              </Button>
            </Stack>
          </form>
        </FormControl>
      </Box>
    </Container>
  );
}

export default AddExpense;
