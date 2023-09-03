import classNames from "classnames/bind";
import styles from "./DashboardLayout.module.scss";

import Sidebar from "../../components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
    return (
        <div className={cx("container")} >
                <div className={cx("sidebar")}>
                    <Sidebar/>
                </div>
                <div className={cx("content")}>
                    {children}
                </div>
            
        </div>
    );
}

export default DashboardLayout;
