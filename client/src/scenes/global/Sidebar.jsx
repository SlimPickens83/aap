import { useState, useContext } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import StateContext from "../../StateContext"
import { tokens } from "../../theme"
import InboxIcon from "@mui/icons-material/Inbox"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import dashPic from "../../assets/user.png"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem active={selected === title} href={to} style={{ color: colors.grey[100] }} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      {/* <Link to={linkTo} /> */}
    </MenuItem>
  )
}

function Side() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("MainDashboard")
  const appState = useContext(StateContext)
  let currentUser
  const currentUserFind = () => {
    if (appState.initialReg || appState.user.token) {
      currentUser = appState.user.username
    } else if (appState.initialReg === false) {
      currentUser = appState.user.data.username
    }
  }

  currentUserFind()

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "black !important"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "% .pro-inner-item": {
          padding: "5px 35px 5px 20px !important"
        },
        "& .pro-innner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        }
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  {appState.admin ? "ADMIN" : appState.accountAuth ? "CLIENT" : "EMPLOYEE"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img alt="profile-user" width="100px" height="100px" src={dashPic} style={{ cursor: "pointer", borderRadius: "50%" }} />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  {currentUser}
                </Typography>
                {/* This field should dynamically be populated with the associated client business (i.e. Acme Construction, Acme Dental, etc.) */}
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Guest Admin
                </Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/Dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Inbox" to="/Dashboard/inbox" icon={<InboxIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography>
            <Item title="Manage Users" to="/Dashboard/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Contacts Information" to="/Dashboard/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Client List" to="/Dashboard/invoices" icon={<ViewListOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Pages
            </Typography>
            <Item title="Add Client" to="/Dashboard/addClient" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/Dashboard/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="FAQ Page" to="/Dashboard/faq" icon={<HelpOutlinedIcon />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default Side
