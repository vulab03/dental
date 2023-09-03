import classNames from "classnames/bind";
import styles from "./FooterLayout.module.scss";

import Footer from '../../components/Footer/index.js'
import bg from "../../assets/images/bg.jpg"

const cx = classNames.bind(styles);

function FooterLayout({ children }) {
    return (
        <>
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
        </>
    );
}

export default FooterLayout;
