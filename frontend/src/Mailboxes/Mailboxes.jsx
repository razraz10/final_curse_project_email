import React, { useContext, useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationContext from "../context/NavigationContext";
import { jwtDecode } from "jwt-decode";
import { getRefreshTokens, getTokensFromLocalStorage } from "../tokens_utilitys/utility";
import MessageContent from "../MessageContent/MessageContent";
import { MdMessage } from "react-icons/md";


export default function Mailboxes({ searchResult }) {
  const [emails, setEmails] = useState([]);
  const { navigation } = useContext(NavigationContext);
  const [messageContent, setMessageContent] = useState(false);

  const theMessageContent = async (email) => {
    const { authToken, accessToken } = getTokensFromLocalStorage()
    const refreshedToken = await getRefreshTokens(authToken, accessToken);

    setMessageContent(email);
    console.log(email._id);

    try {
      const response = await axios.put(
        ` https://email-server-8ncp.onrender.com/massages/reading/${email._id}`,
        null,
        {
          headers: {
            Authorization: ` Bearer ${refreshedToken}`,
          },
        }
      );

      console.log("resSSSSSSSSSSSSSSSSSSS", response);
    } catch (error) {
      console.error("Error while updating email status:", error);
    }
  };

  // const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // const decoded = jwtDecode(authToken)
  // console.log(decoded);

  // if (new Date (decoded.exp * 1000)< Date.now()) {
  // refreshTokens()
  // }
  // if(checkToken(authToken)){



  useEffect(() => {

    const { authToken, accessToken } = getTokensFromLocalStorage()
    const getData = async () => {
      const refreshedToken = await getRefreshTokens(authToken, accessToken);

      let variable = "";
      let myData = "MY INBOX";
      if (navigation === "inbox" || navigation === "outbox" || navigation === "trash") {
        console.log(navigation);
        if (navigation === "inbox") {
          variable = "";
          myData = "MY INBOX";

        }
        if (navigation === "outbox") {
          variable = "from/";
          myData = "MY OUTBOX";

        }
        if (navigation === "trash") {
          variable = "trashMail/";
          myData = "MY TRASH";
        }
        axios
          .get(`https://email-server-8ncp.onrender.com/massages/${variable}`,
            {
              headers: {
                Authorization: `Bearer ${refreshedToken}`
              }
            })
          .then((res) => {
            console.log(res, "res");
            setEmails(res.data[myData]);
          });
      }
      else if (navigation === "search") {
        console.log(searchResult);
        setEmails(searchResult);
      }
    };
    getData()
  }, [navigation, searchResult, messageContent]);

  const deletion = async (massagesId) => {
    const { authToken, accessToken } = getTokensFromLocalStorage()

    const refreshedToken = await getRefreshTokens(authToken, accessToken);
    let deleted;
    if (navigation === "inbox" || navigation === "outbox") {

      if (navigation === "inbox") {
        deleted = "del"
      }
      if (navigation === "outbox") {
        deleted = "senderDelete"
      }

      axios.delete(`https://email-server-8ncp.onrender.com/massages/${deleted}/${massagesId}`, {
        headers: {
          Authorization: `Bearer ${refreshedToken}`
        }
      })
        .then((res) => {
          setEmails((prevEmails) => prevEmails.filter((email) => email._id !== massagesId));

        }
        ).catch(err => {
          "Delete field"
        })
    }
  };
  const emailsCopy = [...emails]
  return (
    <div className={styles.inbox}>
      {!messageContent && (
        <table>
          <tbody>
            {Array.isArray(emails) && emails.length > 0 ? (
              emailsCopy.reverse().map((email) => (
                <tr key={email._id}>
                  <td
                    className={styles.name}
                    onClick={() => theMessageContent(email)}
                  >
                    {email.from}
                  </td>
                  <td
                    className={styles.title}
                    onClick={() => theMessageContent(email)}
                  >
                    {email.title}
                  </td>
                  <td
                    className={styles.trash}
                    onClick={() => deletion(email._id)}
                  >
                    {<BsTrash3 />}
                  </td>
                  <td className={styles.isRead}>
                    {email.status[0].isRead && <FcApproval />}
                    {!email.status[0].isRead && <MdMessage />}
                  </td>

                  <td
                    className={styles.date}
                    onClick={() => theMessageContent(email)}
                  >
                    {new Date(email.createDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  {searchResult && searchResult.length > 0
                    ? "no search result "
                    : "no inbox to show"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {messageContent && (
        <MessageContent
          messageContent={messageContent}
          setMessageContent={setMessageContent}
        />
      )}
    </div>
  );
}

