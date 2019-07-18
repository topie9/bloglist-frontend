import React, { useState } from 'react'

const Blog = ({ blog, addLike, delBlog, currentUsername }) => {
  const [dataVisible, setDataVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleBlogVisibility = () => {
    setDataVisible(!dataVisible)
  }
  const showWhenVisible = { display: dataVisible ? '' : 'none' }
  
  return (
    <div style={blogStyle}>
      <div onClick={handleBlogVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button onClick={addLike}>like</button> <br />
        added by {blog.user.name} <br />
        {currentUsername === blog.user.username
          && <button onClick={delBlog}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog