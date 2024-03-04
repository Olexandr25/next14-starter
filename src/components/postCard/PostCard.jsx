import Link from 'next/link'
import styles from './postCard.module.css'
import Image from 'next/image'

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
         {post?.img && <Image
            src={post?.img}
            alt='Post'
            fill
            className={styles.img}
          />
          }
        </div>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post?.title}</h1>
        <p className={styles.desc}>{post?.body}</p>
        <Link href={`/blog/${post?.slug}`} className={styles.link}>
          READ MORE
        </Link>
      </div>
    </div>
  )
}

export default PostCard
