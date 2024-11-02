import React from 'react'

export type AvatarProps = {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

export type CardProps = {
  title: string
  description: string
  imageUrl?: string
  children?: React.ReactNode
}

export type DropdownProps = {
  title: string
  children: React.ReactNode
}
