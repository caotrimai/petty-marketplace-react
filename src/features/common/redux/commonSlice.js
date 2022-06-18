import {createSlice} from '@reduxjs/toolkit'
import {uid} from 'uid'

const toastInit = {
  message: '',
  status: 'default',
  uid: uid()
}

const initialState = {
  toast: toastInit,
};

const commonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toastMessage: (state, action) => {
      state.toast = {
        ...toastInit,
        message: action.payload,
        uid: uid()
      };
    },
    resetToast: (state) => {
      state.toast = toastInit
    }
  },
});

export const { toastMessage, resetToast } = commonSlice.actions;


export default commonSlice.reducer;
