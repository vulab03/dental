import styles from "./Edit.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast} from "react-toastify"

const cx = classNames.bind(styles);

function Edit() {
    const { id } = useParams();


    const [customer,setCustomer] = useState("")
    const [customerD,setCustomerD] = useState("")

    const [change,setChange] = useState(false)


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}user/find-id?id=${id}`)
        .then(res=>{
            console.log(res.data)
            setCustomer(res.data.user)
            setCustomerD(res.data.user)
        })
        .catch(err=>{
            console.error(err)
        })
    },[])

    const compare=(changeObj)=>{
        let temp = customerD

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

    const handleChange = (field,v)=>{
        
        let changeObj

        setCustomer({
            ...customer,
            [field]:v
        })
        changeObj = {
            ...customer,
            [field]:v
        }
        
        if (!compare(changeObj)){
            setChange(true)
        }
        else{
            setChange(false)
        }
    }

    const handleSave=()=>{
        if (!change){
            return;
        }
        else{
            // save
            axios.post(`${process.env.REACT_APP_SERVER_URI}user/update`,customer)
            console.log("save")
            toast.success('Saved!', {
                position: 'top-right',
                autoClose: 2000, // Thời gian thông báo tự đóng (ms)
            });
        }
    }


    return <>
        <div className={cx('container')}>
            <div style={{marginBottom:"20px"}} >MANAGE CUSTOMER/{id}</div>
            <div >ID Code: {id}</div>
            <div className={cx("customer")}>
                <div  style={{margin:"20px 50px"}}>CUSTOMER INFORMATION</div>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div className={cx("info")}>
                        <div className={cx("field")}>
                            Dental Clinic: 
                        </div>
                        <div>
                            <input value={customer?.dental} onChange={(e)=>{handleChange("dental",e.target.value)}}/>

                        </div>
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("field")}>
                            Address: 
                        </div>
                        <div>
                            <input value={customer?.addressDental} onChange={(e)=>{handleChange("addressDental",e.target.value)}}/>

                        </div>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Name: 
                    </div>
                    <div>
                        <input value={customer?.nameCustomer} onChange={(e)=>{handleChange("nameCustomer",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Age: 
                    </div>
                    <div>
                        <input value={customer?.age} onChange={(e)=>{handleChange("age",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Address: 
                    </div>
                    <div>
                        <input value={customer?.address} onChange={(e)=>{handleChange("address",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Phone: 
                    </div>
                    <div>
                        <input value={customer?.phone} onChange={(e)=>{handleChange("phone",e.target.value)}}/>

                    </div>
                </div>

            </div>
            <div className={cx("service")}>
                <div  style={{margin:"20px 50px"}}>SERVICE INFORMATION</div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Service Name: 
                    </div>
                    <div>
                        <input value={customer?.nameService} onChange={(e)=>{handleChange("nameService",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Country of Manufactor: 
                    </div>
                    <div>
                        <input value={customer?.country} onChange={(e)=>{handleChange("country",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Postition: 
                    </div>
                    <div>
                        <input value={customer?.position} onChange={(e)=>{handleChange("position",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Date of Start: 
                    </div>
                    <div>
                        <input value={customer?.startDate} onChange={(e)=>{handleChange("startDate",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Expire Date: 
                    </div>
                    <div>
                        <input value={customer?.expireDate} onChange={(e)=>{handleChange("expireDate",e.target.value)}}/>

                    </div>
                </div>
            </div>
            <div className={cx("edit-btn",!change&&"non-change")} onClick={handleSave}>
                    Save
            </div>
        </div>
    </>;
}

export default Edit;
