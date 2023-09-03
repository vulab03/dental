import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import styles from "./HeaderOnly.module.scss";

import bg from "../../assets/images/bg.jpg"
const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
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
