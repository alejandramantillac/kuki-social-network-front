import React, { useState, useEffect } from 'react'
import {
  CreateRecipeRequest,
  Country,
  Ingredient,
  RecipeDifficulty,
  Tag,
} from '../types/model'
import recipeService from '../services/recipeService'
import ingredientService from '../services/ingredientService'
import tagService from '../services/tagService'
import Form from './Form/Form'
import { Input } from './Input'
import { Dropdown } from './Dropdown'
import { Button } from './Button'
import { Plus, X } from 'lucide-react'

type RecipeFormProps = {
  countries: Country[]
  onSuccess: (recipe: CreateRecipeRequest) => void
}

const RecipeForm: React.FC<RecipeFormProps> = ({ countries, onSuccess }) => {
  const initialValues = {
    title: '',
    description: '',
    difficulty: 'BASIC' as RecipeDifficulty,
    country: '',
    estimatedTime: '',
    steps: '',
    ingredients: [],
    tags: '',
    image: null,
  }

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [image, setImage] = useState<File | null>(null)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredient: Ingredient; quantity: string }[]
  >([])
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null)
  const [quantity, setQuantity] = useState<string>('')

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await ingredientService.getIngredients(0, 10)
        if (response && Array.isArray(response.content)) {
          setIngredients(response.content)
        } else {
          console.error('Unexpected response format:', response)
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error)
      }
    }

    const fetchTags = async () => {
      try {
        const response = await tagService.getTags()
        setTags(response)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchIngredients()
    fetchTags()
  }, [])

  const validate = (values: Record<string, unknown>) => {
    const validationErrors: Record<string, string> = {}
    if (!values.title) validationErrors.title = 'Title is required'
    if (!values.description)
      validationErrors.description = 'Description is required'
    if (!values.difficulty)
      validationErrors.difficulty = 'Difficulty is required'
    if (!values.country) validationErrors.country = 'Country is required'
    if (!values.estimatedTime)
      validationErrors.estimatedTime = 'Estimated time is required'
    if (selectedIngredients.length === 0)
      validationErrors.ingredients = 'Ingredients are required'
    if (!values.steps) validationErrors.steps = 'Steps are required'
    if (selectedTags.length === 0) validationErrors.tags = 'Tags are required'
    return validationErrors
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const recipeData: CreateRecipeRequest = {
        title: data.title as string,
        description: data.description as string,
        difficulty: data.difficulty as RecipeDifficulty,
        country: data.country as string,
        image: image || undefined,
      }
      const response = await recipeService.createRecipe(recipeData)
      onSuccess({
        ...response,
        country: response.country.code, // Convert country to string
      })
    } catch (error) {
      console.error('Error creating recipe:', error)
    }
  }

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
  }

  const handleAddIngredient = () => {
    if (selectedIngredient && quantity) {
      setSelectedIngredients((prev) => [
        ...prev,
        { ingredient: selectedIngredient, quantity },
      ])
      setSelectedIngredient(null)
      setQuantity('')
    }
  }

  const handleIngredientRemove = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.filter((ing) => ing.ingredient.id !== ingredient.id)
    )
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => [...prev, tag])
  }

  const handleTagRemove = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div className="text-text-secondary">
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        submitText="Create Recipe"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Title
            </label>
            <Input id="title" name="title" className="w-full" />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full h-24 px-3 py-2 text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="w-full px-3 py-2 text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="BASIC">Basic</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
              {errors.difficulty && (
                <span className="text-red-500 text-sm">
                  {errors.difficulty}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Country
              </label>
              <Dropdown
                title="Select Country"
                name="country"
                value={initialValues.country}
                options={countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
                onChange={(e) => {
                  const selectedCountry = e.target.value
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    country: selectedCountry ? '' : 'Country is required',
                  }))
                }}
                className="w-full"
              />
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="estimatedTime"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Estimated Time
            </label>
            <Input id="estimatedTime" name="estimatedTime" className="w-full" />
            {errors.estimatedTime && (
              <span className="text-red-500 text-sm">
                {errors.estimatedTime}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="steps"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Steps
            </label>
            <textarea
              id="steps"
              name="steps"
              className="w-full h-32 px-3 py-2 text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.steps && (
              <span className="text-red-500 text-sm">{errors.steps}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Ingredients
            </label>
            <div className="flex items-center space-x-2">
              <Dropdown
                title="Select Ingredient"
                name="ingredients"
                value={selectedIngredient?.id || ''}
                options={ingredients.map((ingredient) => ({
                  value: ingredient.id,
                  label: ingredient.name,
                }))}
                onChange={(e) => {
                  const selectedIngredient = ingredients.find(
                    (ing) => ing.id === e.target.value
                  )
                  if (selectedIngredient)
                    handleIngredientSelect(selectedIngredient)
                }}
                className="flex-grow"
              />
              <Input
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-24"
              />
              <Button
                type="button"
                onClick={handleAddIngredient}
                className="p-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {errors.ingredients && (
              <span className="text-red-500 text-sm">{errors.ingredients}</span>
            )}
            <div className="mt-2 space-y-2">
              {selectedIngredients.map(({ ingredient, quantity }) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between bg-bg-secondary p-2 rounded-md"
                >
                  <span className="text-text-secondary">
                    {ingredient.name} - {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIngredientRemove(ingredient)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Tags
            </label>
            <Dropdown
              title="Select Tags"
              name="tags"
              value=""
              options={tags.map((tag) => ({
                value: tag.name,
                label: tag.name,
              }))}
              onChange={(e) => handleTagSelect(e.target.value)}
              className="w-full"
            />
            {errors.tags && (
              <span className="text-red-500 text-sm">{errors.tags}</span>
            )}
            <div className="mt-2 space-y-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-between bg-bg-secondary p-2 rounded-md"
                >
                  <span className="text-text-secondary">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default RecipeForm
