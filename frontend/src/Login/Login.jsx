import React, { useContext, useState } from 'react'
import UserContext from '../context/UseContext'
import styles from './style.module.css'
import axios from 'axios'
import{ jwtDecode } from 'jwt-decode';
import { refreshTokens } from '../tokens_utilitys/utility';
import { Link } from 'react-router-dom'

export default function Login() {

  const { setUser } = useContext(UserContext)
  const [data, setData] = useState({})

  const handleChange = (e) => {
    console.log(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const handleAxios = async () => {
    try {
      const res = await axios.post('https://email-server-8ncp.onrender.com/login', {
        email: data.email,
        password: data.password
      })
      const access = res.data.accessToken
      localStorage.setItem('accessToken', access)
      const token = await refreshTokens(res.data.accessToken)
      localStorage.setItem('token',token)
      setUser(token) 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <h1>LOGIN</h1>
      <div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

          <div className={styles.formGroup}>
            <label htmlFor='email'>YOUR EMAIL</label>
            <input id='email' name='email' type='email' placeholder='Enter your email' onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>PASSWORD</label>
            <input id='password' name='password' type='password' placeholder='Enter your password' onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>
              <input type='checkbox' name='isChecked' />
              STAY LOGGED IN
            </label>
          </div>

          <button className={styles.loginBtn} type='submit' onClick={handleAxios}>LOGIN</button>
          <Link to="/registration">
              <button className={styles.registrationBtn} type='submit' >Registration</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

