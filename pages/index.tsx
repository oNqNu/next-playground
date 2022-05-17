import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const [num, setNum] = useState(0)

  return (
    <div className={styles.container}>
      <h1>おなぬNEXT遊び場</h1>
      <div className={styles.section}>
        <h3>{num}</h3>
        <div className='buttonBox'>
          <button onClick={() => setNum(num + 1)}>+</button>
          <button onClick={() => setNum(num - 1)}>-</button>
          <button onClick={() => setNum(0)}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Home
