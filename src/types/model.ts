export interface Pageable<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export type Recipe = {
  id: string
  title: string
  description: string
  photoUrl: string
  publishDate?: string
  difficulty: RecipeDifficulty
  country: Country
  estimatedTime?: string
  likes?: number
  comments?: number
  recipeOwner: PublicUser
  tags?: Tag[]
  likedByUser?: boolean
  savedByUser?: boolean
}

export type RecipeDifficulty = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED'

export type Country = {
  code: string
  name: string
}

export type Step = {
  id: string
  description: string
}

export type Comment = {
  id: string
  content: string
  user: PublicUser
  creationDate: string
}

export type MealDay = {
  id: string
  name: string
}

export type RecipeIngredient = {
  id: string
  name: string
  quantity: string
}

export type Tag = {
  id: string
  name: string
}

export type User = {
  id: number
  username: string
  roles: string[]
  photoUrl?: string
  avatarUrl: string
}

export type PublicUser = {
  username: string
  photoUrl: string
}

export type Notification = {
  id: string
  content: string
  isRead: boolean
  creationDate: string
  url?: string
}
