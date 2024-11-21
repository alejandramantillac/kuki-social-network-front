import React from 'react'

type ImageSelectorProps = {
  onChange: (file: File | null) => void
  error?: string
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onChange, error }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] || null)
  }

  return (
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
        onChange={handleFileChange}
        className="w-full text-text-secondary bg-bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default ImageSelector
