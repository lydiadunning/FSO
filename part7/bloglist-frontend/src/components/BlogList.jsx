import {Link as RouterLink} from 'react-router-dom'
import List from '@mui/material/List'
import { ListItemButton, ListItemText } from "@mui/material";
import Paper from '@mui/material/Paper';

const BlogList = ({blogs}) => {
  // const blogs = useSelector(store => store.blogs)

  return blogs ? (

    <List component={Paper}>
      { blogs
      .toSorted((a, b) => {
        return b.likes - a.likes 
      })
      .map(blog =>
        <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`} key={blog.id}>
          <ListItemText primary={blog.title + ' - ' + blog.author} />
        </ListItemButton>
      )}
    </List>
  ) : (
    <p>No Blogs - The List is Empty!</p>
  )
}

export default BlogList