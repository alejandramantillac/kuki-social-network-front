import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { CreateRecipeRequest } from '../../types/model'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import ImageUploader from './ImageUploader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../../store/slices/countrySlice'
import { RootState, AppDispatch } from '../../store/store'

interface BasicInfoFormProps {
  onSubmit: (data: Partial<CreateRecipeRequest>) => void
  initialData: Partial<CreateRecipeRequest>
  setError: (message: string) => void
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { countries } = useSelector((state: RootState) => state.country)
  const DIFFICULTIES = ['BASIC', 'INTERMEDIATE', 'ADVANCED']
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Partial<CreateRecipeRequest>>({
    defaultValues: initialData,
    mode: 'onChange',
  })

  const onSubmitForm = (data: Partial<CreateRecipeRequest>) => {
    console.log('Form data:', data)
    onSubmit(data)
  }

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <Input
        label="Recipe Title"
        register={register('title', { required: 'Title is required' })}
        errors={errors.title?.message}
      />

      <TextArea
        label="Description"
        register={register('description', {
          required: 'Description is required',
        })}
        errors={errors.description?.message}
      />

      <Controller
        name="difficulty"
        control={control}
        rules={{ required: 'Difficulty is required' }}
        render={({ field }) => (
          <Dropdown
            title="Select difficulty"
            options={DIFFICULTIES.map((difficulty) => ({
              label: difficulty,
              value: difficulty,
            }))}
            {...field}
            value={field.value || ''}
            errors={errors.difficulty?.message}
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field }) => (
          <Dropdown
            title="Select country"
            options={countries.map((country) => ({
              label: country.name,
              value: country.code,
            }))}
            {...field}
            value={field.value || ''}
            errors={errors.country?.message}
          />
        )}
      />

      <Controller
        name="image"
        control={control}
        rules={{ required: 'Image is required' }}
        render={({ field }) => (
          <ImageUploader
            onChange={(file) => field.onChange(file)}
            value={field.value || null}
            errors={errors.image?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={!isValid}>
        Save and Continue
      </Button>
    </form>
  )
}

export default BasicInfoForm
