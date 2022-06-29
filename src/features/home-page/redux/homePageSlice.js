import {createSlice} from '@reduxjs/toolkit'
import {uid} from 'uid'

const initialState = {
  shouldRefetchOrders: '',
}

const homePageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    refetchOrders: (state) => {
      state.shouldRefetchOrders = uid()
    },
  },
})

export const {
  refetchOrders,
} = homePageSlice.actions

export default homePageSlice.reducer
