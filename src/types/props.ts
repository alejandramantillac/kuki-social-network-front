import React from 'react'
import { PostFilter } from './filter'
import { Tag } from './model'
import { User } from './model'

export type AvatarProps = {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  url?: string
}

export type CardProps = {
  title: string
  description: string
  imageUrl?: string
  children?: React.ReactNode
}

export type Option = {
  value: string
  label: string
}

export type DropdownProps = {
  title: string
  options: Option[]
  showSearch?: boolean
  className?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'none'
  size?: 'sm' | 'md' | 'lg'
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: React.ReactNode
  errors?: string
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

export type RequireAuthProps = {
  redirectPath?: string
  unAuthorizedPath?: string
  roles?: string[]
}

export type AlertProps = {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

export type BadgeProps = {
  text: string
  color?: 'gray' | 'red' | 'green' | 'blue' | 'yellow' | 'primary' | 'secondary'
}

export type TooltipProps = {
  text: string
  children: React.ReactNode
}

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
}

export type TabProps = {
  label: string
  content: React.ReactNode
}

export type TabsProps = {
  tabs: TabProps[]
}

export type FormProps = {
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  initialValues: Record<string, unknown>
  validate?: (values: Record<string, unknown>) => Record<string, string>
  children: React.ReactNode
  submitText?: string
  submitButton?: boolean
}

export type LinkedTextProps = {
  href: string
  text: string
  colorClass?: string
}

export type SearchBarProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

export type ResponsiveProps = {
  isMobile: boolean
}

export type MainLayoutProps = ResponsiveProps & {
  children: React.ReactNode
}

export type PostListProps = {
  filters?: PostFilter
}

export type TagListProps = {
  tags: Tag[]
}

export type FollowListProps = {
  users: User[]
}
