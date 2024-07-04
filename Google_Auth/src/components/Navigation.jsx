import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Menu } from "antd";

function Navigation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Menu mode="horizontal" theme="dark" style={{ lineHeight: "64px" }}>
      <Menu.Item key="home" style={{ marginLeft: "30px" }}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {user ? (
        <Menu.Item
          key="logout"
          onClick={handleLogout}
          style={{ marginLeft: "87vw" }}
        >
          Logout
        </Menu.Item>
      ) : (
        <>
          
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/signup">Signup</Link>
          </Menu.Item>
         
        </>
      )}
    </Menu>
  );
}

export default Navigation;
