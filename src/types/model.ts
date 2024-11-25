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

export type UserFollowResponse = {
  followerUsername: string
  followedUsername: string
  creationDate: string
}

export type Recipe = {
  id: string
  title: string
  description: string
  photoUrl: string
  avatarUrl: string
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
  number: number
  description: string
  multimediaUrl: string
  estimatedTime?: string
}

export type CreateStepRequest = {
  recipeId: string
  steps: CreateStep[]
}

export type CreateStep = {
  stepNumber: number
  description: string
  multimedia: File | null
  estimatedTime: number
}

export type Comment = {
  commentId: string
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
  name: string
  tagName: string
  country: string
  usageCount: number
}

export type AuthUser = {
  username: string
  roles: string[]
  photoUrl?: string
}

export type User = {
  id: string
  username: string
  name: string
  email: string
  fullName: string
  password: string
  photoUrl: string
  avatarUrl: string // Add this line
  biography: string
  socialMedia: Record<string, unknown>
  registerDate: string
  userStatus: string
  country: Country
  lastConnection: string
  roles: string[]
  notifications: Notification[]
  recipes: Recipe[]
  comments: Comment[]
  likes: Recipe[]
  savedRecipes: Recipe[]
  followed: boolean
}

export type PublicUser = {
  username: string
  name: string
  photoUrl: string
  followed: boolean
}

export type Like = {
  recipeId: string
  user: PublicUser
  liked: boolean
}

export type DeleteResponse = {
  message: string
  deleted: boolean
}

export type Notification = {
  id: string
  content: string
  isRead: boolean
  creationDate: string
  url?: string
}

export type CreateRecipeRequest = {
  title: string
  description: string
  difficulty: RecipeDifficulty
  country: string
  image?: File
  ingredients: { id: string; quantity: string; name: string }[]
  tags: string[]
}

export type RecipeResponse = {
  content: Recipe[]
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

export type Ingredient = {
  id: string
  name: string
  quantity: string
}
