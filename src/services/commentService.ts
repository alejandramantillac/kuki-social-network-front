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

const addComment = async (
  recipeId: string,
  commentRequest: { content: string; parentCommentId?: string }
): Promise<Comment> => {
  const response = await axiosInstance.post<Comment>(
    `${API_PATH}/recipe/${recipeId}`,
    commentRequest
  )
  return response.data
}

const editComment = async (
  commentId: string,
  commentRequest: { content: string }
): Promise<Comment> => {
  const response = await axiosInstance.put<Comment>(
    `${API_PATH}/${commentId}`,
    commentRequest
  )
  return response.data
}

const deleteComment = async (commentId: string): Promise<void> => {
  const response = await axiosInstance.delete<void>(`${API_PATH}/${commentId}`)
  return response.data
}

const getSubComments = async (
  commentId: string,
  page: number = 0,
  size: number = 10
): Promise<Comment[]> => {
  const response = await axiosInstance.get<Pageable<Comment>>(
    `${API_PATH}/${commentId}`,
    {
      params: { page, size },
    }
  )
  return response.data.content
}

export default {
  getComments,
  addComment,
  editComment,
  deleteComment,
  getSubComments,
}
