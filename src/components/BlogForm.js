import React from 'react'

const BlogForm = ( {addBlog, title, handleTitleChange,
  author, handleAuthorChange, url, handleUrlChange }) => {
  
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title: 
          <input value={title} onChange={handleTitleChange} />
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
    </div>
  )
}

export default BlogForm