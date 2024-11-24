import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageIcon, X } from 'lucide-react'
import { Button } from '../Button'

interface ImageUploaderProps {
  onChange: (file: File | null) => void
  value: File | null
  errors?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  value,
  errors,
}) => {
  const [preview, setPreview] = useState<string | null>(
    value ? URL.createObjectURL(value) : null
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      onChange(file)
      setPreview(URL.createObjectURL(file))
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  const removeImage = () => {
    onChange(null)
    setPreview(null)
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-border-primary hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <ImageIcon className="mx-auto h-12 w-12 text-text-secondary" />
          <p className="mt-2 text-sm text-text-secondary">
            Drag 'n' drop an image here, or click to select one
          </p>
        </div>
      )}
      {errors && <p className="text-sm text-text-error">{errors}</p>}
    </div>
  )
}

export default ImageUploader
