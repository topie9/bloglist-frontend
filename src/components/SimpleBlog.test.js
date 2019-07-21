import React from 'React'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders blog title, author and number of likes', () => {
  const simpleblog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: '1'
  }

  const component = render(
    <SimpleBlog blog={simpleblog} />
  )

  const detailDiv = component.container.querySelector('.blogDetails')
  expect(detailDiv).toHaveTextContent('testTitle testAuthor')

  const likeDiv = component.container.querySelector('.blogLikes')
  expect(likeDiv).toHaveTextContent('blog has 1 likes')
})

test('clicking button twice call event handler twice', async () => {
  const simpleblog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: '0'
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleblog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
