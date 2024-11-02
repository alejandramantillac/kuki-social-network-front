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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: React.ReactNode
}

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type ModalBodyProps = {
  children: React.ReactNode
}

export type ModalFooterProps = {
  children: React.ReactNode
}

export type ModalHeaderProps = {
  title: string
  onClose: () => void
}

export type FooterProps = {
  children: React.ReactNode
}

export type FooterCopyrightProps = {
  companyName: string
}

export type FooterLinksProps = {
  title: string
  links: { name: string; href: string }[]
}

export type NavbarProps = {
  children: React.ReactNode
}

export type NavbarBrandProps = {
  title: string
}

export type NavbarDropdownProps = {
  title: string
  children: React.ReactNode
}

export type NavbarItemProps = {
  href: string
  children: React.ReactNode
  active?: boolean
}

export type NavbarMenuProps = {
  children: React.ReactNode
}
