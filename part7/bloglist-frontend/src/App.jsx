import { useEffect } from 'react'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Nav from './components/Nav'
import UserView from './components/UserView'
import OneUser from './components/OneUser'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { userFromBrowser } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(userFromBrowser())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const blogs = useSelector(state => state.blogs)
  
  return (
    <Container>
    <Router>
      <div>
        <Nav/>
        <Notification />
        <h2>blog app</h2>
      </div>
      <Routes>
        <Route path='/' element={<Navigate replace to='/blogs'/>} />
        <Route path='/blogs' element={<BlogView blogs={blogs}/>} />
        <Route path='/users' element={<UserView /*users={users}*//>} />
        <Route path='/users/:id' element={<OneUser /*users={users}*//>} />
        <Route path='/blogs/:id' element={<Blog blogs={blogs}/>} />
      </Routes>
    </Router>
    </Container>
  ) 
}

export default App