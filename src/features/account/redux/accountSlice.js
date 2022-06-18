import {createSlice} from '@reduxjs/toolkit'

const defaultUser = {
    _id: '',
    wallet_address: '',
    display_name: '',
    signature: '',
    balance: 0,
}

const initialState = {
  user: defaultUser,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {...state, user: action.payload}
    },
    resetUser: (state) => {
      return {...state, user: defaultUser}
    }
  }
})

export const { setUser, resetUser } = accountSlice.actions

export default accountSlice.reducer