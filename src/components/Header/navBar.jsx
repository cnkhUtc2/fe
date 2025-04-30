import React, { useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import styles from "/src/styles/Navbar.module.css";
import SearchAppBar from "./searchBar";
import logoFinal from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../Pages/admin/Dashboard";
import UserContext from "../../../UserContext";

const pages = [
  { name: "Donate", path: "/donate" },
  { name: "Get Help", path: "/help" },
  { name: "Community", path: "/post" },
  { name: "Stories in Photos", path: "/stories" },
  { name: "About Us", path: "/about" },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [showAdminModal, setShowAdminModal] = React.useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.roleId === "667940bbf2b6c4781339f664");
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    ...(isAdmin
      ? [{ name: "Dashboard", action: () => setShowAdminModal(true) }]
      : []),
    { name: "Logout", action: () => handleLogout() },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleMenuClick = (setting) => {
    if (setting.action) {
      setting.action();
    } else {
      navigate(setting.path);
    }
  };

  return (
    <>
      <AppBar position="block">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div
              onClick={() => {
                navigate("/"), window.location.reload();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logoFinal}
                alt="Logo"
                style={{ width: "80px", height: "auto", borderRadius: "100%" }}
              />
            </div>
            <Typography
              onClick={() => {
                navigate("/"), window.location.reload();
              }}
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AidBridge
            </Typography>

            <Box
              className={styles.menuItemNavbar}
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  alignItems: "center",
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => navigate(page.path)}>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    color: "white",
                    display: "block",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <SearchAppBar />
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 1 }}>
                    {isAdmin ? "Hello Admin, " : "Hello User, "}
                  </Typography>
                  <Tooltip title="Open settings" open={open} arrow>
                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                      <Avatar
                        alt="User Avatar"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Button variant="contained" onClick={handleLoginClick}>
                  Đăng nhập
                </Button>
              )}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      handleCloseUserMenu();
                      handleMenuClick(setting);
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showAdminModal && (
        <AdminDashboard
          open={showAdminModal}
          onClose={() => setShowAdminModal(false)}
        />
      )}
    </>
  );
}

export default ResponsiveAppBar;
