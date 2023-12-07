import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Container,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import UserContext from "../context/userContext";

function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [Error, setError] = useState(false);
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(loginData);
    Axios.post("https://expense-tracker-nalq.onrender.com/login", {
      email: loginData.email,
      password: loginData.password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "Inavalid Credentials") {
          setError(true);
          alert(res.data.msg);
        } else {
          console.log(res.data.data);
          setloginData({
            email: "",
            password: "",
          });

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...res.data.data,
             
        })
          );
          localStorage.setItem("token", res.data.token);
          const logedUser = JSON.parse(localStorage.getItem("user"));
          // console.log(typeof(logedUser[0].name));
          user.setuser({
            isLogin: true,
            isPremiumUser: logedUser.user.ispremiumuser,
            name: logedUser.user.name,
            id: logedUser.user.id,
            email: logedUser.user.email,
            budget: logedUser ? logedUser?.budget : 0,
            total_expense: logedUser ? logedUser?.totalExpense : 0,
            income: logedUser ? logedUser?.income : 0,
          });
          //  console.log(user.user);
          navigate("/userDash/home");
        }
      })
      .catch((err) => console.log(err));
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
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        alignItems="center"
        width={{ sm: 400, xs: 350 }}
        border="1px solid"
        borderColor={!Error ? "secondary.main" : "error.main"}
        py={3}
      >
        <AccountCircle sx={{ fontSize: 60, textAlign: "center" }} />
        <Typography variant="h5">Login</Typography>

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
                label="Email"
                name="email"
                color={"secondary"}
                onChange={handleChange}
                type="email"
                value={loginData.email}
                required
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                color="secondary"
                onChange={handleChange}
                value={loginData.password}
                required
              />
              <FormHelperText>
                <Link to={"/forgotPassword"}>Forgot Password?</Link>
              </FormHelperText>
              <Button
                variant="contained"
                sx={{ bgcolor: "secondary.main" }}
                type="submit"
              >
                Submit
              </Button>
              <FormHelperText sx={{ color: "white" }}>
                Don't have accout?{" "}
                <Link to="/signup" color="secondary">
                  Create new Accout
                </Link>
              </FormHelperText>
            </Stack>
          </form>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Login;
