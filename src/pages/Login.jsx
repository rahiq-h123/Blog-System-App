import React from 'react'
import { Box, TextField, Typography } from "@mui/material";
import SecButton from '../components/SecButton';
import PrimaryButton from '../components/PrimaryButton';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and Password are required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/');
      }
      else {
        setErrorMessage(data);
      }
    }
    catch (error) {
      console.error(error);   
    }
  }

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
          Login
        </Typography>
        
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton value="Login" onClick={handleLogin}/>
        {errorMessage && (<Typography color="error" variant="body"> {errorMessage}</Typography>)}
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>You don't have an account?</Typography>

          <SecButton value="SignUp" />
        </Box>
      </Box>
    </div>
  );
}

export default Login
