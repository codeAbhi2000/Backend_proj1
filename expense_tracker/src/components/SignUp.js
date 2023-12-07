import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  Container,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setsignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(signupData);
    Axios.post("https://expense-tracker-nalq.onrender.com/signup", signupData)
      .then((res) => {
        console.log(res);
        if (res.data.msg === "User Already Exixst") {
          alert(res.data.msg);
        } else {
          alert(res.data.msg);
          navigate("/login");
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
        borderColor={"secondary.main"}
        py={3}
      >
        <AccountCircle sx={{ fontSize: 60, textAlign: "center" }} />
        <Typography variant="h5">Sign Up</Typography>
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
                label="Name"
                name="name"
                color="secondary"
                onChange={handleChange}
                value={signupData.name}
                required
              />
              <TextField
                variant="outlined"
                label="Email"
                name="email"
                color="secondary"
                type="email"
                onChange={handleChange}
                value={signupData.email}
                required
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                color="secondary"
                onChange={handleChange}
                value={signupData.password}
                required
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "secondary.main" }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </FormControl>
      </Box>
    </Container>
  );
}

export default SignUp;
