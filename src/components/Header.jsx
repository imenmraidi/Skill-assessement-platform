import React, { useState, Component } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import NavHome from "./Nav";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { Avatar, Typography } from "@mui/joy";
import logo from "../images/logo_soft2.png";
import { logout } from "../redux/slices/authSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./editProfile";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, authStatus } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={logo}
          sx={{ width: 38, height: 38, m: 1 }}
          variant="plain"
        />

        <Button onClick={() => navigate("/recruiter")}>
          <Typography level="body2" textColor="neutral.100" sx={{ m: 1 }}>
            Dashboard
          </Typography>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography level="body1" textColor={"#ffff"}>
          {user?.fullname}
        </Typography>
        <div className="profileMenu">
          <IconButton
            size="small"
            id="menubutton"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={event => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <Avatar variant="soft" size="sm" />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
            MenuListProps={{
              "aria-labelledby": "menubutton",
            }}
          >
            <MenuItem>
              <EditProfile />
            </MenuItem>
            <MenuItem>
              <Button
                variant="plain"
                sx={{ textTransform: "none" }}
                fullWidth
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Deconnexion
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
