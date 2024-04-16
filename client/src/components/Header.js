import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [value, setValue] = useState(0); 

  
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "crimson" }}> 
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}> 
          My Blog App
        </Typography>
        {isLogin && (
          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            textColor="inherit"
          >
            <Tab label="Blogs" component={Link} to="/blogs" />
            <Tab label="My Blogs" component={Link} to="/my-blogs" />
            <Tab label="Create Blog" component={Link} to="/create-blog" />
          </Tabs>
        )}
        <div>
          {!isLogin ? (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
