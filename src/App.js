import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotification({
        message: 'wrong username of password',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
          setNotification({
            message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => {
          setNotification({
            message: `${newTitle} could not be added to server`,
            type: 'error'
          })
          setTimeout(() => setNotification(null), 5000)
        })
  }

  const handletitleChange = (event) => (setNewTitle(event.target.value))
  const handleAuthorChange = (event) => (setNewAuthor(event.target.value))
  const handleUrlChange = (event) => (setNewUrl(event.target.value))

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input 
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>  
      <h2>blogs</h2>
      <p>{user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>
      <BlogForm
        addBlog={addBlog}
        title={newTitle}
        handletitleChange={handletitleChange}
        author={newAuthor}
        handleAuthorChange={handleAuthorChange}
        url={newUrl}
        handleUrlChange={handleUrlChange}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
