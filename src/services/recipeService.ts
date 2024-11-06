import axiosInstance from '../config/axiosConfig'
import { Recipe } from '../types/model'

const API_PATH = 'v1/recipes'

/**
 * Searches for recipes based on the title.
 * @param {string} title - The title to search for.
 * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes.
 */
const searchRecipes = async (title: string): Promise<Recipe[]> => {
  const response = await axiosInstance.get<Recipe[]>(
    `${API_PATH}?title=${title}`
  )
  return response.data
}

export default {
  searchRecipes,
}
