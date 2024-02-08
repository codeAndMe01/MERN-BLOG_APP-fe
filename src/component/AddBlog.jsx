import React, { useState } from "react";
import { Box, Typography, InputLabel, TextField,Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyles = {mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}

const AddBlog = () => {
   
  const navigate = useNavigate()

  const [inpts , setInpts] = useState({
    title:"", description:"", imageURL:""
  })

  const  sendRequest = async ()=>{
     const res = await axios.post('https://blog-app-bk.onrender.com/addblog',{
              title:inpts.title,
              description:inpts.description,
              image:inpts.imageURL,
              user:localStorage.getItem("userID")
     }).catch(((err)=>console.log(err)))

     const data = await res.data;

     return data;
  }

  function handleChange(e){
    setInpts((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  function handleSubmit(e){

     e.preventDefault();
    //  console.log("inputs",inpts)

    sendRequest().then(()=>navigate('/myblogs/'))
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderRadius={10}
          borderColor="green"
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin='auto'
          marginTop={2}
          marginBottom={2}
          display={"flex"}
          flexDirection={"column"}
          width={"60%"}
          // height={'700px'}
        >
          <Typography fontWeight={'bold'} padding={1} color={'black'} variant="h2" textAlign='center'>Post Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inpts.title}/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inpts.description} />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inpts.imageURL} />
          <Button variant="contained" width={'10'}
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning" type="Submit">Post</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
