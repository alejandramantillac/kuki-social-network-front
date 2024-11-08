import axiosInstance from '../config/axiosConfig'
import { Pageable, Comment } from '../types/model'

const API_PATH = 'v1/comment'

const getComments = async (
  recipeId: string,
  page: number = 0,
  size: number = 10
): Promise<Comment[]> => {
  const response = await axiosInstance.get<Pageable<Comment>>(
    `${API_PATH}/recipe/${recipeId}`,
    {
      params: { page, size },
    }
  )
  return response.data.content
}

export default {
  getComments,
}
