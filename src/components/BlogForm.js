import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( { addBlog, title, handleTitleChange,
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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  url: PropTypes.string.isRequired
}

export default BlogForm