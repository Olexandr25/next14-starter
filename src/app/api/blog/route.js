import { connectToDatabase } from '@/lib/utils'
import { NextResponse } from 'next/server'
import { Post } from '@/lib/models'

export const GET = async request => {
  try {
    connectToDatabase()

    const posts = await Post.find()
    return NextResponse.json(posts)
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch')
  }
}
