import React from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import Grrocery from "../assets/images/icons8-grocery-50.png";
import Other from "../assets/images/icons8-cheque-50.png";
import BasicCard from "./Card";

function MonthReport({ data }) {
  console.log(data);
  const cat_wise_expense = (() => {
    const categoryOrder = [
        'investment',
        'bills_utilities',
        'transportation',
        'shopping',
        'grocery',
        'others'
    ];

    // Create a new object with categories mapped to total_expense (or 0 if not present)
    const resultObject = categoryOrder.reduce((acc, category) => {
        const categoryData = data.cat_distribution.find((e) => e.name === category);
        const totalExpense = categoryData ? categoryData.total_expense : 0;
        acc[category] = totalExpense;
        return acc;
    }, {});

    return resultObject;
})()

    console.log(cat_wise_expense);
  return (
    <>
      <Box width={{ sm: "80%", xs: "100%" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: { sm: 650, xs: 390 } }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.allExpenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell align="center">
                    {e.date.slice(0, 10).split("-").reverse().join("-")}
                  </TableCell>
                  <TableCell align="center">{e.amount}</TableCell>
                  <TableCell align="center">{e.description}</TableCell>
                  <TableCell align="center">{e.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">Insights Of Expense</Typography>
        <Box>
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 2 }}
            useFlexGap
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent="center"
          >
            <BasicCard title={"Total Expense"} value={data.total_expense} />
            <BasicCard
              title={"Total Budget"}
              value={data.savings_budget[0].total_budget}
            />
            <BasicCard
              title={"Savings"}
              value={data.savings_budget[0].total_savings}
            />
            <BasicCard
              title={"Income"}
              value={data.savings_budget[0].total_income}
            />
          </Stack>
        </Box>
        <Box sx={{ flexGrow: 1 }} mt={3}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
                  <Typography display={"flex"}>
                    <TrendingUpOutlinedIcon color="secondary" sx={{ mr: 1 }} />
                    Investments
                  </Typography>
                  <Typography>
                    Rs.{" "}
                    {cat_wise_expense.investment}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
                  <Typography display={"flex"}>
                    <ReceiptOutlinedIcon color="secondary" sx={{ mr: 1 }} />
                    Bills&Utility
                  </Typography>
                  <Typography>
                    Rs.
                    {cat_wise_expense.bills_utilities}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
                  <Typography display={"flex"}>
                    <CommuteOutlinedIcon color="secondary" sx={{ mr: 1 }} />
                    Transportation
                  </Typography>
                  <Typography>
                    Rs.
                    {cat_wise_expense.transportation}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
                  <Typography display={"flex"}>
                    <ShoppingBagOutlinedIcon color="secondary" sx={{ mr: 1 }} />
                    Shopping
                  </Typography>
                  <Typography>
                    Rs.
                    {cat_wise_expense.shopping}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={1}>
                  <Box display={"flex"}>
                    <img
                      src={Grrocery}
                      alt="grocery"
                      width={"20%"}
                      style={{ marginRight: "5%" }}
                    />
                    <Typography>Grocery</Typography>
                  </Box>
                  <Typography>
                    Rs.{" "}
                    {cat_wise_expense.grocery}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Box>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={1}>
                  <Box display={"flex"}>
                    <img
                      src={Other}
                      alt="other"
                      width={"20%"}
                      style={{ marginRight: "5%" }}
                    />
                    <Typography>Others</Typography>
                  </Box>
                  <Typography>
                    Rs.{" "}
                    {cat_wise_expense.others}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default MonthReport;
