import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from './BlogCard';
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tab,
  Tabs,
} from "@mui/material";

const UserBlogs = () => {

  const[user,setUser] = useState()
  
  const id = localStorage.getItem("userID");
  
  async function sendRequest (){
     
   const res =  await axios.get(`https://blog-app-bk.onrender.com/user/${id}`)
   .catch((err)=> console.log(err))
    
  //  console.log("responser",res)

    const data = await res.data;

    return data;

  }

  useEffect(()=>{
    
    sendRequest().then(data=> setUser(data.user))

  },[user])
  
//  console.log("blogs",user)
  return (

    <>
   
        {user && user.blogs && user.blogs.length > 0 ? (
            user.blogs.map((blog, index) => (
                <BlogCard
                    key={index}
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    desc={blog.description}
                    imgUrl={blog.image}
                    username={user.name}
                />
            ))
        ) : (
            <h1 >No blogs available for this user.</h1>
        )}
   
   {/* <h1>Particular blog - USERBLOG</h1> */}
    </>

  )
}

export default UserBlogs