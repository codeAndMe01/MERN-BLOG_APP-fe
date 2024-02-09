import React, { useState } from "react";
import { Typography,Box,Button, TextField} from "@mui/material";

import axios from 'axios'
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  
  const navigate = useNavigate()
  const dispatch= useDispatch()

  const [inpts , setInpts] = useState({
    name:"", email:"", password:""
  })


  const [isSignUp, setSignUp] = useState(false);

  function handleInpts(e){
    setInpts((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  async function sendRequest(type='login'){
    const res = await axios.post(`https://blog-app-bk.onrender.com/${type}`,{
      name:inpts.name,
      email: inpts.email,
      password : inpts.password
     }).catch((err) => console.log("Reqst error" , err))
  
    //  console.log(res)

     const data = await res.data;
     
     return data;

  }

  function handleSubmit(e){
    e.preventDefault()
    
    // console.log(inpts)
 
    if(isSignUp){
      sendRequest('signup')
      .then((data)=> localStorage.setItem("user",data.user._id)) //setting user ID in local storage
      .then(() => dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      // .then((data) => console.log(data))
    }
    else{
      //no parameter cause type is by default login
      sendRequest()
      .then((data)=> localStorage.setItem("userID",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      // .then((data) => console.log(data) )
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={"400px"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          // padding={3}
          margin={"auto"}
          marginTop={3}
          marginBottom={3}
          borderRadius={3}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
           {isSignUp ?  "SignUp" : "Login" }
          </Typography>

          {isSignUp && <TextField name="name" onChange={handleInpts} value={inpts.name} placeholder="Name" margin="normal" />}{" "}

          <TextField onChange={handleInpts} name="email" value={inpts.email}  placeholder="Email" type={"email"} margin="normal" />

          <TextField onChange={handleInpts} name="password" value={inpts.password}  placeholder="Password" type={"password"} margin="normal" />
          
          <Button type="Submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
          >
             {isSignUp ? "Alreday have an account? Login" : "Dont have account? SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
