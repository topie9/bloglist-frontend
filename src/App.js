import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import LoginForm from './components/LoginForm.js'
import Notification from './components/Notification.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Togglable from './components/Togglable.js';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = React.createRef()

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
        message: 'wrong username or password',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }

      const returnedBlog = await blogService.create(newBlog)
      const blogWithUserDetails = {
        ...returnedBlog,
        user: {
          id: returnedBlog.user,
          name: user.name,
          username: user.username
        }
      }

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blogWithUserDetails))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 5000)
      
    } catch (exception) {
      setNotification({
        message: `${newTitle} could not be added to server`,
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const addLikeOf = async id => {
    try {
      const blogFound = blogs.find(blog => blog.id === id)
      const updatedLikesBLog = {
        title: blogFound.title,
        author: blogFound.author,
        url: blogFound.url,
        user: blogFound.user.id,
        likes: blogFound.likes + 1,
      }

      const updatedBlog = await blogService.update(id, updatedLikesBLog)
      setBlogs(blogs.map(
        b => b.id !== id ? b  : { ...updatedBlog, user: blogFound.user }
      ))     
      
    } catch (exception) {
      setNotification({
        message: 'could not add like',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const delBlogOf = async (id, blog) => {
    try {
      const confirmDelete = window.confirm(`remove ${blog.title} by ${blog.author}`)
      if (confirmDelete) {
        // eslint-disable-next-line
        const res = await blogService.remove(id)

        setBlogs(blogs.filter(b => b.id !== id))
        setNotification({
          message: `Deleted ${blog.title}`,
          type: 'success'
        })
        setTimeout(() => setNotification(null), 5000)  
      }
    } catch (exception) {
      setNotification({
        message: `could not remove blog`,
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleTitleChange = (event) => (setNewTitle(event.target.value))
  const handleAuthorChange = (event) => (setNewAuthor(event.target.value))
  const handleUrlChange = (event) => (setNewUrl(event.target.value))
  const handleUsernameChange = (event) => (setUsername(event.target.value))
  const handlePasswordChange = (event) => (setPassword(event.target.value))


  return (
    <div>
      <Notification 
      message={(notification) ? notification.message : null} 
      type={(notification) ? notification.type : null}
      />

      {user === null 
        ? <div>
            <LoginForm 
              handleLogin={handleLogin}
              username={username}
              handleUsernameChange={handleUsernameChange}
              password={password}
              handlePasswordChange={handlePasswordChange}
            />
          </div>
          
        : <div>
            <h2>blogs</h2>   
            <p>{user.name} logged in 
              <button onClick={handleLogout}>logout</button>
            </p>
            
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                addBlog={addBlog}
                title={newTitle}
                handleTitleChange={handleTitleChange}
                author={newAuthor}
                handleAuthorChange={handleAuthorChange}
                url={newUrl}
                handleUrlChange={handleUrlChange}
              />
            </Togglable>
    
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} 
                addLike={() => addLikeOf(blog.id)} 
                delBlog={() => delBlogOf(blog.id, blog)}
                currentUsername={user.username}/>
            )}
          </div>
      }
    </div>
  )
}

export default App
