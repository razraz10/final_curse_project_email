import axios from "axios";
import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import UserContext from "../context/UseContext";

export default function Registration() {
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const refreshTokens = async (accessToken) => {
      console.log("lll");
    try {
      const res = await axios.post(
        `https://email-server-8ncp.onrender.com/refresh`,
        {accessToken}
      );
      const refreshToken = res.data.refresh;
      localStorage.setItem("token", refreshToken);
      setUser(refreshToken);
      return refreshToken;
    } catch (error) {
      console.error("login err", error);
    }
  };

  const register = async () => {
    try {
      const res = await axios.post("https://email-server-8ncp.onrender.com/user", data);
      const refreshToken = await refreshTokens(res.data[1]);
      console.log(refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.registration}>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="שם פרטי"
          value={data.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="שם משפחה"
          value={data.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="אימייל"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={data.password}
          onChange={handleChange}
        />
        <button type="button" onClick={register}>
          הרשמה
        </button>
      </form>
    </div>
  );
}
