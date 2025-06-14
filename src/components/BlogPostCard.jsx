import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router";


const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});  

const BlogPostCard = ({ image, title, description, author, userId , id, handleDelete, handleEdit}) => {
  
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?.id === userId;


  return (
    <Card sx={{ m: 4, mt: 10, boxShadow: 2, width: 700 }}>
      <CardMedia component="img" height="100" image={image} alt={title} />

      <CardContent>
        <Typography gutterBottom variant="h6" color="#3f51b5">
          {title}
        </Typography>

        <Typography variant="body" color="text.secondary">
          {description}
        </Typography>

        <Box mt={2} display="flex" justifyContent={"space-between"}>
          <Typography variant="caption" color="text.secondary">
            By {author}
          </Typography>
          {isOwner && (
            <Box display="flex" gap={1}>
              <IconButton color="error" onClick={() => handleDelete(id)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              <ThemeProvider theme={theme}>
                <IconButton color="primary" onClick={() => handleEdit(id)}>
                  <EditOutlinedIcon />
                </IconButton>
              </ThemeProvider>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default BlogPostCard

