// AddIngredients.tsx
import React, { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import ingredientService from '../../services/ingredientService'
import { Ingredient } from '../../types/model'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input'

type AddIngredientsProps = {
  errors: Record<string, string>
  onChange: (ingredients: { id: string; quantity: string }[]) => void
}

const AddIngredients: React.FC<AddIngredientsProps> = ({
  errors,
  onChange,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<
    { id: string; name: string; quantity: string }[]
  >([])
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null)
  const [quantity, setQuantity] = useState<string>('')

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await ingredientService.getIngredients(0, 100)
        setIngredients(response.content || [])
      } catch (error) {
        console.error('Error fetching ingredients:', error)
      }
    }
    fetchIngredients()
  }, [])

  const handleAddIngredient = () => {
    if (selectedIngredient && quantity) {
      const newIngredient = {
        id: selectedIngredient.id,
        name: selectedIngredient.name,
        quantity,
      }
      const updatedIngredients = [...selectedIngredients, newIngredient]
      setSelectedIngredients(updatedIngredients)
      onChange(updatedIngredients)
      setSelectedIngredient(null)
      setQuantity('')
    }
  }

  const handleIngredientRemove = (ingredientId: string) => {
    const updatedIngredients = selectedIngredients.filter(
      (ing) => ing.id !== ingredientId
    )
    setSelectedIngredients(updatedIngredients)
    onChange(updatedIngredients)
  }

  return (
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
            const selected = ingredients.find(
              (ing) => ing.id === e.target.value
            )
            if (selected) setSelectedIngredient(selected)
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
        <Button type="button" onClick={handleAddIngredient} className="p-2">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {errors.ingredients && (
        <span className="text-red-500 text-sm">{errors.ingredients}</span>
      )}
      <div className="mt-2 space-y-2">
        {selectedIngredients.map(({ id, name, quantity }) => (
          <div
            key={id}
            className="flex items-center justify-between bg-bg-secondary p-2 rounded-md"
          >
            <span className="text-text-secondary">{`${name} - ${quantity}`}</span>
            <button
              type="button"
              onClick={() => handleIngredientRemove(id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddIngredients
