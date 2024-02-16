import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../reducers/allUsersReducer"
import { Link } from "react-router-dom"

const UserView = () => {
  const dispatch = useDispatch()
  const users = useSelector(store => store.allUsers)



  console.log(users)
  return (
    <>
      <h3>Users</h3>
      <h4 className='container'><span>blogs created</span></h4>
      { users.map(user => <p key={user.id} className='container'><Link to={'/users/' + user.id}>{user.name}</Link><span>{user.blogs.length}</span></p>) }
    </>
  )
}

export default UserView