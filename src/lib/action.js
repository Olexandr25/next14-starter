'use server'

import { revalidatePath } from 'next/cache'
import { Post, User } from './models'
import { connectToDatabase } from './utils'
import { signIn, signOut } from './auth'
import bcrypt from 'bcrypt'

export const addPost = async formData => {
  try {
    const { title, desc, slug, userId } = Object.fromEntries(formData)
    connectToDatabase()

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    })
    await newPost.save()
    console.log('Saved to database!')
    revalidatePath('/blog')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

export const deletePost = async formData => {
  try {
    const { id } = Object.fromEntries(formData)
    connectToDatabase()

    await Post.findByIdAndDelete(id)
    console.log('Deleted from database!')
    revalidatePath('/blog')
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}

export const handleGithubLogin = async () => {
  'use server'
  await signIn('github')
}
export const handleGithubLogout = async () => {
  'use server'
  await signOut()
}

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDatabase();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

