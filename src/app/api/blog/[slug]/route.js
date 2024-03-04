import { connectToDatabase } from '@/lib/utils'
import { NextResponse } from 'next/server'
import { Post } from '@/lib/models'

export const GET = async (request, { params }) => {
  try {
    const { slug } = params

    connectToDatabase()

    const post = await Post.findOne({ slug })
    return NextResponse.json(post)
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch')
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const { slug } = params

    connectToDatabase()

    await Post.deleteOne({ slug })
    return NextResponse.json("Post deleted!")
  } catch (err) {
    console.log(err)
    throw new Error('Failed to delete')
  }
}
