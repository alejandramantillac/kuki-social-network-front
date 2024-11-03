import axiosInstance from '../config/axiosConfig'

const API_PATH = 'v1/country'

type CountryResponse = {
  code: string
  name: string
}

const getCountries = async (): Promise<CountryResponse[]> => {
  const response = await axiosInstance.get<CountryResponse[]>(API_PATH)
  return response.data
}

export default {
  getCountries,
}
