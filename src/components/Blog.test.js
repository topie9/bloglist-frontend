import React from 'React'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: '1',
      user: {
        name: 'testUser',
        username: 'testUsername'
      }
    }

    component = render(
      <Blog
        blog={blog}
        addLike={() => null}
        delBlog={() => null}
        currentUsername={blog.user.username}
      />
    )
  })

  test('only blog title and author are initially visible', () => {
    const blogDetailDiv = component.container.querySelector('.togglableContent')
    expect(blogDetailDiv).toHaveStyle('display: none')
  })

  test('clicking blog title/author shows rest of the blog details', () => {
    const btnDiv = component.container.querySelector('.clickableContent')
    fireEvent.click(btnDiv)

    const blogDetailDiv = component.container.querySelector('.togglableContent')
    expect(blogDetailDiv).not.toHaveStyle('display: none')
  })
})