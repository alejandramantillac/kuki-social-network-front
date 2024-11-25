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

const deletePost = async (postId: string): Promise<void> => {
  await axiosInstance.delete(`${API_PATH}/${postId}`)
}

const getSavedPosts = async (): Promise<Pageable<Recipe>> => {
  const response = await axiosInstance.get<Pageable<Recipe>>(`${API_PATH}/save`)
  return response.data
}

const savePost = async (recipeId: string): Promise<void> => {
  await axiosInstance.post<void>(`${API_PATH}/save/${recipeId}`)
}

const unsavePost = async (recipeId: string): Promise<void> => {
  await axiosInstance.delete<void>(`${API_PATH}/save/${recipeId}`)
}

export default {
  getPosts,
  likeRecipe,
  unlikeRecipe,
  deletePost,
  getSavedPosts,
  savePost,
  unsavePost,
}
