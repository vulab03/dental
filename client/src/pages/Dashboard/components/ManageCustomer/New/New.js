import styles from "./New.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";
import {toast} from "react-toastify"

const cx = classNames.bind(styles);

function New() {
    
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [addMore, setAdd] = useState(false)
    const [newID,setID] = useState("")

    const inputRefs = useRef([])

    inputRefs.current = Array(11)
        .fill()
        .map((_, i) => inputRefs.current[i] ?? createRef());
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            if (currentInputIndex < 10) {
                const nextInputIndex = currentInputIndex + 1;
                
                setCurrentInputIndex(nextInputIndex);
            }
        }
        };

    useEffect(()=>{
        const currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear() % 100;
        if (parseInt(day)<10){
            day = `0${day}`
        } 
        if (parseInt(month)<10){
            month = `0${month}`
        } 
        const formattedDate = `${day}${month}${year}`;

        axios.get(`${process.env.REACT_APP_SERVER_URI}id/get`)
            .then(res=>{
                const dayDb = res.data.date
                if (dayDb !== formattedDate){
                    setID(`${formattedDate}001`)
                    setCustomer(newCus(`${formattedDate}001`))
                }
                else {
                    const id = parseInt(res.data.id)+1
                    if(id<10){
                        setID(`${formattedDate}00${id}`)
                        setCustomer(newCus(`${formattedDate}00${id}`))
                    }
                    else if (id<100){
                        setID(`${formattedDate}0${id}`)
                        setCustomer(newCus(`${formattedDate}0${id}`))
                    }
                    else {
                        setID(`${formattedDate}${id}`)
                        setCustomer(newCus(`${formattedDate}${id}`))
                    }
                }
            })
            .catch(err=>{
                console.log(err)
            })
    },[addMore])

    useEffect(()=>{
        inputRefs.current[currentInputIndex].current.focus(); 
    },[currentInputIndex])
    


    const newCus =(id)=>{
        return {
            id,
            dental :"",
            addressDental: "",
            address: "",
            nameCustomer: "",
            age: "",
            phone: "",
            nameService:"",
            country: "",
            position: "",
            startDate: "",
            expireDate:""
        }
    }

    const [customer,setCustomer] = useState(newCus(newID))

    const [change,setChange] = useState(false)

    const isValid =(customer)=>{
        for (const key of Object.keys(customer)) {
            if (customer[key] ==="") {
              return false;
            }
        }
        return true;
    }

    const handleChange = (field,v)=>{
        
        let a = customer;

        setCustomer({
            ...customer,
            [field]:v
        })
        a = {
            ...customer,
            [field]:v
        }

        const valid = isValid(a)
        
        if (valid){
            setChange(true)
        }
    }

    console.log(process.env.REACT_APP_SERVER_URI)
    
    const handleSave=()=>{
        if (!change){
            return;
        }
        else{
            // save
            axios.post(`${process.env.REACT_APP_SERVER_URI}user/create`,customer)
            .then(res=>{
                toast.success('Saved!', {
                    position: 'top-right',
                    autoClose: 2000, // Thời gian thông báo tự đóng (ms)
                });
                
                setAdd(true)
                axios.post(`${process.env.REACT_APP_SERVER_URI}id/update`,{
                    "date": newID.substring(0,6),
                    "id": newID.substring(6,9)
                })
            })
            .catch(err=>{
                toast.error('Failed!', {
                    position: 'top-right',
                    autoClose: 2000, // Thời gian thông báo tự đóng (ms)
                });
            })
            console.log("save")
        }
    }


    return <>
        <div className={cx('container')}>
            <div style={{margin:"20px 50px", fontSize:"20px"}} >ADD NEW CUSTOMER</div>
            <div className={cx("customer")}>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Id Code: {customer.id}
                    </div>
                    
                </div>
                
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div className={cx("info")}>
                        <div className={cx("field")}>
                            Dental Clinic: 
                        </div>
                        <div>
                            <input onFocus={()=>setCurrentInputIndex(0)} onKeyDown={handleKeyPress} ref = {inputRefs.current[0]} autoComplete="off" value={customer.dental} onChange={(e)=>{handleChange("dental",e.target.value,"customer")}}/>

                        </div>
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("field")}>
                            Address: 
                        </div>
                        <div>
                            <input onFocus={()=>setCurrentInputIndex(1)} onKeyDown={handleKeyPress} ref = {inputRefs.current[1]} autoComplete="off" value={customer.addressDental} onChange={(e)=>{handleChange("addressDental",e.target.value,"customer")}}/>

                        </div>
                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Name: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(2)} onKeyDown={handleKeyPress} ref = {inputRefs.current[2]} autoComplete="off" value={customer.nameCustomer} onChange={(e)=>{handleChange("nameCustomer",e.target.value,"customer")}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Age: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(3)} onKeyDown={handleKeyPress} ref = {inputRefs.current[3]} autoComplete="off" value={customer.age} onChange={(e)=>{handleChange("age",e.target.value,"customer")}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Address: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(4)} onKeyDown={handleKeyPress} ref = {inputRefs.current[4]} autoComplete="off" value={customer.address} onChange={(e)=>{handleChange("address",e.target.value,"customer")}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Phone: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(5)} onKeyDown={handleKeyPress} ref = {inputRefs.current[5]} autoComplete="off" value={customer.phone} onChange={(e)=>{handleChange("phone",e.target.value,"customer")}}/>

                    </div>
                </div>

            </div>
            <div className={cx("service")}>
                <div  style={{margin:"20px 50px",fontSize:"20px"}}>SERVICE INFORMATION</div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Service Name: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(6)} onKeyDown={handleKeyPress} ref = {inputRefs.current[6]} autoComplete="off" value={customer.nameService} onChange={(e)=>{handleChange("nameService",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Country of Manufactor: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(7)} onKeyDown={handleKeyPress} ref = {inputRefs.current[7]} autoComplete="off" value={customer.country} onChange={(e)=>{handleChange("country",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Postition: 
                    </div>
                    <div>
                        <input onFocus={()=>setCurrentInputIndex(8)} onKeyDown={handleKeyPress} ref = {inputRefs.current[8]} autoComplete="off" value={customer.position} onChange={(e)=>{handleChange("position",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Date of Start: 
                    </div>
                    <div>
                        <input type="date" onFocus={()=>setCurrentInputIndex(9)} onKeyDown={handleKeyPress} ref = {inputRefs.current[9]} autoComplete="off" value={customer.startDate} onChange={(e)=>{handleChange("startDate",e.target.value)}}/>

                    </div>
                </div>
                <div className={cx("info")}>
                    <div className={cx("field")}>
                        Expire Date: 
                    </div>
                    <div>
                        <input type="date" onFocus={()=>setCurrentInputIndex(10)} onKeyDown={handleKeyPress} ref = {inputRefs.current[10]} autoComplete="off" value={customer.expireDate} onChange={(e)=>{handleChange("expireDate",e.target.value)}}/>

                    </div>
                </div>
            </div>
            
            <div style={{display:"flex",flexDirection:"row"}}>
            <div className={cx("edit-btn",!change&&"non-change")} onClick={handleSave}>
                    Save
            </div>
            {
                addMore
                &&<div className={cx("edit-btn")}  
                onClick={()=>{
                    setCustomer(newCus())
                    setAdd(false)
                }}>
                Add more
                </div>
            }
            </div>
        </div>
    </>;
}

export default New;
