import React from 'react'

type DifficultySelectorProps = {
  name: string
  label: string
  errors?: string
  initialValue: string
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  name,
  label,
  errors,
  initialValue,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={initialValue}
        className="w-full px-3 py-2 text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="BASIC">Basic</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="ADVANCED">Advanced</option>
      </select>
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  )
}

export default DifficultySelector
