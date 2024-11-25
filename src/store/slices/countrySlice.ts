import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import countryService from '../../services/countryService'

interface CountryState {
  countries: { code: string; name: string }[]
  loading: boolean
  error: string | null
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
}

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const data = await countryService.getCountries()
    return data
  }
)

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<{ code: string; name: string }[]>) => {
          state.countries = action.payload
          state.loading = false
        }
      )
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch countries'
      })
  },
})

export default countrySlice.reducer
