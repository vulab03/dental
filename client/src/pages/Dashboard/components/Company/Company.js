
import styles from "./Company.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"

const cx = classNames.bind(styles);

function Company() {

    const [value,setValue] = useState({})
    const [temp,setTemp] = useState({})

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}company/get`)
        .then(res=>{
            setValue(res.data)
            setTemp(res.data)
        })
    },[])
    const [change,setChange] = useState(false)

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
            axios.post(`${process.env.REACT_APP_SERVER_URI}company/update`,value)
            toast.success('Saved!', {
                position: 'top-right',
                autoClose: 2000, // Thời gian thông báo tự đóng (ms)
            });
            console.log("save")
        }
    }
    return <>
        <div className={cx('container')}>
            <div className={cx("first")}>
                <div className={cx("tittle")}>ADMIN DASHBOARD/company information</div>
                <div className={cx("edit-btn",!change&&"non-change")} onClick={handleSave}>
                    Save
                </div>
            </div>
            <div className={cx("second")}>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Email:</div>
                    <div className={cx("val")}>
                        <input  value={value?.email} onChange={(e)=>{handleChange("email",e.target.value)}}/>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Hotline:</div>
                    <div className={cx("val")}>
                        <input  value={value?.hotline} onChange={(e)=>{handleChange("hotline",e.target.value)}}/>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("elm")}>Address</div>
                    <div className={cx("val")}>
                        <input  value={value?.address} onChange={(e)=>{handleChange("address",e.target.value)}}/>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Company;
