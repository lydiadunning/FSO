import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((store) => store.notifications)
  const classes = notification?.isError ? 'error message' 
                : notification.text && notification.text !== '' ? 'message' 
                : 'hidden'

  return (
    <div className={classes}>
      { notification && notification.text }
    </div>
  )
}

export default Notification