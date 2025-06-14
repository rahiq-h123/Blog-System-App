import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

const SecButton = ({ value }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${value}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="text" onClick={handleClick}>
        {value}
      </Button>
    </ThemeProvider>
  );
};

export default SecButton;
