import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  const [resultNum, setResultNum] = useState(0)
  const [totalNum, setTotalNum] = useState(-1)

  const [formValues, setFormValues] = useState({
    num1: 0,
    num2: 0,
    mode: 0,
    result: undefined,
  })

  useEffect(() => {
    setTotalNum(totalNum + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultNum])

  const evaluation = () => {
    console.log(formValues)
    axios
      .post(` http://localhost:8080/eval`, formValues)
      .then((res) => {
        console.log(res)

        setFormValues(res.data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={styles.container}>
      <h2>Next.js playground</h2>
      <div className={styles.section}>
        <h3>Countアプリ</h3>
        <h3>{resultNum}</h3>
        <div className={styles.buttonSet}>
          <h4>ボタンを押した回数: {totalNum}</h4>
        </div>
        <div className='buttonBox'>
          <button onClick={() => setResultNum(resultNum + 1)}>+</button>
          <button onClick={() => setResultNum(resultNum - 1)}>-</button>
          <button
            onClick={() => {
              setResultNum(0)
              setTotalNum(totalNum - 1)
              // setTotalNum(0)
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className={styles.section}>
        <h3>四則演算API</h3>
        <form action='submit'>
          <input
            type='number'
            value={formValues.num1}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                num1: Number(e.target.value),
              }))
            }
          />
          <input
            type='number'
            value={formValues.num2}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                num2: Number(e.target.value),
              }))
            }
          />
          <p>
            演算
            <br />
            <select
              name='mode'
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  mode: Number(e.target.value),
                }))
              }
            >
              <option value='0'>和</option>
              <option value='1'>差</option>
              <option value='2'>積</option>
              <option value='3'>商</option>
            </select>
          </p>
        </form>
        {formValues.result || formValues.result == 0 ? '計算結果' : ''}
        <h3>{formValues.result}</h3>
        <div className={styles.evalButton} onClick={(e) => evaluation()}>
          <a>Call API</a>
        </div>
      </div>
    </div>
  )
}

export default Home
