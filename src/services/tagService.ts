import axiosInstance from '../config/axiosConfig'
import { Tag } from '../types/model'

const API_PATH = 'v1/tag'

type TagResponse = {
  content: Tag[]
}

type TagUsageResponse = {
  id: string
  name: string
  tagName: string
  country: string
  usageCount: number
}

/**
 * Fetches tags from the server.
 * @returns {Promise<Tag[]>} A promise that resolves to an array of tags.
 */
const getTags = async (): Promise<Tag[]> => {
  const response = await axiosInstance.get<TagResponse>(API_PATH)
  if (response.data && Array.isArray(response.data.content)) {
    return response.data.content
  } else {
    console.error('Unexpected response format:', response.data)
    return []
  }
}

/**
 * Fetches trending tags from the server.
 * @returns {Promise<TagUsageResponse[]>} A promise that resolves to an array of trending tags.
 */
const getTrendingTags = async (): Promise<TagUsageResponse[]> => {
  const response = await axiosInstance.get<{ content: TagUsageResponse[] }>(
    `${API_PATH}/trending`
  )
  if (response.data && Array.isArray(response.data.content)) {
    return response.data.content
  } else {
    console.error('Unexpected response format:', response.data)
    return []
  }
}

export default {
  getTags,
  getTrendingTags,
}
