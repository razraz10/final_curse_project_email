import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { CgProfile } from "react-icons/cg";
import { SlMagnifier } from "react-icons/sl";
import ProfileImgContext from "../context/ProfileImgContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header(props) {
    //   const editing = () => {};
    // //  const name = localStorage.
    const firstName = "moshe";
    //   // const name = ""

    const { profileImg } = useContext(ProfileImgContext);
    const [isEditing, setIsEditing] = useState(true);

    return (
        <div className={styles.header}>
            <Link
                to={isEditing ? "/editing" : "/"}
                onClick={() => setIsEditing(!isEditing)}
            >
                <button className={styles.profilePictures}>
                    <div>
                        {profileImg ? (
                            <img src={profileImg} alt="profileImg" />
                        ) : (
                            <div className={styles.cgProfile}>
                                <CgProfile />
                            </div>
                        )}
                    </div>
                    <div className={styles.name}>{firstName}</div>
                </button>
            </Link>

            <div className={styles.input}>
                <input
                    type="text"
                    // value={}
                    onChange={(e) => {
                        props.handleSearch(e.target.value);
                    }}
                    placeholder="Enter a name to search..."
                />
                <SlMagnifier />
            </div>

            <div className={styles.imgChat}>
                <img src="https://cdn.pixabay.com/photo/2013/07/12/15/53/email-150497_640.png" />
            </div>
        </div>
    );
}
