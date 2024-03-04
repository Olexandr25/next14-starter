import styles from './postUser.module.css'
import { getUser } from '@/lib/data'
import Image from "next/image"

// const getData = async ({ userId }) => {
//   const data = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`
//   )

//   if (!data.ok) throw new Error('Failed to fetch data')

//   return data.json()
// }

const PostUser = async ({ userId }) => {
  // FETCH DATA WITH AN API
  // const user = await getData({ userId })

  // FETCH DATA WITHOUT AN API
  const user = await getUser(userId)

  return (
    <div className={styles.container}>
      
      <Image
        className={styles.avatar}
        src={user?.img || '/noavatar.png'}
        alt=''
        width={50}
        height={50}
      />
      <div className={styles.text}>
        <span className={styles.title}>Author</span>
        <span className={styles.userName}>{user?.userName}</span>
      </div>
    </div>
  )
}

export default PostUser
