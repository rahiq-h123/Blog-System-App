import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});


export default function PrimaryButton({ value, onClick}) {
  return (
    <ThemeProvider theme={theme}>
      <Button fullWidth variant="contained" color="primary" onClick={onClick}>
        {value}
      </Button>
    </ThemeProvider>
  );
};

