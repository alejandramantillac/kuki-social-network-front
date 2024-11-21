import React, { useState, useEffect } from 'react'
import {
  CreateRecipeRequest,
  Country,
  RecipeDifficulty,
  Tag,
} from '../types/model'
import tagService from '../services/tagService'
import Form from './Form/Form'
import { Input } from './Input'
import { TextArea } from './TextArea'
import AddIngredients from './Creation/AddIngredients'
import TagSelector from './Creation/TagSelector'
import DifficultySelector from './Creation/DifficultySelector'
import ImageSelector from './ImageSelector'
import CountrySelector from './CountrySelector'

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
    ingredients: [],
    tags: '',
    image: null,
  }

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [image, setImage] = useState<File | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<
    { id: string; quantity: string }[]
  >([])
  const [selectedCountry, setSelectedCountry] = useState<string>(
    initialValues.country
  )

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await tagService.getTags()
        setTags(response)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchTags()
  }, [])

  const validate = (values: Record<string, unknown>) => {
    const validationErrors: Record<string, string> = {}
    if (!values.title) validationErrors.title = 'Title is required'
    if (!values.description)
      validationErrors.description = 'Description is required'
    if (!values.difficulty)
      validationErrors.difficulty = 'Difficulty is required'
    if (!selectedCountry) validationErrors.country = 'Country is required'
    if (ingredients.length === 0)
      validationErrors.ingredients = 'At least one ingredient is required'
    if (selectedTags.length === 0) validationErrors.tags = 'Tags are required'
    if (!image) validationErrors.image = 'Image is required'
    console.log('Validation errors:', validationErrors)
    return validationErrors
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSuccess({
      title: data.title as string,
      description: data.description as string,
      difficulty: data.difficulty as RecipeDifficulty,
      country: selectedCountry,
      ingredients,
      tags: selectedTags,
      image: image as File,
    })
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
          <Input id="title" name="title" label="Title" errors={errors.title} />
          <TextArea
            id="description"
            name="description"
            label="Description"
            errors={errors.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DifficultySelector
              name="difficulty"
              label="Difficulty"
              errors={errors.difficulty}
              initialValue={initialValues.difficulty}
            />
            <CountrySelector
              countries={countries}
              label="Country"
              value={selectedCountry}
              onChange={(value) => {
                setSelectedCountry(value)
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  country: value ? '' : 'Country is required',
                }))
              }}
              errors={errors.country}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AddIngredients errors={errors} onChange={setIngredients} />
            <TagSelector
              tags={tags.map((tag) => tag.name)}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              error={errors.tags}
            />
          </div>
          <ImageSelector onChange={setImage} error={errors.image} />
        </div>
      </Form>
    </div>
  )
}

export default RecipeForm
