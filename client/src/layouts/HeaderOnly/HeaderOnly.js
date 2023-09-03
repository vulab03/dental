import classNames from "classnames/bind";
import styles from "./HeaderOnly.module.scss";

import axios from "axios";
import { useState } from "react";
const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const [bg,setBg] = useState()
    axios.get(`${process.env.REACT_APP_SERVER_URI}/file/get`)
    .then(res=>{
        setBg(res.data.path)
    })
    return (
        <div className={cx("container")} style={{
            width:"100vw",
            height: "100vh",
            backgroundImage: `url(${bg})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            display:"flex",
            flexDirection: "column",
        }}>
            <div style={{flex:1,zIndex:2}}>
                {children}
            </div>
        </div>
    );
}

export default HeaderOnly;
