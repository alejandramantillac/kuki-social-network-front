import React from 'react'
import { Input } from '../Input'

type TitleInputProps = {
  value: string
  error?: string
  onChange: (value: string) => void
}

const TitleInput: React.FC<TitleInputProps> = ({ value, error, onChange }) => (
  <div>
    <label
      htmlFor="title"
      className="block text-sm font-medium text-text-secondary mb-1"
    >
      Title
    </label>
    <Input
      id="title"
      name="title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
)

export default TitleInput
