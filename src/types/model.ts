export type User = {
  username: string
  roles: string[]
}

export type Post = {
  id: string
  title: string
  author: string
  image: string
  description: string
  comments: number
  likes: number
}
