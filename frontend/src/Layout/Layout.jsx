import React, { useContext, useState } from "react";
import Header from "../Header/Header";
// import Search from "../Search/Search";
import axios from "axios";
import NavigationContext from "../context/NavigationContext";
import Mailboxes from "../Mailboxes/Mailboxes";
import { getRefreshTokens, getTokensFromLocalStorage } from "../tokens_utilitys/utility";
import Content from "../Content/Content";

const authToken = localStorage.getItem('token')
const accessToken = localStorage.getItem('accessToken')

export default function Layout(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [navigation, setNavigation] = useState("inbox");
  const [previousNavigation, setPreviousNavigation] = useState("inbox")

  const handleSearch = async (text) => {


    try {
      const { authToken, accessToken } = getTokensFromLocalStorage()
      const refreshedToken = await getRefreshTokens(authToken, accessToken);


      const response = await axios.get(
        "https://email-server-8ncp.onrender.com/massages/search",
        {
          params: {
            text: text,
          },
          headers: {
            Authorization: `Bearer ${refreshedToken}`
          }
        }
      );
      if (!response.data) {
        throw new Error("Search request failed");
      }

      //YacovBinik@gmail.com
      console.log(response.data);
      setSearchResult(response.data);
      if (!text.trim()) {
        setNavigation(previousNavigation);
      } else {
        setPreviousNavigation(navigation);
        setNavigation("search");
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  return (
    <div>
      <NavigationContext.Provider value={{ navigation, setNavigation }}>
        <Header handleSearch={handleSearch} />
        <Content searchResult={searchResult} />
        {/* <Mailboxes  searchResult={searchResult}/> */}
      </NavigationContext.Provider>
    </div>
  );
}
