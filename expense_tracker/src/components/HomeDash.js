import React, { useState, useEffect } from "react";
import BasicCard from "./Card";
import DoughnutChart from "./DoughnutChart";
import { Stack, Box, Typography, Backdrop } from "@mui/material";
import LineChart from "./LineChart";
import Axios from "axios";
import { useContext } from "react";
import UserContext from "../context/userContext";
import GridLoader from "react-spinners/GridLoader";

function HomeDash() {
  const user = useContext(UserContext);
  const [Looder, setLooder] = useState({
    load: false,
    open: false,
  });
  const [CatData, setCatData] = useState([]);
  const [MonthData, setMonthData] = useState([]);
  const Category_wise_expense = () => {
    setLooder({
      load: true,
      open: true,
    });
    Axios.get(`http://localhost:5000/getCatExpense/${user.user.id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setCatData(res.data.data);
        setLooder({
          load: false,
          open: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const getMonthData = async () => {
    const d = new Date();
    //  console.log( d.getMonth() + 1);
    const expense = await Axios.get(
      `http://localhost:5000/getAllExpenses/${user.user.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    //  console.log(expense);
    let temp = expense.data.data.filter((e) => {
      //  console.log(e.date.slice(5,7));
      //  console.log(e.date);
      let cdate =
        e.date.slice(5, 6) === 0 ? e.date.slice(6, 7) : e.date.slice(5, 7);
      if (parseInt(cdate) === d.getMonth() + 1) {
        return e;
      }
    });

    console.log(temp);
    setMonthData(temp);
    setLooder({
      load: false,
      open: false,
    });
  };

  useEffect(() => {
    Category_wise_expense();
    getMonthData();
    user.upDateLocalUser();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Looder.open}
      >
        <GridLoader loading={Looder.load} color="#7a5af5" />
      </Backdrop>
      <Stack
        direction="row"
        spacing={{ xs: 2, sm: 2 }}
        useFlexGap
        alignItems="center"
        height="30vh"
        justifyContent="center"
      >
        <BasicCard
          title={"Your Total Expense"}
          value={user.user.total_expense}
        />
        <BasicCard title={"Budget"} value={user.user.budget} />
        <BasicCard title={"Income"} value={user.user.income} />
      </Stack>
      <Stack
        width="100%"
        mt={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyItems="center"
        justifyContent="space-evenly"
      >
        {CatData.length > 0 ? (
          <Box
            width={{ sm: "40%", xs: "80%" }}
            height={{ sm: "70vh", xs: "55vh" }}
            sx={{ display: "flex", flexDirection: "column" }}
            alignItems={"center"}
            justifyContent="center"
            border="1px solid white"
            m={1}
          >
            <Typography variant="h6" m={3} textAlign={"center"}>
              Total Spending on Each Category
            </Typography>
            <DoughnutChart pdata={CatData} />
          </Box>
        ) : (
          <Typography variant="h6" m={3} textAlign={"center"}>
            Add expense to view data
          </Typography>
        )}
        {MonthData.length > 0 ? (
          <Box
            width={{ sm: "40%", xs: "80%" }}
            height={{ sm: "60vh", xs: "40vh" }}
            sx={{ display: "flex", flexDirection: "column" }}
            alignItems={"center"}
            border="1px solid white"
            m={1}
          >
            <Typography variant="h6" m={3} textAlign={"center"}>
              Day-To-Day Expenses in Current Month{" "}
            </Typography>
            <LineChart
              pdata={MonthData}
              lable={"Monthly Expense"}
              lable2=""
              second={true}
            />
          </Box>
        ) : (
          <Typography variant="h6" m={3} textAlign={"center"}>
            Add expense to view data
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default HomeDash;
