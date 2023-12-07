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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Axios from "axios";

function ForgotPass() {
  const [ReseEmail, setReseEmail] = useState("");
  const [success, setsuccess] = useState(false);

  const handleChange = (e) => {
    setReseEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "https://expense-tracker-nalq.onrender.com/forgotPassword",
        {
          email: ReseEmail,
        }
      );

      if (res.status === 200) {
        setReseEmail("");
        setsuccess(true);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
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
        sx={{ display: !success ? "flex" : "none", flexDirection: "column" }}
        alignItems="center"
        width={{ sm: 400, xs: 350 }}
        border="1px solid"
        borderColor={"secondary.main"}
        py={3}
      >
        <Typography variant="h5">Resert Password</Typography>

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
                type="email"
                onChange={handleChange}
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
      <Box
        sx={{ display: success ? "flex" : "none", flexDirection: "column" }}
        alignItems="center"
        width={{ sm: 400, xs: 350 }}
        border="2px solid"
        borderColor={"success.main"}
        py={3}
      >
        <Typography variant="h5" alignItems={"center"} sx={{ display: "flex" }}>
          Successful{" "}
          <CheckCircleOutlineIcon sx={{ fontSize: 40 }} color="success" />
        </Typography>
        <Typography>Password Reset Link is sent to Your Email</Typography>
      </Box>
    </Container>
  );
}

export default ForgotPass;
