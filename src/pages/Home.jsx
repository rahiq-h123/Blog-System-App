import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import BlogPostCard from "../components/BlogPostCard";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
}); 

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/CreateEditPost"); 
    };
    
    const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:5000/posts/${id}`, {
          method: "DELETE",
        });
        setPosts((prev) => prev.filter((post) => post.id !== id));
      } catch (err) {
        console.error("Error deleting post", err);
      }
  };
  
    const handleEdit = (id) => {
      navigate(`/CreateEditPost/${id}`);
  };
  

    return (
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <NavBar />
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              image={post.imgURL}
              title={post.blogTitle}
              description={post.blogDescription}
              author={post.userName}
              userId={post.userid}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
          <ThemeProvider theme={theme}>
            {user && (
              <Fab
                color="primary"
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 24,
                  boxShadow: 4,
                }}
                onClick={handleAddClick}
              >
                +
              </Fab>
            )}
          </ThemeProvider>
        </Box>
      </div>
    );
};

export default Home;
