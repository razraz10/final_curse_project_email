import React, { useContext, useState } from "react";
import Mailboxes from "../Mailboxes/Mailboxes";
import Toolbar from "../Toolbar/Toolbar";
import Editing from "../Editing/Editing";
import styles from "./style.module.css";
import NavigationContext from "../context/NavigationContext";
import { Route, Routes } from "react-router-dom";
import NewEmailOpenContext from "../context/NewEmailOpenContext";
import { IoCloseSharp } from "react-icons/io5";
import Login from "../Login/Login";
import MessageContent from "../MessageContent/MessageContent";
import axios from "axios";
import { getRefreshTokens, getTokensFromLocalStorage } from "../tokens_utilitys/utility";


export default function Content(props) {

  const { newEmail, setNewEmail } = useContext(NewEmailOpenContext);
  const [emailData, setEmailData] = useState({
    to: [],
    title: "",
    body: "",
  });

  const handleSendClick = async () => {
    const { authToken, accessToken } = getTokensFromLocalStorage()

    const refreshedToken = await getRefreshTokens(authToken, accessToken);

    axios
      .post(`https://email-server-8ncp.onrender.com/massages/send/`, {
        to: emailData.to,
        title: emailData.title,
        massageBody: emailData.body,
      }, {
        headers: {
          Authorization: `Bearer ${refreshedToken}`
        }
      })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        setEmailData({
          to: [],
          title: "",
          body: "",
        })
        setNewEmail(false);
      })
      .catch((error) => {
        console.error("Server Response:", error.response.data);
        console.error("Failed to send email:", error.response.data);
      });
  };

  return (
    <div className={styles.content}>
      <Toolbar />
      <Routes>
        <Route path="/Mailboxes" element={<Mailboxes searchResult={props.searchResult} />} />
        <Route path="/*" element={<Mailboxes searchResult={props.searchResult} />} />
        {/* <Route path="/MessageContent" element={<MessageContent />} /> */}
        <Route path="/editing" element={<Editing />} />
      </Routes>

      {newEmail && (
        <div className={styles.newEmail}>
          <div className={styles.email}>
            <div>new message</div>
            <button onClick={() => setNewEmail(false)}>
              <IoCloseSharp />
            </button>
          </div>
          <input
            type="text"
            className={styles.to}
            placeholder="to"
            value={emailData.to.join(", ")}
            onChange={(e) =>
              setEmailData({ ...emailData, to: e.target.value.split(", ") })
            }
          />
          <input
            type="text"
            className={styles.title}
            placeholder="Topic"
            value={emailData.title}
            onChange={(e) =>
              setEmailData({ ...emailData, title: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.body}
            value={emailData.body}
            onChange={(e) =>
              setEmailData({ ...emailData, body: e.target.value })
            }
          />
          <button
            onClick={() => {
              handleSendClick();
              setNewEmail(false);
            }}
          >
            send
          </button>
        </div>
      )}
    </div>
  );
}
