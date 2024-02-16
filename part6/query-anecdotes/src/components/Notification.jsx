import { useNotification } from '../NotificationContext'

const Notification = () => {
  const notification = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    visibility: notification === '' ? 'hidden' : 'visible'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
