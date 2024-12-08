import React, { useEffect, useState } from 'react'
import styles from "./style.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getRefreshTokens, getTokensFromLocalStorage } from '../tokens_utilitys/utility';



export default function MessageContent({ messageContent, setMessageContent }) {
    const [emails, setEmails] = useState([]);



    // useEffect((massagesId) => {
    //     const { authToken, accessToken } = getTokensFromLocalStorage()
    //     const read = async () => {
    //         const refreshedToken = await getRefreshTokens(authToken, accessToken);
    //         axios.put(`https://email-server-8ncp.onrender.com/massages/reading/${massagesId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${refreshedToken}`
    //             }
    //         })
    //             .then((res) => {
    //                 setEmails(res.data)
    //                 console.log(emails);
    //             })
    //     }
    //     read();
    // },[])

    const { email } = useParams();
    // const authToken = localStorage.getItem('token')

    return (
        <div>
            <div className={styles.messageContent}>
                <div className={styles.x} onClick={() => setMessageContent(false)}>X</div>
                <div className={styles.from}>from: {messageContent.from}</div>
                <div className={styles.title}>title: {messageContent.title}</div>
                <div className={styles.body}>body: {messageContent.massageBody}</div>
            </div>
        </div>
    )
}
