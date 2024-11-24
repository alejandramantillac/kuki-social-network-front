import React, { useState, useEffect } from 'react'
import NotSaved from '../components/Saved/NotSaved'
import postService from '../services/postService'
import { Recipe } from '../types/model'
import Saved from '../components/Saved/Saved'

const SavedPage: React.FC = () => {
  const [savedPosts, setSavedPosts] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await postService.getSavedPosts()
      setSavedPosts(data.content)
    }
    fetchPosts()
  }, [])

  return (
    <div className="flex min-h-screen justify-center items-center">
      {savedPosts.length === 0 ? (
        <NotSaved />
      ) : (
        <Saved savedPosts={savedPosts} />
      )}
    </div>
  )
}

export default SavedPage
