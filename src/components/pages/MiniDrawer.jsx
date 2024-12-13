import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ContactsIcon from "@mui/icons-material/Contacts";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ user }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log("Drawer opened");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    console.log("Drawer closed");
  };

  const handleSignOut = () => {
    // console.log(navOptions[5].handleLogout, "hhhhhhhhhhhhhhhhh");
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const navOptions = [
    { id: 1, link: "Home", path: "/dashboard/", icon: <OtherHousesIcon /> },
    {
      id: 2,
      link: "All Students",
      path: "/dashboard/allstudents",
      icon: <PeopleIcon />,
    },
    {
      id: 3,
      link: "Add Student",
      path: "/dashboard/addstudent",
      icon: <PersonAddAlt1Icon />,
    },
    {
      id: 4,
      link: "All Faculty",
      path: "/dashboard/allfaculty",
      icon: <PeopleIcon />,
    },
    {
      id: 5,
      link: "Add Faculty",
      path: "/dashboard/addfaculty",
      icon: <PersonAddIcon />,
    },
    {
      id: 6,
      link: "Logout",
      icon: <LogoutIcon />,
      functionToCall:  handleSignOut ,
    },

  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className="" open={open}>
        <Toolbar className="flex justify-between">
          <div className="hamburgericon flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="text-start" variant="h6" noWrap>
              Institute Management
            </Typography>
          </div>

          {/* Display user details */}
          <div className="userdet flex gap-8 items-center">
            {user ? (
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                Hello, {user.email}
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                Not Logged In
              </Typography>
            )}

            {/* Log Out Button */}
            <button
              onClick={handleSignOut}
              className="bg-red-600 p-3 rounded-xl"
            >
              Log Out
            </button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List sx={{backgroundColor:"#83edf0",color:"black"}}> */}
        <List >
          {navOptions.map((text) => (
            <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
              <NavLink to={text.path} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open && { justifyContent: "initial" },
                    !open && { justifyContent: "center" },
                  ]}
                  onClick={text.functionToCall}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      ...(open && { mr: 3 }),
                    }}
                  >
                    {text?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.link}
                    sx={{ ...(open ? { opacity: 1 } : { opacity: 0 }) }}
                   
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1,  marginTop: "" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
