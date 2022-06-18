import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '~/api/axiosClient'
import userAPI from '~/api/userAPI'
import {setUser} from '~/features/account/redux/accountSlice'

class AccountThunk {
  updateUser = createAsyncThunk(
    'user/update',
    async (user, thunkAPI) => {
      const responseUser = await axiosClient.put(userAPI.update(user['_id']), user)
      thunkAPI.dispatch(setUser(responseUser))
      return responseUser
    }
  )
}

const accountThunk = new AccountThunk()
export default accountThunk