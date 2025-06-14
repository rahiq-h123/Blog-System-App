import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function NavBar() {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#3f51b5",
          background: "#e8eaf6",
        }}
      >
        <Typography variant="h5" fontWeight="800">
          Blogify
        </Typography>

        {!user && (
          <Button variant="outlined" color="#3f51b5" onClick={handleLoginClick}>
            Login
          </Button>
        )}
        {user && (
          <Button variant="text" color="#3f51b5" onClick={handleLogoutClick}>
            Logout
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}

