// recipeService.ts
import axiosInstance from '../config/axiosConfig'
import { Recipe, CreateRecipeRequest, RecipeResponse } from '../types/model'

const API_PATH = 'v1/recipes'

/**
 * Searches for recipes based on the title.
 * @param {string} title - The title to search for.
 * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes.
 */
const searchRecipes = async (title: string): Promise<Recipe[]> => {
  const response = await axiosInstance.get<RecipeResponse>(
    `${API_PATH}?title=${title}`
  )
  return response.data.content
}

/**
 * Creates a new recipe.
 * @param {CreateRecipeRequest} data - The recipe data to create.
 * @returns {Promise<Recipe>} A promise that resolves to the created recipe.
 */
const createRecipe = async (data: CreateRecipeRequest): Promise<Recipe> => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('difficulty', data.difficulty)
  formData.append('country', data.country)
  formData.append('ingredients', JSON.stringify(data.ingredients))
  formData.append('tags', JSON.stringify(data.tags))
  if (data.image) {
    formData.append('image', data.image)
  }

  const response = await axiosInstance.post<Recipe>(API_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

/**
 * Gets a recipe by its ID.
 * @param {string} id - The ID of the recipe to get.
 * @returns {Promise<Recipe>} A promise that resolves to the recipe.
 */
const getRecipe = async (id: string): Promise<Recipe> => {
  const response = await axiosInstance.get<Recipe>(`${API_PATH}/${id}`)
  return response.data
}

export default {
  searchRecipes,
  createRecipe,
  getRecipe,
}
