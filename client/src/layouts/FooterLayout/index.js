import classNames from "classnames/bind";
import styles from "./FooterLayout.module.scss";

import Footer from '../../components/Footer/index.js'
import bg from "../../assets/images/bg.jpg"
import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const cx = classNames.bind(styles);

function FooterLayout({ children }) {
    const [bg,setBg] = useState()
    let [loading, setLoading] = useState(true);

    axios.get(`${process.env.REACT_APP_SERVER_URI}file/get`)
    .then(res=>{
        setBg(res.data.path)
        setLoading(false)
    })

    return (

        <>
        {
            loading?
            <div className={cx("loading")}> 
                <ClipLoader
                    color={"#c1a666"}
                    loading={loading}
                    size={100}     
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </div>
                :
            <div className={cx("container")} style={{
                width:"100vw",
                height: "100vh",
                backgroundImage: `url(${bg})`,
                backgroundRepeat:"no-repeat",
                backgroundSize: "cover",
                display:"flex",
                flexDirection: "column",
            }}>
                <div style={{flex:1, zIndex:2}}>
                    {children}
                </div>
                <Footer></Footer>
            </div>
        }
        </>
    );
}

export default FooterLayout;
