import React from 'react'

const BlogForm = ( {addBlog, title, handletitleChange,
  author, handleAuthorChange, url, handleUrlChange }) => {
  
    return (
    <form onSubmit={addBlog}>
    <div>
      title: 
      <input value={title} onChange={handletitleChange} />
    </div>
    <div>
      author:
      <input value={author} onChange={handleAuthorChange} />
    </div>
    <div>
      url:
      <input value={url} onChange={handleUrlChange} />
    </div>
    <div>
      <button type="submit">create</button>
    </div>
    </form>
  )
}

export default BlogForm