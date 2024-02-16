import LoginForm from "./LoginForm"
import { Link, useLocation } from "react-router-dom"
import { Stack, Tab, Tabs } from "@mui/material";

const Nav = () => {
  const location = useLocation()
  const currentTab = location.pathname.slice(0, 6)

  return (
    <Stack direction='row' spacing={2} justifyContent="space-between">
      <Tabs value={currentTab}>
        <Tab label="Blogs" value="/blogs" to="/blogs" component={Link} />
        <Tab label="Users" value="/users" to="/users" component={Link} />
      </Tabs>
      <LoginForm />
    </Stack>
  )
}

export default Nav