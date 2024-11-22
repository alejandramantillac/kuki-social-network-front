import React, { useState, useEffect, JSX } from 'react'
import Form from './Form'
import { Input } from '../Input'
import auth from '../../services/authService'
import country from '../../services/countryService'
import { Dropdown } from '../Dropdown'

/**
 * RegisterForm component to display a registration form.
 * @returns {JSX.Element} The rendered RegisterForm component.
 * @example
 * <RegisterForm />
 */
const RegisterForm: React.FC = (): JSX.Element => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    country: '',
  }

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    []
  )

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await country.getCountries()
        setCountries(countriesData)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  const validate = (values: Record<string, unknown>) => {
    console.log(values)
    const errors: Record<string, string> = {}
    if (!values.username) errors.username = 'Username is required'
    if (!values.email) errors.email = 'Email is required'
    if (!values.password) errors.password = 'Password is required'
    if (!values.fullName) errors.fullName = 'Full name is required'
    if (!values.country) errors.country = 'Country is required'
    return errors
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const user = await auth.register(
        data as {
          username: string
          email: string
          password: string
          fullName: string
          country: string
        }
      )
      if (user) window.location.href = '/'
      else console.log('Registration failed')
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      submitText="Registrarse"
    >
      <Input name="username" label="Usuario" />
      <Input name="email" label="Correo Electrónico" type="email" />
      <Input name="password" label="Contraseña" type="password" />
      <Input name="fullName" label="Nombre Completo" className="mb-4" />
      <Dropdown
        title="Selecciona un país"
        options={countries.map((country) => ({
          value: country.code,
          label: country.name,
        }))}
        showSearch={true}
        name="country"
        className="w-full"
        value={initialValues.country}
        onChange={(e) => setErrors({ ...errors, country: e.target.value })}
        errors={errors.country}
      />
    </Form>
  )
}

export default RegisterForm
