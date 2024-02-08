import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch()
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const [value, setValue] = useState(0);
 
  // console.log("login",isLoggedIn)

  function handleValue(e,val){
    
    setValue(val)
    // if(!isLoggedIn){
    //    val = 0
    //   }else{
    //   setValue(val)
    // }


  }

  return (
    <AppBar position="sticky" sx={{ background: "green" }}>
      <Toolbar>
        <Typography LinkComponent={Link} to="/">
          {" "}
          BlogsApp
        </Typography>

       {isLoggedIn &&  <> <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={handleValue}
          >
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box> </>}

        <Box display="flex" marginLeft="auto">
        {!isLoggedIn && <>  <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Login
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Signup
          </Button> </>}
          {isLoggedIn && <Button
           onClick={() => dispatch(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
