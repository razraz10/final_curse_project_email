// import axios from 'axios';
// import React, { useState } from 'react'
// import styles from './style.module.css'
// // import Header from '../Header/Header';
// import Layout from '../Layout/Layout';
// import Content from '../Content/Content';

// export default function Search(props) {
    // let {handleSearch} = props

  
    // const [searchResult, setSearchResult] = useState([]);

    // const handleSearch = async (text) => {

    //     const userEmail = "emily.davis@gmail.com";
    //     try {
    //         const response = await axios.post('http://localhost:3000/search' + userEmail, {
    //             text: text,
    //         })
    //         if (!response.data) {
    //             throw new Error('Search request failed')
    //         }
    //         console.log(response);
    //         const filterEmail = response.data.filter(email => email.from.toLowerCase().includes(text.toLowerCase()))

    //         setSearchResult(filterEmail)
    //     }
    //     catch (error) {
    //         console.error('Error during search:', error.message);
    //     }
    // }


//     return (
//         <div>

//             {/* <Content handleSearch={handleSearch} /> */}
//             <div className={styles.inbox}>
//                 <table>
//                     <tbody>
//                         {searchResult.length === 0 ? (
//                             <tr>
//                                 <td>There is no inbox</td>
//                             </tr>
//                         ) : (
//                             searchResult.map((email) => (
//                                 <tr key={email._id}>
//                                     <td className={styles.name}> {email.from} </td>
//                                     <td className={styles.title}> {email.title} </td>
//                                     <td className={styles.trash}> {<BsTrash3 />} </td>
//                                     <td className={styles.date}> {email.createDate} </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             {/* <div className={styles.input}>
//                 <input type="text" 
//                 // value={}
//                 onInput={(e)=> handleSearch(e.target.value)}
//                 placeholder='Enter a name to search...' />
//                 <SlMagnifier />
 
//             </div> */}
//         </div>
//     )
// }

