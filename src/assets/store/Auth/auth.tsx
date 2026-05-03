import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

type SignUpPayload = {
  name: string
  login: string
  email: string
  password: string
}

export const fetchAuthSignUp = createAsyncThunk<any, SignUpPayload>(
  'auth/signUp',
  async (payload) => {
    console.log("Попал наконец");
    
    const response = await api.post('/auth/sign-up', payload)
    return response.data
  }
)

export const fetchAuthSignIn = createAsyncThunk(
  'auth/signIn',
  async (payload) => {
    const response = await api.post('/auth/signIn', payload)
    return response.data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 0,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthSignIn.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAuthSignIn.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchAuthSignIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

// export const { fetchAuthSignUp, fetchAuthSignIn, refreshToken } = authSlice.actions
export default authSlice.reducer