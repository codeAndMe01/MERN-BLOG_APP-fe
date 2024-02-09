import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';

const Blogs = () => {
  
  const [blogs,setBlogs] =useState()

  const  sendRequest = async () =>{
     const res =  await axios.get('https://blog-app-bk.onrender.com/blogs')
                  .catch((err)=> console.log(err))

            //  console.log(res)     
          const data = res.data;

          return data;

       };

         

       useEffect(()=>{
          sendRequest().then((data)=>setBlogs(data.blogs)) 
          
       },[])
     
      //  console.log(blogs)

  return (
    <>
    {blogs && blogs.map((blog,index)=>
    <BlogCard key={index}
     id={blog._id}
     isUser = {localStorage.getItem("userID") === blog.user._id}  
    title={blog.title}
    desc={blog.description}
    imgUrl={blog.image}
    username={blog.user.name}

    />
    
    
    ) }
    
    {/* <h1>Alll blogs - BLOGS</h1> */}
   

    </>
  )
}

export default Blogs