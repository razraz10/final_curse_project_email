import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Content from "../Content/Content";
import ProfileImgContext from "../context/ProfileImgContext";
import UserContext from "../context/UseContext";
import NewEmailOpenContext from "../context/NewEmailOpenContext";
import Login from "../Login/Login";
import Layout from "../Layout/Layout";
import Registration from "../Registration/Registration";

export default function App(props) {

  const [user, setUser] = useState();
  const [newEmail, setNewEmail] = useState(false);
  // console.log(user || localStorage.token);
  const navigate = useNavigate()

  useEffect(() => {  
    navigate((!user && !localStorage.token) ? '/login' : '/')
  }, [user])

  const [profileImg, setProfileImg] = useState(
    "data:image/jpeg;base64,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"
  );
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NewEmailOpenContext.Provider value={{ newEmail, setNewEmail }}>
          <ProfileImgContext.Provider value={{ profileImg, setProfileImg }}>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={(user || localStorage.token) && <Layout />} />        
            </Routes>
          </ProfileImgContext.Provider>
        </NewEmailOpenContext.Provider>
      </UserContext.Provider>
    </>
  );
}
