import axiosInstance from '../config/axiosConfig'
import { Pageable, UserFollowResponse } from '../types/model'

const API_PATH = 'v1/follow'

/**
 * Follow a user.
 * @param {string} followedUsername - The username of the user to be followed.
 * @returns {Promise<void>} A promise that resolves when the user is followed.
 */
const followUser = async (followedUsername: string): Promise<void> => {
  await axiosInstance.post<void>(`${API_PATH}`, followedUsername)
}

/**
 * Unfollow a user.
 * @param {string} followedUsername - The username of the user to be unfollowed.
 * @returns {Promise<void>} A promise that resolves when the user is unfollowed.
 */
const unfollowUser = async (followedUsername: string): Promise<void> => {
  await axiosInstance.delete<void>(`${API_PATH}`, {
    params: { followedUsername },
  })
}

/**
 * Get the users followed by a specific user.
 * @param {string} username - The username of the user.
 * @param {number} page - The page number.
 * @param {number} size - The size of the page.
 * @returns {Promise<Pageable<UserFollowResponse>>} A promise that resolves to a page of followed users.
 */
const getFollowedUsers = async (
  username: string,
  page: number,
  size: number
): Promise<Pageable<UserFollowResponse>> => {
  const response = await axiosInstance.get<Pageable<UserFollowResponse>>(
    `${API_PATH}/following`,
    {
      params: { username, page, size },
    }
  )
  return response.data
}

/**
 * Get the followers of a specific user.
 * @param {string} username - The username of the user.
 * @param {number} page - The page number.
 * @param {number} size - The size of the page.
 * @returns {Promise<Pageable<UserFollowResponse>>} A promise that resolves to a page of followers.
 */
const getFollowers = async (
  username: string,
  page: number,
  size: number
): Promise<Pageable<UserFollowResponse>> => {
  const response = await axiosInstance.get<Pageable<UserFollowResponse>>(
    `${API_PATH}/followers`,
    {
      params: { username, page, size },
    }
  )
  return response.data
}

export default {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getFollowers,
}
