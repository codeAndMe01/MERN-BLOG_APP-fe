import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Avatar,
  Box,
  Icon,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ username, imgUrl, desc, title, isUser, id }) => {
   const navigate = useNavigate()
    
  //  console.log("id",id)

   function handleEdit(e){
    navigate(`/myblogs/${id}`)
   }

   async function delRequest(){
     
    // console.log(id)
     const res = await axios.delete(`https://blog-app-bk.onrender.com/blog/${id}`).catch((err)=>console.log("Unable to del",err))
     
     const data = await res.data;

     return data;

   }

   function handleDel(e){
    
    

    delRequest()
    .then((data)=>console.log("deleted data",data))
    .then(()=>navigate('/myblogs/'))

   }
  

  // console.log("checking", title, id);
  return (
    <>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "15px 15px 25px #ccc",
          },
        }}
      >
        {isUser && (
          <>
            <Box display={"flex"}>
              <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDel} >
                <DeleteIcon />{" "}
              </IconButton>
            </Box>
          </>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {username.slice(0, 1)}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={
            imgUrl ||
            "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5zcGFsc2h8ZW58MHx8MHx8fDA%3D"
          }
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b> {username} </b> {":"} {desc}
          </Typography>
          <br />
          <hr />
          <br />
        </CardContent>
      </Card>
    </>
  );
};

export default BlogCard;
