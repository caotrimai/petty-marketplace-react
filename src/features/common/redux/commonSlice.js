import {createSlice} from '@reduxjs/toolkit'
import {uid} from 'uid'

const toastInit = {
  message: '',
  status: 'default',
  uid: uid(),
}

const headerMessagesInit = [
  {
    id: uid(),
    message: 'Welcome',
    showTime: 3,
    type: 'default',
  },
]

const initialState = {
  toast: toastInit,
  headerMessages: headerMessagesInit,
}

const commonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toastMessage: (state, action) => {
      state.toast = {
        ...toastInit,
        message: action.payload,
        uid: uid(),
      }
    },
    resetToast: (state) => {
      state.toast = toastInit
    },
    addHeaderMessage: (state, action) => {
      state.headerMessages.push({
        id: uid(),
        type: action.payload.type || '',
        showTime: action.payload.showTime || 3,
        message: action.payload.message,
      })
    },
    decreaseMessageShowTime: (state, action) => {
      state.headerMessages = state.headerMessages
        .filter((message) => message.showTime > 1)
        .map(message => {
            message.showTime--
            return message
          },
        )
    },
  },
})

export const {
  toastMessage,
  resetToast,
  addHeaderMessage,
  decreaseMessageShowTime,
} = commonSlice.actions

export default commonSlice.reducer
