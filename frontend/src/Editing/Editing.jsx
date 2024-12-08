import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import { CgProfile } from "react-icons/cg";
import { IoPencil } from 'react-icons/io5';

import ProfileImgContext from '../context/ProfileImgContext'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getRefreshTokens, getTokensFromLocalStorage } from '../tokens_utilitys/utility';

export default function Editing() {
  const { profileImg, setProfileImg } = useContext(ProfileImgContext)
  const authToken = localStorage.getItem("token");



  const logOutUser = async () => {
    const { authToken, accessToken } = getTokensFromLocalStorage()

    const refreshedToken = await getRefreshTokens(authToken, accessToken);

    axios.post('https://email-server-8ncp.onrender.com/logout', {
      accessToken: accessToken
    }, {
      headers: {
        Authorization: `Bearer ${refreshedToken}`
      }
    })
    localStorage.removeItem('token')
    localStorage.removeItem('accessToken')
  }
  const [user, setUser] = useState('')
  const [data, setData] = useState({
    firstName: "",
    lastName: ""
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const editing = async () => {
    const { authToken, accessToken } = getTokensFromLocalStorage()

    const refreshedToken = await getRefreshTokens(authToken, accessToken);
    try {
      const response = await axios.put(
        `https://email-server-8ncp.onrender.com/user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
          },
        }
      );

      console.log("res", response);
    } catch (error) {
      console.error("Error while updating email status:", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {

      const { authToken, accessToken } = getTokensFromLocalStorage()

      const refreshedToken = await getRefreshTokens(authToken, accessToken);
      axios
        .get(`https://email-server-8ncp.onrender.com/user`, {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
          },
        })
        .then((res) => {
          console.log(res, "res");
          setUser(res.data)
          console.log(user);
        });
    }
    getUser()
  }, []);

  // setProfileImg('')


  return (
    <div className={styles.editing}>
      <div className={styles.profileImg}>
        {profileImg ? (
          <img src={profileImg} alt="" />
        ) : (
          <div className={styles.cgProfile}>
            <CgProfile />
          </div>
        )}
        <div className={styles.icon}>
          <IoPencil />
        </div>
      </div>



      <input type="text" name='firstName' defaultValue={user.firstName} onChange={handleChange} />
      <input type="text" name='lastName' defaultValue={user.lastName} onChange={handleChange} />
      <button onClick={() => { editing() }}>Edit</button>

      <Link to={'/login'}>
        <button onClick={() => logOutUser()}>LogOut</button>
      </Link>
    </div>
  )
}
