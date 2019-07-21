const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '5d2e2a84a653373514d97728',
      name: '1ser',
      username: 'One user'
    }
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      id: '5d2e2a84a653373514d97728',
      name: '1ser',
      username: 'One user'
    }
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      id: '5d2df6ca719ea81e8417fbcd',
      name: 'user1',
      username: 'user one'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

// eslint-disable-next-line
let token = null // ignore for now

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }