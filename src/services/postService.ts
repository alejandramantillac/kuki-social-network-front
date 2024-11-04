import axiosInstance from '../config/axiosConfig'
import { Post } from '../types/model'

const API_PATH = 'v1/posts'

const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>(API_PATH)
  return response.data
}

export default {
  getPosts,
}
