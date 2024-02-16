import { loginUser, logoutUser } from "../reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { FormControl, InputLabel, OutlinedInput, Box, Button, Stack } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleLogin = async (event) => {
    event.preventDefault()
  
    dispatch(loginUser({
      username, password
    })).then(x => {
      setUsername('')
      setPassword('')
      dispatch(setNotification({text: `${username} logged in`, isError: false}))
    }).catch(exception => {
    dispatch(setNotification({text: 'Wrong credentials', isError: true}))
    })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(setNotification({text: `User logged out`, isError: false}))
  }

  return (
    user ? 
      <Box sx={{ p:2 }}>
        <Stack direction='row' spacing={2} justifyContent="space-between">
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
        </Stack>
      </Box>
    : <Box /*sx={{ p: 2 }}*/>
        <form onSubmit={handleLogin}>
          <FormControl>
            <InputLabel>username</InputLabel>
                  <OutlinedInput
                  label="username"
                  type='text'
                  value={username}
                  name="Username"
                  id="username"
                  onChange={({ target }) => setUsername(target.value)}
                />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
              <OutlinedInput
                label="password"
                type='password'
                value={password}
                name="Password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </FormControl>   
            
          <Button sx={{ p:2 }} type="submit">login</Button>
        </form>      
      </Box>
  )
}

export default LoginForm