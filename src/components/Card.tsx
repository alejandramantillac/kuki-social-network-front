import React from 'react'
import { CardProps } from '../types/props'

/**
 * Card component to display a card with a title, description, image, and optional children.
 * @param {CardProps} props - The properties for the Card component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string} [props.imageUrl] - The URL of the image to display in the card.
 * @param {React.ReactNode} [props.children] - Optional children to display inside the card.
 * @returns {JSX.Element} The rendered Card component.
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  children,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {children}
      </div>
    </div>
  )
}
