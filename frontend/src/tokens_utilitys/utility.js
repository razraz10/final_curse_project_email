import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getRefreshTokens = async (refreshToken, accessToken) => {
    console.log(accessToken);
    try {
        const decoded = jwtDecode(refreshToken);
        if (new Date(decoded.exp * 1000) < Date.now()) {
            console.log(1);
            localStorage.removeItem('token');
            const newRefreshToken = await refreshTokens(accessToken);
            console.log(newRefreshToken);
            localStorage.setItem('token', newRefreshToken)
            return newRefreshToken
        }
        return refreshToken;
    } catch (error) {
        console.error('Error decoding token:', error);
    }
}


export const refreshTokens = async (accessToken) => {
    try {
        const res = await axios.post('http://localhost:3000/refresh', { accessToken });
        // console.log(res);
        const refreshToken = res.data.refresh
        localStorage.setItem('token', refreshToken)
        return refreshToken
    } catch (error) {
        console.error("login err", error)
    }
}

export function getTokensFromLocalStorage() {
    const authToken = localStorage.getItem('token')
    const accessToken = localStorage.getItem('accessToken')
    return { authToken, accessToken }
}






// import React, { useContext, useEffect, useState } from "react";
// import { MdMessage } from "react-icons/md";
// import { FcApproval } from "react-icons/fc";
// import styles from "./style.module.css";
// import { BsTrash3 } from "react-icons/bs";
// import axios from "axios";
// import NavigationContext from "../context/NavigationContext";
// import MessageContent from "../MessageContent/MessageContent";

// export default function Mailboxes({ searchResult }) {
//   const [emails, setEmails] = useState([]);
//   const [messageContent, setMessageContent] = useState(false);
//   const { navigation } = useContext(NavigationContext);
//   const authToken = localStorage.getItem("token");
//   const theMessageContent = async (email) => {
//     setMessageContent(email);
//     console.log(email._id);

//     try {
//       const response = await axios.put(
//         http://localhost:3000/massages/reading/${email._id},
//         null,
//         {
//           headers: {
//             Authorization: Bearer ${authToken},
//           },
//         }
//       );

//       console.log("resSSSSSSSSSSSSSSSSSSS", response);
//     } catch (error) {
//       console.error("Error while updating email status:", error);
//     }
//   };

//   useEffect(() => {
//     let variable = "";
//     let myData = "MY INBOX";
//     if (
//       navigation === "inbox" ||
//       navigation === "outbox" ||
//       navigation === "trash"
//     ) {
//       if (navigation === "inbox") {
//         variable = "";
//         myData = "MY INBOX";
//       }
//       if (navigation === "outbox") {
//         variable = "from/";
//         myData = "MY OUTBOX";
//       }
//       if (navigation === "trash") {
//         variable = "trashMail/";
//         myData = "MY TRASH";
//       }
//       axios
//         .get(http://localhost:3000/massages/${variable}, {
//           headers: {
//             Authorization: Bearer ${authToken},
//           },
//         })
//         .then((res) => {
//           console.log(res, "res");
//           setEmails(res.data[myData]);
//         });
//     } else if (navigation === "search") {
//       setEmails(searchResult);
//     }
//   }, [navigation, searchResult, messageContent]);

//   const deletion = (massagesId) => {
//     axios
//       .delete(http://localhost:3000/massages/del/${massagesId}, {
//         headers: {
//           Authorization: Bearer ${authToken},
//         },
//       })
//       .then((res) => {
//         setEmails((prevEmails) =>
//           prevEmails.filter((email) => email._id !== massagesId)
//         );
//       })
//       .catch((err) => {
//         "Delete field";
//       });
//   };

//   return (
//     <div className={styles.inbox}>
//       {!messageContent && (
//         <table>
//           <tbody>
//             {Array.isArray(emails) && emails.length > 0 ? (
//                emails.reverse().map((email) => (
//                 <tr key={email._id}>
//                   <td
//                     className={styles.name}
//                     onClick={() => theMessageContent(email)}
//                   >
//                     {email.from}
//                   </td>
//                   <td
//                     className={styles.title}
//                     onClick={() => theMessageContent(email)}
//                   >
//                     {email.title}
//                   </td>
//                   <td
//                     className={styles.trash}
//                     onClick={() => deletion(email._id)}
//                   >
//                     {<BsTrash3 />}
//                   </td>
//                   <td className={styles.isRead}>
//                     {email.status[0].isRead && <FcApproval />}
//                     {!email.status[0].isRead && <MdMessage />}
//                   </td>

//                   <td
//                     className={styles.date}
//                     onClick={() => theMessageContent(email)}
//                   >
//                     {new Date(email.createDate).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td>
//                   {searchResult && searchResult.length > 0
//                     ? "no search result "
//                     : "no inbox to show"}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       {messageContent && (
//         <MessageContent
//           messageContent={messageContent}
//           setMessageContent={setMessageContent}
//         />
//       )}
//     </div>
//   );
// }
