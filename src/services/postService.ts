import axiosInstance from '../config/axiosConfig'
import { PostFilter } from '../types/filter'
import { Pageable, Recipe, Like, DeleteResponse } from '../types/model'

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

const likeRecipe = async (recipeId: string): Promise<Like> => {
  const response = await axiosInstance.post<Like>(
    `${API_PATH}/${recipeId}/like`
  )
  return response.data
}

const unlikeRecipe = async (recipeId: string): Promise<DeleteResponse> => {
  const response = await axiosInstance.delete<DeleteResponse>(
    `${API_PATH}/${recipeId}/like`
  )
  return response.data
}

const getLikesOf = async (
  recipeId: string,
  page: number = 0,
  size: number = 10
): Promise<Pageable<Like>> => {
  const response = await axiosInstance.get<Pageable<Like>>(
    `${API_PATH}/${recipeId}/like`,
    {
      params: { page, size },
    }
  )
  return response.data
}

export default {
  getPosts,
  likeRecipe,
  unlikeRecipe,
  getLikesOf,
}
