import styles from "./AdminAccount.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"

const cx = classNames.bind(styles);

function AdminAccount() {

    const [value,setValue] = useState({})
    const [temp,setTemp] = useState({})
    const [change,setChange] = useState(false)


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}admin/get`)
        .then(res=>{
            setValue(res.data)
            setTemp(res.data)
        })
    },[])

    const handleChange = (field,v)=>{


        setValue({
            ...value,
            [field]:v
        })
        const changeObj = {
            ...value,
            [field]:v
        }
        
        if (!compare(changeObj)){
            setChange(true)
        }
        else{
            setChange(false)
        }
    }
    const compare=(changeObj)=>{
        const keysA = Object.keys(changeObj);
        const keysB = Object.keys(temp);
        if (keysA.length !== keysB.length) {
          return false;
        }
      
        for (const key of keysA) {
          if (changeObj[key] !== temp[key]) {
            return false;
          }
        }
        return true;
    }


    const handleSave=()=>{
        if (!change){
            return;
        }
        else{
            // save
            axios.post(`${process.env.REACT_APP_SERVER_URI}admin/update`,value)
            console.log("save")
            toast.success('Saved!', {
                position: 'top-right',
                autoClose: 2000, // Thời gian thông báo tự đóng (ms)
            });
        }
    }
    return <>
        <div className={cx('container')}>
            <div className={cx("first")}>
                <div className={cx("tittle")}>ADMIN DASHBOARD/Admin account</div>
                <div className={cx("edit-btn",!change&&"non-change")} onClick={handleSave}>
                    Save
                </div>
            </div>
            <div className={cx("second")}>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Account:</div>
                    <div className={cx("val")}>
                        <input  value={value?.account} onChange={(e)=>{handleChange("account",e.target.value)}}/>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Name:</div>
                    <div className={cx("val")}>
                        <input  value={value?.name} onChange={(e)=>{handleChange("name",e.target.value)}}/>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Password</div>
                    <div className={cx("val")}>
                        <input value={value?.password} onChange={(e)=>{handleChange("password",e.target.value)}}/>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default AdminAccount;