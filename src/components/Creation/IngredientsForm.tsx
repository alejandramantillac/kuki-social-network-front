import React, { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import ingredientService from '../../services/ingredientService'
import tagService from '../../services/tagService'
import { Ingredient, Tag } from '../../types/model'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input'
import TagSelector from './TagSelector'

interface IngredientsFormProps {
  onSubmit: (data: {
    ingredients: { id: string; quantity: string; name: string }[]
    tags: string[]
  }) => void
  initialIngredients: { id: string; quantity: string }[]
  initialTags: string[]
}

const IngredientsForm: React.FC<IngredientsFormProps> = ({
  onSubmit,
  initialIngredients,
  initialTags,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<
    { id: string; name: string; quantity: string }[]
  >(initialIngredients.map((ing) => ({ ...ing, name: '' })))
  const [tags, setTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  const [errors, setErrors] = useState<{ ingredients?: string; tags?: string }>(
    {}
  )

  useEffect(() => {
    const fetchIngredientsAndTags = async () => {
      try {
        const [ingredientsResponse, tagsResponse] = await Promise.all([
          ingredientService.getIngredients(0, 100),
          tagService.getTags(),
        ])
        setIngredients(ingredientsResponse.content || [])
        setTags(tagsResponse.map((tag: Tag) => tag.name) || [])
        setSelectedIngredients((prev) =>
          prev.map((ing) => ({
            ...ing,
            name:
              ingredientsResponse.content.find((i) => i.id === ing.id)?.name ||
              '',
          }))
        )
      } catch (error) {
        console.error('Error fetching ingredients or tags:', error)
      }
    }
    fetchIngredientsAndTags()
  }, [])

  const addIngredient = () => {
    setSelectedIngredients([
      ...selectedIngredients,
      { id: '', name: '', quantity: '' },
    ])
  }

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (
    index: number,
    field: 'id' | 'quantity',
    value: string
  ) => {
    const updatedIngredients = [...selectedIngredients]
    updatedIngredients[index][field] = value
    if (field === 'id') {
      updatedIngredients[index].name =
        ingredients.find((i) => i.id === value)?.name || ''
    }
    setSelectedIngredients(updatedIngredients)
  }

  const validateForm = () => {
    const newErrors: { ingredients?: string; tags?: string } = {}

    if (selectedIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required'
    } else if (
      selectedIngredients.some((ing) => !ing.id || !ing.quantity.trim())
    ) {
      newErrors.ingredients = 'All ingredients must be filled out'
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'At least one tag is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ingredients: selectedIngredients.map(({ id, quantity, name }) => ({
          id,
          quantity,
          name,
        })),
        tags: selectedTags,
      })
    }
  }

  const availableIngredients = ingredients.filter(
    (ing) => !selectedIngredients.some((selected) => selected.id === ing.id)
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-secondary">
            Ingredients
          </h3>
          <div className="space-y-2">
            {selectedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-bg-secondary p-2 rounded-md"
              >
                <Dropdown
                  name={`ingredient-${index}`}
                  title="Select ingredient"
                  options={availableIngredients
                    .map((ing) => ({
                      label: ing.name,
                      value: ing.id,
                    }))
                    .concat([{ label: ingredient.name, value: ingredient.id }])}
                  value={ingredient.id}
                  onChange={(e) =>
                    updateIngredient(index, 'id', e.target.value)
                  }
                  className="flex-grow"
                />
                <Input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(index, 'quantity', e.target.value)
                  }
                  placeholder="Quantity"
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={addIngredient}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 w-full" />
            Add Ingredient
          </Button>
          {errors.ingredients && (
            <p className="text-text-error text-sm">{errors.ingredients}</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-secondary">Tags</h3>
          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
            error={errors.tags}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save and Continue
      </Button>
    </form>
  )
}

export default IngredientsForm
