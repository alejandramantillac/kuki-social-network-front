import axiosInstance from '../config/axiosConfig'
import { PostFilter } from '../types/filter'
import { Pageable, Recipe } from '../types/model'

const API_PATH = 'v1/recipes'

const getPosts = async (
  filter?: PostFilter,
  page: number = 0,
  size: number = 10
): Promise<Recipe[]> => {
  const response = await axiosInstance.get<Pageable<Recipe>>(API_PATH, {
    params: { ...filter, page, size },
  })
  return response.data.content
}

export default {
  getPosts,
}
