import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import SecButton from "../components/SecButton";
import PrimaryButton from "../components/PrimaryButton";

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User registered successfully!");
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 5,
          boxShadow: 2,
          p: "24px",
          width: 500,
        }}
      >
        <Typography variant="h4" color="#3f51b5">
          Sign Up
        </Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton value="SignUp" onClick={handleSignUp} />

        {errorMessage && (
          <Typography color="error" variant="body">
            {" "}
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Do you have an account?</Typography>
          <SecButton value="Login" />
        </Box>
      </Box>
    </div>
  );
};

export default SignUp;
