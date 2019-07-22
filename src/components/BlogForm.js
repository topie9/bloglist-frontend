import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( { addBlog, title, author, url }) => {

  title = { ...title, reset: null }
  author = { ...author, reset: null }
  url = { ...url, reset: null }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
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
}

export default BlogForm