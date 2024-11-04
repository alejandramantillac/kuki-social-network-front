import React from 'react'

const PostImage: React.FC<{ src: string }> = ({ src }) => {
  return <img src={src} alt="Post" className="w-full h-48 object-cover" />
}

export default PostImage
