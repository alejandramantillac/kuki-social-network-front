export type Recipe = {
  id: string
  title: string
  description: string
  photoUrl: string
  publishDate?: string
  difficulty: RecipeDifficulty
  country: Country
  estimatedTime?: string
  steps?: Step[]
  comments?: Comment[]
  mealDays?: MealDay[]
  recipeOwner: User
  ingredients?: RecipeIngredient[]
  tags?: Tag[]
  likes?: User[]
  usersWhoSaved?: User[]
}

export type RecipeDifficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type Country = {
  code: string
  name: string
}

export type Step = {
  id: string
  number: number
  description: string
  multimediaUrl?: string
}

export type Comment = {
  id: string
  content: string
  author: User
  createdAt: string
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
  username: string
  roles: string[]
}

export type Notification = {
  id: string
  content: string
  isRead: boolean
  creationDate: string
  url?: string
}
