import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import { useState } from "react";
const cx = classNames.bind(styles);

function Sidebar() {


    const [adminState,setAdminState] = useState(false)
    const [active,setActive] = useState(3)

    const navigate = useNavigate()

    const handleClick = (path,active,child=false) => {
        !child &&setAdminState(false)
        setActive(active)
        navigate(`/${path}`)    

    }

    const handleAdminClick = () => {
        setAdminState(!adminState)
    }
    return <>
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("logo")}>
                    <img src ={logo} width="200px" height="200px"/>
                </div>
                <div className={cx("option")} onClick={handleAdminClick}>
                    ADMIN DASHBOARD
                </div>
                    {
                        adminState ? <div>
                            <div className={cx("option-child",active==1&&"active")} onClick={()=>handleClick("company-information",1,true)}>
                            Company information
                            </div>
                            <div className={cx("option-child",active==2&&"active")}onClick={()=>handleClick("admin-account",2,true)} >
                            Admin account
                            </div>
                        </div>
                        :""
                    }
                <div className={cx("option",active==3&&"active")} onClick={()=>handleClick("manage-customer",3)}>
                    MANAGER CUSTOMER
                </div>
                <div className={cx("option",active==4&&"active")} onClick={()=>handleClick("manage-post",4)}>
                    MANAGE POST
                </div>
                <div className={cx("option",active==5&&"active")} onClick={()=>{handleClick("manage-image",5)}}>
                    MANAGE IMAGE
                </div>
            </div>
        </div>
    </>;
}

export default Sidebar;
