// const posts = [
//   {
//     id: 1,
//     title: 'Post 1',
//     body: 'This is the body of post 1',
//     userId: 1,
//   },
//   {
//     id: 2,
//     title: 'Post 2',
//     body: 'This is the body of post 2',
//     userId: 2,
//   },
//   {
//     id: 3,
//     title: 'Post 3',
//     body: 'This is the body of post 3',
//     userId: 3,
//   },
//   {
//     id: 4,
//     title: 'Post 4',
//     body: 'This is the body of post 4',
//     userId: 4,
//   },
// ]


// const users = [
//   { id: 1, name: 'User 1' },
//   { id: 2, name: 'User 2' },
//   { id: 3, name: 'User 3' },
//   { id: 4, name: 'User 4' },
// ]

import { Post, User } from './models'
import { connectToDatabase } from './utils'
import { unstable_noStore as noStore } from 'next/cache'

export const getPosts = async () => {
  try {
    connectToDatabase()
    const posts = await Post.find()
    return posts
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw new Error(error)
  }
}

export const getPost = async slug => {
  try {
    connectToDatabase()
    const post = await Post.findOne({slug})
    return post
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw new Error(error)
  }
}

export const getUser = async id => {
  try {
    noStore()
    connectToDatabase()
    const user = await User.findById(id)
    return user
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw new Error(error)
  }
}
export const getUsers = async () => {
  try {
    connectToDatabase()
    const users = await User.find()
    return users
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw new Error(error)
  }
}
