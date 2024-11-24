import React from 'react'
import { Dropdown } from './Dropdown'

type CountrySelectorProps = {
  countries: { code: string; name: string }[]
  value: string
  onChange: (countryCode: string) => void
  label?: string
  errors?: string
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  value,
  onChange,
  errors,
}) => {
  return (
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
        value={value}
        options={countries.map((country) => ({
          value: country.code,
          label: country.name,
        }))}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  )
}

export default CountrySelector
