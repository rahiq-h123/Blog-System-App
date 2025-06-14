import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const CreateEditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [blogTitle, setTitle] = useState("");
  const [blogDescription, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const navigate = useNavigate();

  const imgbbAPIKey = "a532259cd1bf87c0a75843afd1d04007"; 

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setImgURL(data.imgURL);
          setTitle(data.blogTitle);
          setDesc(data.blogDescription);
        })
        .catch((err) => {
          console.error("Error fetching post", err);
          setErrorMessage("Failed to load post for editing");
        });
    }
  }, [id]);

  const uploadImageToImgBB = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleSubmitBlog = async () => {
    if (!blogTitle || !blogDescription || (!imgURL && !imageFile)) {
      setErrorMessage("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    let res;

    try {
      let finalImageURL = imgURL;

      if (imageFile) {
        finalImageURL = await uploadImageToImgBB();
        setImgURL(finalImageURL);
      }

      if (id) {
        const updatedPost = {
          ...post,
          imgURL: finalImageURL,
          blogTitle,
          blogDescription,
        };

        res = await fetch(`http://localhost:5000/posts/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        });
      } else {
        res = await fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imgURL: finalImageURL,
            blogTitle,
            blogDescription,
            userid: user.id,
            userName: user.username,
          }),
        });
      }

      if (res.ok) {
        navigate("/");
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong");
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
          width: 700,
        }}
      >
        <Typography variant="h4" color="#3f51b5">
          {id ? "Edit Blog" : "Create Blog"}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {imgURL && (
          <img
            src={imgURL}
            style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
          />
        )}

        <TextField
          fullWidth
          label="Blog Title"
          variant="outlined"
          value={blogTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Blog Description"
          variant="outlined"
          value={blogDescription}
          onChange={(e) => setDesc(e.target.value)}
        />
        <PrimaryButton
          value={id ? "Update" : "Submit"}
          onClick={handleSubmitBlog}
        />
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CreateEditPost;
