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
