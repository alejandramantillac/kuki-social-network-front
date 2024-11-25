import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Recipe } from '../../types/model'
import postService from '../../services/postService'
import { PostFilter } from '../../types/filter'

interface PostState {
  posts: Recipe[]
  loading: boolean
  hasMore: boolean
  page: number
}

const initialState: PostState = {
  posts: [],
  loading: false,
  hasMore: true,
  page: 0,
}

export const fetchPosts = createAsyncThunk<
  Recipe[],
  { filters?: PostFilter; page: number }
>('post/fetchPosts', async ({ filters, page }) => {
  const data = await postService.getPosts(filters, page, 10)
  return data
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Recipe[]>) {
      state.posts = action.payload
    },
    addPost(state, action: PayloadAction<Recipe>) {
      state.posts.push(action.payload)
    },
    removePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    incrementPage(state) {
      state.page += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const newPosts = action.payload
        state.posts = [
          ...state.posts,
          ...newPosts.filter(
            (post) =>
              !state.posts.some((existingPost) => existingPost.id === post.id)
          ),
        ]
        state.hasMore = newPosts.length > 0
        state.loading = false
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setPosts, addPost, removePost, incrementPage } =
  postSlice.actions
export default postSlice.reducer
