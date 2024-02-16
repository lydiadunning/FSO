import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: ( state, action ) => action.payload,
    hideNotification: () => ''
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = ( notification, timeOnScreen=10) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => dispatch(hideNotification()), timeOnScreen * 1000)
  }
}

export default notificationSlice.reducer