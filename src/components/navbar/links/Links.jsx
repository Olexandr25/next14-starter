'use client'

import Image from 'next/image'
import styles from './links.module.css'
import NavLink from './navLink/NavLink'
import React, { useState } from 'react'
import { handleGithubLogout } from '@/lib/action'
import { auth } from '@/lib/auth'

const links = [
  { title: 'Homepage', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Blog', path: '/blog' },
]
const Links = ({ session }) => {
  const [open, setOpen] = useState(false)
  // TEMPORARY
  // const session = true
  const isAdmin = true

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map(link => (
          <NavLink key={link.title} item={link} />
        ))}
        {session ? (
          <>
            {session?.user?.isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
            <form action={handleGithubLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: 'Login', path: '/login' }} />
        )}
      </div>

      <Image
        src='/menu.png'
        alt=''
        width={30}
        height={30}
        className={styles.menuButton}
        onClick={() => setOpen(prev => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map(link => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Links
