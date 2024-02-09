import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();

  const id = useParams().id;

  const [blog, setBlog] = useState();

  const [inpts, setInpts] = useState({});

  function handleChange(e) {
    setInpts((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://blog-app-bk.onrender.com/blog/${id}`)
      .catch((err) => console.log("error in getting data", err));

    const data = await res.data;

    return data;
  };

  useEffect(() => {
    fetchDetails()
        .then((data) => {
        // console.log("Response Data:", data);
        setBlog(data.blog);
        setInpts({
          title: data.blog.title,
          description: data.blog.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        // Handle error as needed (e.g., set an error state)
      });
      
  }, [id]);

  //  console.log("blog is rendering",blog)

  //for updating the data
  const sendRequest = async () => {
    const res = await axios
      .put(`https://blog-app-bk.onrender.com/updateblog/${id}`,{
        title:inpts.title,
        description:inpts.description
      })
      .catch((err) => console.log("error in updating",err));

    const data = await res.data;

    return data;
  };

  function handleSubmit(e) {
    e.preventDefault();

    // console.log("inputs", inpts);
    sendRequest()
    .then(()=>navigate('/myblogs/'))
    // .then((data) => console.log("POSTING data",data))
  }

  return (
    <div>
      {inpts && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderRadius={10}
            borderColor="green"
            boxShadow={"10px 10px 20px #ccc"}
            padding={3}
            margin="auto"
            marginTop={2}
            marginBottom={2}
            display={"flex"}
            flexDirection={"column"}
            width={"60%"}
            // height={'700px'}
          >
            <Typography
              fontWeight={"bold"}
              padding={1}
              color={"black"}
              variant="h2"
              textAlign="center"
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inpts.title}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inpts.description}
            />

            <Button
              variant="contained"
              width={"10"}
              sx={{ marginTop: 2, borderRadius: 10 }}
              color="warning"
              type="Submit"
            >
              Update Post
            </Button>
          </Box>
        </form>
      )}
   
      {/* <h1>BLOG detail - EDIT</h1> */}

    </div>
  );
};

export default BlogDetail;
